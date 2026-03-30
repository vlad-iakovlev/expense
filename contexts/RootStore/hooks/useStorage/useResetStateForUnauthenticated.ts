import { useEffect } from 'react'
import { useSession } from '@/auth-client'
import { StorageAction } from '../../reducers/storage'
import { RootStoreState, StorageActionType } from '../../types'
import { getLocalStorageKey } from './constants'

export const useResetStateForUnauthenticated = (
  state: RootStoreState,
  dispatch: React.Dispatch<StorageAction>,
) => {
  const session = useSession()

  useEffect(() => {
    if (!session.isPending && !session.data) {
      dispatch({ type: StorageActionType.RESET_STATE })
      window.localStorage.removeItem(getLocalStorageKey())
    }
  }, [dispatch, session.data, session.isPending])
}
