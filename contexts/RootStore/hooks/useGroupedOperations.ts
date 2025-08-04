import * as fns from 'date-fns'
import { useMemo } from 'react'
import { ClientOperation, GroupedOperations } from '@/types/client'
import { getOrderedOperations } from '../getters/operations'
import { useRootStore } from '../index'

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

const groupOperations = (operations: ClientOperation[]) =>
  Object.entries(
    operations.reduce<Record<string, string[]>>((acc, operation) => {
      const date = fns.startOfDay(operation.date).toISOString()

      return {
        ...acc,
        [date]: [...(acc[date] ?? []), operation.id],
      }
    }, {}),
  ).map<GroupedOperations>(([date, operationIds]) => ({
    date: new Date(date),
    operationIds,
  }))
