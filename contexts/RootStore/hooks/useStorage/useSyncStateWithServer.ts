import { useCallback, useEffect, useState } from 'react'
import { performSync } from '../../../../api/client/sync.ts'
import { ERROR_TYPES } from '../../../../constants/errors.ts'
import { useIsOnline } from '../../../../hooks/useIsOnline.ts'
import { useThrowError } from '../../../../hooks/useThrowError.ts'
import { getRemoteStorageBody } from '../../getters/storage.ts'
import { StorageAction } from '../../reducers/storage.ts'
import { RootStoreState, StorageActionType } from '../../types.tsx'
import { isTransactionEmpty } from '../../utils.ts'
import { getLocalStorageKey } from './constants.ts'

export const useSyncStateWithServer = (
  state: RootStoreState,
  dispatch: React.Dispatch<StorageAction>,
  isStateLoaded: boolean,
) => {
  const throwError = useThrowError()
  const isOnline = useIsOnline()
  const [shouldSyncAsap, setShouldSyncAsap] = useState(true)

  const sync = useCallback(async () => {
    try {
      setShouldSyncAsap(false)

      dispatch({ type: StorageActionType.START_SYNC })

      const body = getRemoteStorageBody(state)
      const syncStartedAt = new Date()
      const response = await performSync(body)

      dispatch({
        type: StorageActionType.SET_STATE_FROM_REMOTE_STORAGE,
        payload: { response, syncStartedAt },
      })
    } catch (error) {
      if (
        error instanceof Error &&
        (
          [
            ERROR_TYPES.INVALID_UPDATES,
            ERROR_TYPES.INVALID_TRANSACTION,
          ] as string[]
        ).includes(error.message)
      ) {
        window.localStorage.removeItem(getLocalStorageKey())
        return throwError(error)
      }

      console.error(error)
      dispatch({ type: StorageActionType.ABORT_SYNC })
    }
  }, [dispatch, state, throwError])

  useEffect(() => {
    if (state.isSyncing) return
    if (!isStateLoaded || !isOnline) return setShouldSyncAsap(true)
    if (shouldSyncAsap) return void sync()

    const timerId = setTimeout(
      () => void sync(),
      isTransactionEmpty(state.nextSyncTransaction) ? 60000 : 2000,
    )
    return () => clearTimeout(timerId)
  }, [
    isOnline,
    isStateLoaded,
    shouldSyncAsap,
    state.isSyncing,
    state.nextSyncTransaction,
    sync,
  ])
}
