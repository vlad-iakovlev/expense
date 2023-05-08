import assert from 'assert'
import { useSession } from 'next-auth/react'
import { useMemo } from 'react'
import { ClientUser } from '../../../types/client.ts'
import { useRootStore } from '../RootStore.tsx'
import { getGroupUsers } from '../getters/groups.ts'

interface Props {
  groupId: string
}

export const useGroupUsers = ({ groupId }: Props) => {
  const session = useSession()
  const { state } = useRootStore()

  const groupUsers = useMemo<ClientUser[]>(() => {
    assert(session.status === 'authenticated', 'User not authenticated')
    return getGroupUsers(state, groupId, session.data.user)
  }, [groupId, session.data?.user, session.status, state])

  return {
    groupUsers,
  }
}
