import React from 'react'
import { ClientBalance } from '@/types/client.js'
import { getGroupBalance } from '../getters/groups.js'
import { useRootStore } from '../index.jsx'

interface UseGroupBalanceProps {
  groupId: string
}

export const useGroupBalance = ({ groupId }: UseGroupBalanceProps) => {
  const { state } = useRootStore()

  const groupBalance = React.useMemo<ClientBalance>(
    () => getGroupBalance(state, groupId),
    [groupId, state],
  )

  return {
    groupBalance,
  }
}
