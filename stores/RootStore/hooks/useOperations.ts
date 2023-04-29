import assert from 'assert'
import { useCallback, useMemo } from 'react'
import { generateObjectId } from '../../../utils/client/generateObjectId.ts'
import { useRootStore } from '../RootStore.tsx'
import { getOperations } from '../getters/operations.ts'
import { OperationsActionTypes } from '../types.tsx'

interface Props {
  groupId?: string
  walletId?: string
  category?: string
}

export const useOperations = ({ groupId, walletId, category }: Props = {}) => {
  const { state, dispatch } = useRootStore()

  const operationIds = useMemo<string[]>(() => {
    const operations = getOperations(state, { groupId, walletId, category })
    return operations.map((operation) => operation.id)
  }, [category, groupId, state, walletId])

  const createOperation = useCallback(() => {
    assert(walletId, 'walletId is not defined')
    const operationId = generateObjectId()

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
