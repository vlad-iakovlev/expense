import { useMemo } from 'react'
import { ClientUser } from '../../../types/client.ts'
import { useRootStore } from '../RootStore.tsx'
import { getGroupUsers } from '../getters/groups.ts'

interface Props {
  groupId: string
}

export const useGroupUsers = ({ groupId }: Props) => {
  const { state } = useRootStore()

  const groupUsers = useMemo<ClientUser[]>(
    () => getGroupUsers(state, groupId),
    [groupId, state]
  )

  return {
    groupUsers,
  }
}
