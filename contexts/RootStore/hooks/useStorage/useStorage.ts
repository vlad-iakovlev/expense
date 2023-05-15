import { StorageAction } from '../../reducers/storage.ts'
import { RootStoreState } from '../../types.tsx'
import { useCleanupOldLocalStorageVersions } from './useCleanupOldLocalStorageVersions.ts'
import { useLoadStateFromLocalStorage } from './useLoadStateFromLocalStorage.ts'
import { useResetStateForUnauthenticated } from './useResetStateForUnauthenticated.ts'
import { useSaveStateToLocalStorage } from './useSaveStateToLocalStorage.ts'
import { useSyncStateWithServer } from './useSyncStateWithServer.ts'

export const useStorage = (
  state: RootStoreState,
  dispatch: React.Dispatch<StorageAction>
) => {
  const isStateLoaded = useLoadStateFromLocalStorage(state, dispatch)
  useResetStateForUnauthenticated(state, dispatch)
  useSaveStateToLocalStorage(state, dispatch, isStateLoaded)

  useSyncStateWithServer(state, dispatch, isStateLoaded)

  useCleanupOldLocalStorageVersions()
}
