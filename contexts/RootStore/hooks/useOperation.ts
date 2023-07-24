import { useCallback, useMemo } from 'react'
import {
  ClientOperationType,
  PopulatedClientOperation,
} from '../../../types/client.ts'
import { useRootStore } from '../RootStore.tsx'
import { getPopulatedOperation } from '../getters/operations.ts'
import { OperationsActionTypes } from '../types.tsx'

interface Props {
  operationId: string
}

export const useOperation = ({ operationId }: Props) => {
  const { state, dispatch } = useRootStore()

  const operation = useMemo<PopulatedClientOperation>(
    () => getPopulatedOperation(state, operationId),
    [state, operationId],
  )

  const setOperationName = useCallback(
    (name: string) => {
      dispatch({
        type: OperationsActionTypes.SET_OPERATION_NAME,
        payload: { operationId, name },
      })
    },
    [dispatch, operationId],
  )

  const setOperationCategory = useCallback(
    (category: string) => {
      dispatch({
        type: OperationsActionTypes.SET_OPERATION_CATEGORY,
        payload: { operationId, category },
      })
    },
    [dispatch, operationId],
  )

  const setOperationDate = useCallback(
    (date: Date) => {
      dispatch({
        type: OperationsActionTypes.SET_OPERATION_DATE,
        payload: { operationId, date },
      })
    },
    [dispatch, operationId],
  )

  const setOperationType = useCallback(
    (type: ClientOperationType) => {
      dispatch({
        type: OperationsActionTypes.SET_OPERATION_TYPE,
        payload: { operationId, type },
      })
    },
    [dispatch, operationId],
  )

  const setOperationIncomeAmount = useCallback(
    (incomeAmount: number) => {
      dispatch({
        type: OperationsActionTypes.SET_OPERATION_INCOME_AMOUNT,
        payload: { operationId, incomeAmount },
      })
    },
    [dispatch, operationId],
  )

  const setOperationExpenseAmount = useCallback(
    (expenseAmount: number) => {
      dispatch({
        type: OperationsActionTypes.SET_OPERATION_EXPENSE_AMOUNT,
        payload: { operationId, expenseAmount },
      })
    },
    [dispatch, operationId],
  )

  const setOperationIncomeWallet = useCallback(
    (incomeWalletId: string) => {
      dispatch({
        type: OperationsActionTypes.SET_OPERATION_INCOME_WALLET,
        payload: { operationId, incomeWalletId },
      })
    },
    [dispatch, operationId],
  )

  const setOperationExpenseWallet = useCallback(
    (expenseWalletId: string) => {
      dispatch({
        type: OperationsActionTypes.SET_OPERATION_EXPENSE_WALLET,
        payload: { operationId, expenseWalletId },
      })
    },
    [dispatch, operationId],
  )

  const removeOperation = useCallback(() => {
    dispatch({
      type: OperationsActionTypes.REMOVE_OPERATION,
      payload: { operationId },
    })
  }, [dispatch, operationId])

  return {
    operation,
    setOperationName,
    setOperationCategory,
    setOperationDate,
    setOperationType,
    setOperationIncomeAmount,
    setOperationExpenseAmount,
    setOperationIncomeWallet,
    setOperationExpenseWallet,
    removeOperation,
  }
}
