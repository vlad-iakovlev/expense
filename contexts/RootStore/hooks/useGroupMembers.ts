import assert from 'assert'
import { useSession } from 'next-auth/react'
import { useMemo } from 'react'
import { ClientUser } from '@/types/client'
import { getGroupMembers } from '../getters/groups'
import { useRootStore } from '../index'

type UseGroupMembersProps = {
  groupId: string
}

export const useGroupMembers = ({ groupId }: UseGroupMembersProps) => {
  const session = useSession()
  const { state } = useRootStore()

  const groupMembers = useMemo<ClientUser[]>(() => {
    assert(session.status === 'authenticated', 'User not authenticated')
    assert(session.data.user?.id, 'User id is required')

    return getGroupMembers(state, groupId, {
      ...session.data.user,
      id: session.data.user.id,
    })
  }, [groupId, session, state])

  return {
    groupMembers,
  }
}
