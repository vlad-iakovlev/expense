import assert from 'assert'
import React from 'react'
import { v4 as uuid } from 'uuid'
import { getOrderedOperations } from '../getters/operations'
import { useRootStore } from '../index'
import { OperationsActionTypes } from '../types'

interface UseOperationsProps {
  groupId?: string
  walletId?: string
  category?: string
}

export const useOperations = ({
  groupId,
  walletId,
  category,
}: UseOperationsProps) => {
  const { state, dispatch } = useRootStore()

  const operationIds = React.useMemo<string[]>(() => {
    const operations = getOrderedOperations(state, {
      groupId,
      walletId,
      category,
    })
    return operations.map((operation) => operation.id)
  }, [category, groupId, state, walletId])

  const createOperation = React.useCallback(() => {
    assert(walletId, 'walletId is not defined')
    const operationId = uuid()

    dispatch({
      type: OperationsActionTypes.CREATE_OPERATION,
      payload: { operationId, walletId },
    })

    return operationId
  }, [dispatch, walletId])

  return {
    operationIds,
    createOperation,
  }
}
