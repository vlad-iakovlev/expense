import { useEffect } from 'react'
import { getBrowserStorageState } from '../../getters/storage'
import { StorageAction } from '../../reducers/storage'
import { RootStoreState } from '../../types'
import { getLocalStorageKey } from './constants'

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
