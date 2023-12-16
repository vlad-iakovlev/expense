import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { StorageAction } from '../../reducers/storage.js'
import { RootStoreState, StorageActionType } from '../../types.jsx'
import { getLocalStorageKey } from './constants.js'

export const useResetStateForUnauthenticated = (
  state: RootStoreState,
  dispatch: React.Dispatch<StorageAction>,
) => {
  const session = useSession()

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      dispatch({ type: StorageActionType.RESET_STATE })
      window.localStorage.removeItem(getLocalStorageKey())
    }
  }, [session.status, dispatch])
}
