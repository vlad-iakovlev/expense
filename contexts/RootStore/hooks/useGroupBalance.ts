import React from 'react'
import { ClientBalance } from '@/types/client'
import { getGroupBalance } from '../getters/groups'
import { useRootStore } from '../index'

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
