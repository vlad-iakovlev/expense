import { useSession } from 'next-auth/react'
import { Dispatch, useEffect } from 'react'
import { performSync } from '../../../api/client/sync.ts'
import { getRemoteStorageBody } from '../getters/remoteStorage.ts'
import { RemoteStorageAction } from '../reducers/remoteStorage.ts'
import { RemoteStorageActionType, RootStoreState } from '../types.tsx'

export const useRemoteStorage = (
  state: RootStoreState,
  dispatch: Dispatch<RemoteStorageAction>
) => {
  const session = useSession()

  useEffect(() => {
    void (async () => {
      if (session.status === 'authenticated' && state.shouldSynchronize) {
        try {
          dispatch({
            type: RemoteStorageActionType.REMOTE_STORAGE_PREPARE,
          })

          const syncStartedAt = new Date()

          const response = await performSync(getRemoteStorageBody(state))

          dispatch({
            type: RemoteStorageActionType.REMOTE_STORAGE_SET_SUCCESSFUL,
            payload: { response, syncStartedAt },
          })
        } catch (error) {
          console.error(error)

          // TODO: Retry in case of error
          // dispatch({
          //   type: RemoteStorageActionType.REMOTE_STORAGE_SET_FAILED,
          // })
        }
      }
    })()
  }, [dispatch, session.status, state])
}
