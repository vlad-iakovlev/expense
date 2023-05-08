import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router.js'
import { Dispatch, useEffect, useState } from 'react'
import { performSync } from '../../../api/client/sync.ts'
import { ROUTES } from '../../../constants/routes.ts'
import { useIsOnline } from '../../../hooks/useIsOnline.ts'
import { useIsTabVisible } from '../../../hooks/useIsTabVisible.ts'
import {
  getBrowserStorageBody,
  getRemoteStorageBody,
} from '../getters/storage.ts'
import { StorageAction } from '../reducers/storage.ts'
import { RootStoreState, StorageActionType } from '../types.tsx'
import { isTransactionEmpty } from '../utils.ts'

const LS_KEY = 'rootStore'
const VERSION = 2
const getLsKey = (version = VERSION) => `${LS_KEY}/v${version}`

export const useStorage = (
  state: RootStoreState,
  dispatch: Dispatch<StorageAction>
) => {
  const [, setState] = useState()

  const session = useSession()
  const router = useRouter()
  const isOnline = useIsOnline()
  const isTabVisible = useIsTabVisible()
  const isInvitePage = router.asPath.startsWith(ROUTES.INVITE(''))
  const [shouldSyncAsap, setShouldSyncAsap] = useState(true)
  const [isLsLoaded, setIsLsLoaded] = useState(false)

  useEffect(() => {
    // Clean up old versions
    for (let version = 1; version < VERSION; version++) {
      window.localStorage.removeItem(getLsKey(version))
    }
  }, [])

  useEffect(() => {
    // Load state from local storage
    if (!isInvitePage && !isLsLoaded && session.status === 'authenticated') {
      try {
        const storedState = window.localStorage.getItem(getLsKey())

        if (storedState) {
          dispatch({
            type: StorageActionType.SET_STATE_FROM_BROWSER_STORAGE,
            payload: storedState,
          })
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLsLoaded(true)
      }
    }
  }, [dispatch, isInvitePage, isLsLoaded, session.status])

  useEffect(() => {
    // Reset state if user logs out
    if (!isInvitePage && session.status === 'unauthenticated') {
      dispatch({ type: StorageActionType.RESET_STATE })
      window.localStorage.removeItem(getLsKey())
      setIsLsLoaded(false)
    }
  }, [dispatch, isInvitePage, session.status])

  useEffect(() => {
    if (isInvitePage) return

    // Listen to local storage changes from other tabs
    const handleStorage = (event: StorageEvent) => {
      if (
        event.storageArea === window.localStorage &&
        event.key === getLsKey() &&
        event.newValue !== event.oldValue
      ) {
        setIsLsLoaded(false)
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [isInvitePage])

  useEffect(() => {
    // Save state to local storage
    if (!isInvitePage && isLsLoaded) {
      window.localStorage.setItem(
        getLsKey(),
        JSON.stringify(getBrowserStorageBody(state))
      )
    }
  }, [isInvitePage, isLsLoaded, state])

  useEffect(() => {
    if (isInvitePage || state.isSyncing) return

    if (
      !isLsLoaded ||
      session.status !== 'authenticated' ||
      !isOnline ||
      !isTabVisible
    ) {
      setShouldSyncAsap(true)
      return
    }

    const sync = async () => {
      try {
        setShouldSyncAsap(false)

        dispatch({ type: StorageActionType.START_SYNC })

        const body = getRemoteStorageBody(state)
        const syncStartedAt = new Date()
        const response = await performSync(body)

        if (response.coldStartNeeded) {
          window.localStorage.removeItem(getLsKey())
          throw new Error('Cold start needed')
        }

        dispatch({
          type: StorageActionType.SET_STATE_FROM_REMOTE_STORAGE,
          payload: { response, syncStartedAt },
        })
      } catch (error) {
        if ((error as Error | null)?.message === 'Cold start needed') {
          setState(() => {
            throw error
          })
        } else {
          console.error(error)
          dispatch({ type: StorageActionType.ABORT_SYNC })
        }
      }
    }

    if (shouldSyncAsap) return void sync()

    const timerId = setTimeout(
      () => void sync(),
      isTransactionEmpty(state.nextSyncTransaction) ? 60000 : 2000
    )

    return () => clearTimeout(timerId)
  }, [
    dispatch,
    isInvitePage,
    isLsLoaded,
    isOnline,
    isTabVisible,
    session.status,
    shouldSyncAsap,
    state,
  ])
}
