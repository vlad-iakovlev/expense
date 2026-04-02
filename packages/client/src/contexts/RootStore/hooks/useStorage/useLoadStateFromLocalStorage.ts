import { useEffect, useState } from 'react'
import { StorageAction } from '../../reducers/storage'
import { RootStoreState, StorageActionType } from '../../types'
import { getLocalStorageKey } from './constants'
import { useCanLoadState } from './useCanLoadState'

export const useLoadStateFromLocalStorage = (
  state: RootStoreState,
  dispatch: React.Dispatch<StorageAction>,
) => {
  const canLoadState = useCanLoadState()
  const [isStateLoaded, setIsStateLoaded] = useState(false)

  useEffect(() => {
    if (!canLoadState) setIsStateLoaded(false)
  }, [canLoadState])

  useEffect(() => {
    if (canLoadState && !isStateLoaded) {
      try {
        const storedState = window.localStorage.getItem(getLocalStorageKey())

        if (storedState) {
          dispatch({
            type: StorageActionType.SET_STATE_FROM_BROWSER_STORAGE,
            payload: storedState,
          })
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsStateLoaded(true)
      }
    }
  }, [canLoadState, isStateLoaded, dispatch, setIsStateLoaded])

  return isStateLoaded
}
