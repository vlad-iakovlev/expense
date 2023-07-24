import { useEffect } from 'react'
import { getBrowserStorageState } from '../../getters/storage.ts'
import { StorageAction } from '../../reducers/storage.ts'
import { RootStoreState } from '../../types.tsx'
import { getLocalStorageKey } from './constants.ts'

export const useSaveStateToLocalStorage = (
  state: RootStoreState,
  dispatch: React.Dispatch<StorageAction>,
  isStateLoaded: boolean,
) => {
  useEffect(() => {
    if (isStateLoaded) {
      window.localStorage.setItem(
        getLocalStorageKey(),
        JSON.stringify(getBrowserStorageState(state)),
      )
    }
  }, [isStateLoaded, state])
}
