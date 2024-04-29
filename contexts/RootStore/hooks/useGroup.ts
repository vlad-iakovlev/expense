import assert from 'assert'
import { useSession } from 'next-auth/react'
import React from 'react'
import { PopulatedClientGroup } from '@/types/client.js'
import { getPopulatedGroup } from '../getters/groups.js'
import { useRootStore } from '../index.jsx'
import { GroupsActionTypes } from '../types.jsx'

interface Props {
  groupId: string
}

export const useGroup = ({ groupId }: Props) => {
  const session = useSession()
  const { state, dispatch } = useRootStore()

  const group = React.useMemo<PopulatedClientGroup>(
    () => getPopulatedGroup(state, groupId),
    [groupId, state],
  )

  const setGroupName = React.useCallback(
    (name: string) => {
      dispatch({
        type: GroupsActionTypes.SET_GROUP_NAME,
        payload: { groupId, name },
      })
    },
    [dispatch, groupId],
  )

  const setGroupDefaultCurrency = React.useCallback(
    (defaultCurrencyId: string) => {
      dispatch({
        type: GroupsActionTypes.SET_GROUP_DEFAULT_CURRENCY,
        payload: { groupId, defaultCurrencyId },
      })
    },
    [dispatch, groupId],
  )

  const removeGroup = React.useCallback(() => {
    dispatch({
      type: GroupsActionTypes.REMOVE_GROUP,
      payload: { groupId },
    })
  }, [dispatch, groupId])

  const removeMemberFromGroup = React.useCallback(
    (userId: string) => {
      dispatch({
        type: GroupsActionTypes.REMOVE_MEMBER_FROM_GROUP,
        payload: { groupId, userId },
      })
    },
    [dispatch, groupId],
  )

  const leaveGroup = React.useCallback(() => {
    assert(session.status === 'authenticated', 'User not authenticated')
    assert(session.data.user?.id, 'User id is required')

    dispatch({
      type: GroupsActionTypes.LEAVE_GROUP,
      payload: {
        groupId,
        me: {
          ...session.data.user,
          id: session.data.user.id,
        },
      },
    })
  }, [dispatch, groupId, session])

  return {
    group,
    setGroupName,
    setGroupDefaultCurrency,
    removeGroup,
    removeMemberFromGroup,
    leaveGroup,
  }
}
