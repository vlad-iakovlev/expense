import assert from 'assert'
import { useSession } from 'next-auth/react'
import { useCallback, useMemo } from 'react'
import { generateObjectId } from '../../../utils/client/generateObjectId.ts'
import { useRootStore } from '../RootStore.tsx'
import { getGroups } from '../getters/groups.ts'
import { GroupsActionTypes } from '../types.tsx'

export const useGroups = () => {
  const session = useSession()
  const { state, dispatch } = useRootStore()

  const groupIds = useMemo<string[]>(
    () => getGroups(state).map((group) => group.id),
    [state]
  )

  const createGroup = useCallback(() => {
    const user = session.data?.user
    assert(user, 'User not found')
    const groupId = generateObjectId()

    dispatch({
      type: GroupsActionTypes.CREATE_GROUP,
      payload: { groupId, user },
    })

    return groupId
  }, [dispatch, session.data?.user])

  return {
    groupIds: groupIds,
    createGroup,
  }
}
