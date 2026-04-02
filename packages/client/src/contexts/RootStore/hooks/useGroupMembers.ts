import { useRootStore } from '..'
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
    if (!session.data) throw new Error('Unauthenticated')

    return getGroupMembers(state, groupId, session.data.user)
  }, [groupId, session, state])

  return {
    groupMembers,
  }
}
