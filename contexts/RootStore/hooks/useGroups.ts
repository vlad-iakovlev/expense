import { useCallback, useMemo } from 'react'
import { generateObjectId } from '../../../utils/client/generateObjectId.ts'
import { useRootStore } from '../RootStore.tsx'
import { getOrderedGroups } from '../getters/groups.ts'
import { GroupsActionTypes } from '../types.tsx'

export const useGroups = () => {
  const { state, dispatch } = useRootStore()

  const groupIds = useMemo<string[]>(
    () => getOrderedGroups(state).map((group) => group.id),
    [state],
  )

  const createGroup = useCallback(() => {
    const groupId = generateObjectId()

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
