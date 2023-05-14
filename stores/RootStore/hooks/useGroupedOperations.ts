import * as fns from 'date-fns'
import { useMemo } from 'react'
import { ClientOperation } from '../../../types/client.ts'
import { useRootStore } from '../RootStore.tsx'
import { getOrderedOperations } from '../getters/operations.ts'

type GroupedOperations = { date: Date; operationIds: string[] }[]

interface Props {
  groupId?: string
  walletId?: string
  category?: string
}

export const useGroupedOperations = ({
  groupId,
  walletId,
  category,
}: Props = {}) => {
  const { state } = useRootStore()

  const groupedOperationIds = useMemo<GroupedOperations>(() => {
    const operations = getOrderedOperations(state, {
      groupId,
      walletId,
      category,
    })
    return groupOperations(operations)
  }, [category, groupId, state, walletId])

  return {
    groupedOperationIds,
  }
}

const groupOperations = (operations: ClientOperation[]) => {
  if (!operations.length) return []

  const result: GroupedOperations = []

  let date = fns.startOfDay(operations[0].date)
  let operationIds = [operations[0].id]

  for (let i = 1; i < operations.length; i++) {
    if (fns.isSameDay(date, operations[i].date)) {
      operationIds.push(operations[i].id)
    } else {
      result.push({ date, operationIds })
      date = fns.startOfDay(operations[i].date)
      operationIds = [operations[i].id]
    }
  }

  result.push({ date, operationIds })

  return result
}
