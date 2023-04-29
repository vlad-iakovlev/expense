import assert from 'assert'
import { useSession } from 'next-auth/react'
import { Dispatch, useEffect } from 'react'
import { useUpdateEffect } from 'usehooks-ts'
import { BrowserStorageAction } from '../reducers/browserStorage.ts'
import { BrowserStorageActionType, RootStoreState } from '../types.tsx'

const LOCAL_STORAGE_KEY = 'rootStore/v1'

export const useBrowserStorage = (
  state: RootStoreState,
  dispatch: Dispatch<BrowserStorageAction>
) => {
  const session = useSession()

  useEffect(() => {
    if (session.status === 'authenticated' && !state.isReady) {
      try {
        const storedState = window.localStorage.getItem(LOCAL_STORAGE_KEY)
        assert(storedState, 'No stored state found')

        dispatch({
          type: BrowserStorageActionType.BROWSER_STORAGE_SET_SUCCESSFUL,
          payload: { storedState },
        })
      } catch (error) {
        dispatch({
          type: BrowserStorageActionType.BROWSER_STORAGE_SET_FAILED,
        })
      }
    }
  }, [dispatch, session.status, state.isReady])

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      dispatch({
        type: BrowserStorageActionType.BROWSER_STORAGE_CLEAR,
      })
    }
  }, [dispatch, session.status])

  useUpdateEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state))
  }, [state])
}
