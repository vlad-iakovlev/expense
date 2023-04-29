import { useMemo } from 'react'
import { ClientBalance } from '../../../types/client.ts'
import { useRootStore } from '../RootStore.tsx'
import { getGroupBalance } from '../getters/groups.ts'

interface Props {
  groupId: string
}

export const useGroupBalance = ({ groupId }: Props) => {
  const { state } = useRootStore()

  const groupBalance = useMemo<ClientBalance>(
    () => getGroupBalance(state, groupId),
    [groupId, state]
  )

  return {
    groupBalance,
  }
}
