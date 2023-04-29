import { useSession } from 'next-auth/react'
import { Dispatch, useCallback, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { performSync } from '../../../api/client/sync.ts'
import { useInterval } from '../../../hooks/useInterval.ts'
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
  const isAuthenticated = session.status === 'authenticated'
  const isOnline = useIsOnline()
  const isTabVisible = useIsTabVisible()

  const canSync =
    isBrowserStorageLoaded && isAuthenticated && isOnline && isTabVisible

  const sync = useCallback(() => {
    void (async () => {
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
    })()
  }, [dispatch, state])

  const syncDebounced = useDebouncedCallback(sync, 2000, { leading: true })

  useInterval(syncDebounced, canSync ? 60 * 1000 : null, { immediate: true })

  useEffect(() => {
    if (canSync && state.shouldSync) {
      syncDebounced()
    }
  }, [canSync, state.shouldSync, syncDebounced])
}
