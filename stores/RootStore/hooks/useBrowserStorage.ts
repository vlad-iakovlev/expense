import { useSession } from 'next-auth/react'
import { Dispatch, useEffect, useState } from 'react'
import { getBrowserStorageState } from '../getters/storage.ts'
import { StorageAction } from '../reducers/storage.ts'
import { RootStoreState, StorageActionType } from '../types.tsx'

const LOCAL_STORAGE_KEY = 'rootStore/v1'

export const useBrowserStorage = (
  state: RootStoreState,
  dispatch: Dispatch<StorageAction>
) => {
  const session = useSession()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (session.status === 'authenticated' && !isLoaded) {
      try {
        const storedState = window.localStorage.getItem(LOCAL_STORAGE_KEY)

        if (storedState) {
          dispatch({
            type: StorageActionType.SET_STATE_FROM_BROWSER_STORAGE,
            payload: storedState,
          })
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoaded(true)
      }
    }
  }, [dispatch, isLoaded, session.status])

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      dispatch({ type: StorageActionType.RESET_STATE })
      window.localStorage.removeItem(LOCAL_STORAGE_KEY)
      setIsLoaded(false)
    }
  }, [dispatch, session.status])

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (
        event.storageArea === window.localStorage &&
        event.key === LOCAL_STORAGE_KEY &&
        event.newValue !== event.oldValue
      ) {
        setIsLoaded(false)
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      window.localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(getBrowserStorageState(state))
      )
    }
  }, [isLoaded, state])

  return {
    isBrowserStorageLoaded: isLoaded,
  }
}
