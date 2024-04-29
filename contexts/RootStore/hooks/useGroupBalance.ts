import React from 'react'
import { ClientBalance } from '@/types/client.js'
import { getGroupBalance } from '../getters/groups.js'
import { useRootStore } from '../index.jsx'

interface Props {
  groupId: string
}

export const useGroupBalance = ({ groupId }: Props) => {
  const { state } = useRootStore()

  const groupBalance = React.useMemo<ClientBalance>(
    () => getGroupBalance(state, groupId),
    [groupId, state],
  )

  return {
    groupBalance,
  }
}
