import React from 'react'
import {
  ClientOperationType,
  PopulatedClientOperation,
} from '@/types/client.js'
import { getPopulatedOperation } from '../getters/operations.js'
import { useRootStore } from '../index.jsx'
import { OperationsActionTypes } from '../types.jsx'

interface Props {
  operationId: string
}

export const useOperation = ({ operationId }: Props) => {
  const { state, dispatch } = useRootStore()

  const operation = React.useMemo<PopulatedClientOperation>(
    () => getPopulatedOperation(state, operationId),
    [state, operationId],
  )

  const setOperationName = React.useCallback(
    (name: string) => {
      dispatch({
        type: OperationsActionTypes.SET_OPERATION_NAME,
        payload: { operationId, name },
      })
    },
    [dispatch, operationId],
  )

  const setOperationCategory = React.useCallback(
    (category: string) => {
      dispatch({
        type: OperationsActionTypes.SET_OPERATION_CATEGORY,
        payload: { operationId, category },
      })
    },
    [dispatch, operationId],
  )

  const setOperationDate = React.useCallback(
    (date: Date) => {
      dispatch({
        type: OperationsActionTypes.SET_OPERATION_DATE,
        payload: { operationId, date },
      })
    },
    [dispatch, operationId],
  )

  const setOperationType = React.useCallback(
    (type: ClientOperationType) => {
      dispatch({
        type: OperationsActionTypes.SET_OPERATION_TYPE,
        payload: { operationId, type },
      })
    },
    [dispatch, operationId],
  )

  const setOperationIncomeAmount = React.useCallback(
    (incomeAmount: number) => {
      dispatch({
        type: OperationsActionTypes.SET_OPERATION_INCOME_AMOUNT,
        payload: { operationId, incomeAmount },
      })
    },
    [dispatch, operationId],
  )

  const setOperationExpenseAmount = React.useCallback(
    (expenseAmount: number) => {
      dispatch({
        type: OperationsActionTypes.SET_OPERATION_EXPENSE_AMOUNT,
        payload: { operationId, expenseAmount },
      })
    },
    [dispatch, operationId],
  )

  const setOperationIncomeWallet = React.useCallback(
    (incomeWalletId: string) => {
      dispatch({
        type: OperationsActionTypes.SET_OPERATION_INCOME_WALLET,
        payload: { operationId, incomeWalletId },
      })
    },
    [dispatch, operationId],
  )

  const setOperationExpenseWallet = React.useCallback(
    (expenseWalletId: string) => {
      dispatch({
        type: OperationsActionTypes.SET_OPERATION_EXPENSE_WALLET,
        payload: { operationId, expenseWalletId },
      })
    },
    [dispatch, operationId],
  )

  const removeOperation = React.useCallback(() => {
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
