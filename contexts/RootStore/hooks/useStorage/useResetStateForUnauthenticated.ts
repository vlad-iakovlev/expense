import { useSession } from 'next-auth/react'
import React from 'react'
import { StorageAction } from '../../reducers/storage'
import { RootStoreState, StorageActionType } from '../../types'
import { getLocalStorageKey } from './constants'

export const useResetStateForUnauthenticated = (
  state: RootStoreState,
  dispatch: React.Dispatch<StorageAction>,
) => {
  const session = useSession()

  React.useEffect(() => {
    if (session.status === 'unauthenticated') {
      dispatch({ type: StorageActionType.RESET_STATE })
      window.localStorage.removeItem(getLocalStorageKey())
    }
  }, [session.status, dispatch])
}
