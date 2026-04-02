import { useRootStore } from '..'
import * as fns from 'date-fns'
import { useMemo } from 'react'
import { ClientOperation, GroupedOperations } from '@/types/client'
import { getOrderedOperations } from '../getters/operations'

type UseGroupedOperationsProps = {
  groupId?: string
  walletId?: string
  category?: string
}

export const useGroupedOperations = ({
  groupId,
  walletId,
  category,
}: UseGroupedOperationsProps) => {
  const { state } = useRootStore()

  const groupedOperations = useMemo<GroupedOperations[]>(() => {
    const operations = getOrderedOperations(state, {
      groupId,
      walletId,
      category,
    })
    return groupOperations(operations)
  }, [category, groupId, state, walletId])

  return {
    groupedOperations,
  }
}

const groupOperations = (operations: ClientOperation[]) => {
  const operationsMap = Map.groupBy(operations, (operation) =>
    fns.startOfDay(operation.date).getTime(),
  )

  return Array.from(operationsMap).map(([key, operations]) => ({
    date: new Date(key),
    operationIds: operations.map((operation) => operation.id),
  }))
}
