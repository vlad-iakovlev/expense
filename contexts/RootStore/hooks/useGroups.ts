import { useCallback, useMemo } from 'react'
import { v4 as uuid } from 'uuid'
import { getOrderedGroups } from '../getters/groups'
import { useRootStore } from '../index'
import { GroupsActionTypes } from '../types'

export const useGroups = () => {
  const { state, dispatch } = useRootStore()

  const groupIds = useMemo<string[]>(
    () => getOrderedGroups(state).map((group) => group.id),
    [state],
  )

  const createGroup = useCallback(() => {
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
