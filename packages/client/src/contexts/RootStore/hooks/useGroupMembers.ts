import { useRootStore } from '..'
import assert from 'assert'
import { useMemo } from 'react'
import { useSession } from '@/auth-client'
import { ClientUser } from '@/types/client'
import { getGroupMembers } from '../getters/groups'

type UseGroupMembersProps = {
  groupId: string
}

export const useGroupMembers = ({ groupId }: UseGroupMembersProps) => {
  const session = useSession()
  const { state } = useRootStore()

  const groupMembers = useMemo<ClientUser[]>(() => {
    assert(session.data, 'Unauthenticated')

    return getGroupMembers(state, groupId, session.data.user)
  }, [groupId, session, state])

  return {
    groupMembers,
  }
}
