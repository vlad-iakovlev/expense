import { useEffect } from 'react'
import { getBrowserStorageState } from '../../getters/storage.js'
import { StorageAction } from '../../reducers/storage.js'
import { RootStoreState } from '../../types.jsx'
import { getLocalStorageKey } from './constants.js'

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
