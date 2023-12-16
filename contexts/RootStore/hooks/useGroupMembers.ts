import assert from 'assert'
import { useSession } from 'next-auth/react'
import { useMemo } from 'react'
import { ClientUser } from '../../../types/client.js'
import { useRootStore } from '../RootStore.jsx'
import { getGroupMembers } from '../getters/groups.js'

interface Props {
  groupId: string
}

export const useGroupMembers = ({ groupId }: Props) => {
  const session = useSession()
  const { state } = useRootStore()

  const groupMembers = useMemo<ClientUser[]>(() => {
    assert(session.status === 'authenticated', 'User not authenticated')
    return getGroupMembers(state, groupId, session.data.user)
  }, [groupId, session.data?.user, session.status, state])

  return {
    groupMembers,
  }
}
