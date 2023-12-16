import { useCallback, useMemo } from 'react'
import { v4 as uuid } from 'uuid'
import { useRootStore } from '../RootStore.jsx'
import { getOrderedGroups } from '../getters/groups.js'
import { GroupsActionTypes } from '../types.jsx'

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
