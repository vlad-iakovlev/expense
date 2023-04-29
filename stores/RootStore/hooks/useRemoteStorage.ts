import { useSession } from 'next-auth/react'
import { Dispatch, useEffect, useState } from 'react'
import { performSync } from '../../../api/client/sync.ts'
import { useIsOnline } from '../../../hooks/useIsOnline.ts'
import { useIsTabVisible } from '../../../hooks/useIsTabVisible.ts'
import { getRemoteStorageBody } from '../getters/storage.ts'
import { StorageAction } from '../reducers/storage.ts'
import { RootStoreState, StorageActionType } from '../types.tsx'

export const useRemoteStorage = (
  state: RootStoreState,
  dispatch: Dispatch<StorageAction>,
  isBrowserStorageLoaded: boolean
) => {
  const session = useSession()
  const isOnline = useIsOnline()
  const isTabVisible = useIsTabVisible()
  const [shouldSyncAsap, setShouldSyncAsap] = useState(true)

  useEffect(() => {
    const sync = async () => {
      try {
        dispatch({ type: StorageActionType.START_SYNC })
        const syncStartedAt = new Date()
        const response = await performSync(getRemoteStorageBody(state))

        dispatch({
          type: StorageActionType.SET_STATE_FROM_REMOTE_STORAGE,
          payload: { response, syncStartedAt },
        })
      } catch (error) {
        console.error(error)
        dispatch({ type: StorageActionType.ABORT_SYNC })
      }
    }

    if (state.isSyncing) {
      setShouldSyncAsap(false)
      return
    }

    if (
      !isBrowserStorageLoaded ||
      session.status !== 'authenticated' ||
      !isOnline ||
      !isTabVisible
    ) {
      setShouldSyncAsap(true)
      return
    }

    if (shouldSyncAsap) {
      setShouldSyncAsap(false)
      void sync()
      return
    }

    const timerId = setTimeout(
      () => void sync(),
      state.shouldSync ? 2000 : 60000
    )

    return () => clearTimeout(timerId)
  }, [
    dispatch,
    isBrowserStorageLoaded,
    isOnline,
    isTabVisible,
    session.status,
    shouldSyncAsap,
    state,
  ])
}
