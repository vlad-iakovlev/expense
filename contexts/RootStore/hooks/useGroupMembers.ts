import assert from 'assert'
import { useSession } from 'next-auth/react'
import React from 'react'
import { ClientUser } from '@/types/client.js'
import { getGroupMembers } from '../getters/groups.js'
import { useRootStore } from '../index.jsx'

interface Props {
  groupId: string
}

export const useGroupMembers = ({ groupId }: Props) => {
  const session = useSession()
  const { state } = useRootStore()

  const groupMembers = React.useMemo<ClientUser[]>(() => {
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
