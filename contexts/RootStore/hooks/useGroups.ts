import React from 'react'
import { v4 as uuid } from 'uuid'
import { getOrderedGroups } from '../getters/groups.js'
import { useRootStore } from '../index.jsx'
import { GroupsActionTypes } from '../types.jsx'

export const useGroups = () => {
  const { state, dispatch } = useRootStore()

  const groupIds = React.useMemo<string[]>(
    () => getOrderedGroups(state).map((group) => group.id),
    [state],
  )

  const createGroup = React.useCallback(() => {
    const groupId = uuid()

    dispatch({
      type: GroupsActionTypes.CREATE_GROUP,
      payload: { groupId },
    })

    return groupId
  }, [dispatch])

  return {
    groupIds: groupIds,
    createGroup,
  }
}
