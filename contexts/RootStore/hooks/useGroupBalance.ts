import { useMemo } from 'react'
import { ClientBalance } from '@/types/client.js'
import { useRootStore } from '../RootStore.jsx'
import { getGroupBalance } from '../getters/groups.js'

interface Props {
  groupId: string
}

export const useGroupBalance = ({ groupId }: Props) => {
  const { state } = useRootStore()

  const groupBalance = useMemo<ClientBalance>(
    () => getGroupBalance(state, groupId),
    [groupId, state],
  )

  return {
    groupBalance,
  }
}
