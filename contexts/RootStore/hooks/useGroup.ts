import assert from 'assert'
import { useSession } from 'next-auth/react'
import { useCallback, useMemo } from 'react'
import { PopulatedClientGroup } from '../../../types/client.ts'
import { useRootStore } from '../RootStore.tsx'
import { getPopulatedGroup } from '../getters/groups.ts'
import { GroupsActionTypes } from '../types.tsx'

interface Props {
  groupId: string
}

export const useGroup = ({ groupId }: Props) => {
  const session = useSession()
  const { state, dispatch } = useRootStore()

  const group = useMemo<PopulatedClientGroup>(
    () => getPopulatedGroup(state, groupId),
    [groupId, state]
  )

  const setGroupName = useCallback(
    (name: string) => {
      dispatch({
        type: GroupsActionTypes.SET_GROUP_NAME,
        payload: { groupId, name },
      })
    },
    [dispatch, groupId]
  )

  const setGroupDefaultCurrency = useCallback(
    (defaultCurrencyId: string) => {
      dispatch({
        type: GroupsActionTypes.SET_GROUP_DEFAULT_CURRENCY,
        payload: { groupId, defaultCurrencyId },
      })
    },
    [dispatch, groupId]
  )

  const removeGroup = useCallback(() => {
    dispatch({
      type: GroupsActionTypes.REMOVE_GROUP,
      payload: { groupId },
    })
  }, [dispatch, groupId])

  const removeUserFromGroup = useCallback(
    (userId: string) => {
      dispatch({
        type: GroupsActionTypes.REMOVE_USER_FROM_GROUP,
        payload: { groupId, userId },
      })
    },
    [dispatch, groupId]
  )

  const leaveGroup = useCallback(() => {
    assert(session.status === 'authenticated', 'User not authenticated')

    dispatch({
      type: GroupsActionTypes.LEAVE_GROUP,
      payload: { groupId, me: session.data.user },
    })
  }, [dispatch, groupId, session.data?.user, session.status])

  return {
    group,
    setGroupName,
    setGroupDefaultCurrency,
    removeGroup,
    removeUserFromGroup,
    leaveGroup,
  }
}
