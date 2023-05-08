import { Dispatch, useEffect, useState } from 'react'
import { StorageAction } from '../../reducers/storage.ts'
import { RootStoreState, StorageActionType } from '../../types.tsx'
import { getLocalStorageKey } from './constants.ts'
import { useCanLoadState } from './useCanLoadState.ts'

export const useLoadStateFromLocalStorage = (
  state: RootStoreState,
  dispatch: Dispatch<StorageAction>
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
