import { Dispatch } from 'react'
import { StorageAction } from '../../reducers/storage.ts'
import { RootStoreState } from '../../types.tsx'
import { useCleanupOldLocalStorageVersions } from './useCleanupOldLocalStorageVersions.ts'
import { useLoadStateFromLocalStorage } from './useLoadStateFromLocalStorage.ts'
import { useResetState } from './useResetState.ts'
import { useSaveStateToLocalStorage } from './useSaveStateToLocalStorage.ts'
import { useSyncStateWithServer } from './useSyncStateWithServer.ts'

export const useStorage = (
  state: RootStoreState,
  dispatch: Dispatch<StorageAction>
) => {
  const isStateLoaded = useLoadStateFromLocalStorage(state, dispatch)
  useResetState(state, dispatch)
  useSaveStateToLocalStorage(state, dispatch, isStateLoaded)

  useSyncStateWithServer(state, dispatch, isStateLoaded)

  useCleanupOldLocalStorageVersions()
}
