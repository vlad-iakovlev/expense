import assert from 'assert'
import { useSession } from 'next-auth/react'
import { Dispatch, useEffect, useState } from 'react'
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
    if (session.status === 'authenticated' && !state.isReady) {
      try {
        const storedState = window.localStorage.getItem(LOCAL_STORAGE_KEY)
        assert(storedState, 'No stored state found')

        dispatch({
          type: StorageActionType.SET_STATE_FROM_BROWSER_STORAGE,
          payload: { storedState },
        })
      } catch (error) {
        console.error(error)
      } finally {
        dispatch({
          type: StorageActionType.SET_SHOULD_SYNC,
          payload: true,
        })

        setIsLoaded(true)
      }
    }
  }, [dispatch, session.status, state.isReady])

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      dispatch({
        type: StorageActionType.CLEAR_BROWSER_STORAGE,
      })

      setIsLoaded(true)
    }
  }, [dispatch, session.status])

  useEffect(() => {
    if (isLoaded) {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state))
    }
  }, [isLoaded, state])
}
