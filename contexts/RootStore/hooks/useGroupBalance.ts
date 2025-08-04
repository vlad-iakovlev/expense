import { useMemo } from 'react'
import { ClientBalance } from '@/types/client'
import { getGroupBalance } from '../getters/groups'
import { useRootStore } from '../index'

type UseGroupBalanceProps = {
  groupId: string
}

export const useGroupBalance = ({ groupId }: UseGroupBalanceProps) => {
  const { state } = useRootStore()

  const groupBalance = useMemo<ClientBalance>(
    () => getGroupBalance(state, groupId),
    [groupId, state],
  )

  return {
    groupBalance,
  }
}
