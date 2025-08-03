import { StorageAction } from '../../reducers/storage'
import { RootStoreState } from '../../types'
import { useCleanupOldLocalStorageVersions } from './useCleanupOldLocalStorageVersions'
import { useLoadStateFromLocalStorage } from './useLoadStateFromLocalStorage'
import { useResetStateForUnauthenticated } from './useResetStateForUnauthenticated'
import { useSaveStateToLocalStorage } from './useSaveStateToLocalStorage'
import { useSyncStateWithServer } from './useSyncStateWithServer'

export const useStorage = (
  state: RootStoreState,
  dispatch: React.Dispatch<StorageAction>,
) => {
  const isStateLoaded = useLoadStateFromLocalStorage(state, dispatch)
  useResetStateForUnauthenticated(state, dispatch)
  useSaveStateToLocalStorage(state, dispatch, isStateLoaded)

  useSyncStateWithServer(state, dispatch, isStateLoaded)

  useCleanupOldLocalStorageVersions()
}
