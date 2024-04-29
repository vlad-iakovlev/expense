import { StorageAction } from '../../reducers/storage.js'
import { RootStoreState } from '../../types.jsx'
import { useCleanupOldLocalStorageVersions } from './useCleanupOldLocalStorageVersions.js'
import { useLoadStateFromLocalStorage } from './useLoadStateFromLocalStorage.js'
import { useResetStateForUnauthenticated } from './useResetStateForUnauthenticated.js'
import { useSaveStateToLocalStorage } from './useSaveStateToLocalStorage.js'
import { useSyncStateWithServer } from './useSyncStateWithServer.js'

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
