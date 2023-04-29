import assert from 'assert'
import {
  ClientOperation,
  ClientOperationType,
  PopulatedClientOperation,
} from '../../../types/client.ts'
import { RootStoreState } from '../types.tsx'
import { getPopulatedWallet } from './wallets.ts'

interface GetOperationsParams {
  groupId?: string
  walletId?: string
  category?: string
}

export const getOperations = (
  state: RootStoreState,
  { groupId, walletId, category }: GetOperationsParams = {}
): ClientOperation[] => {
  return state.operations
    .filter((operation) => {
      if (
        operation.removed ||
        (category && operation.category !== category) ||
        (walletId &&
          operation.incomeWalletId !== walletId &&
          operation.expenseWalletId !== walletId)
      ) {
        return false
      }

      if (!groupId) {
        return true
      }

      const wallets = state.wallets.filter(
        (wallet) =>
          wallet.id === operation.incomeWalletId ||
          wallet.id === operation.expenseWalletId
      )

      const groups = state.groups.filter((group) =>
        wallets.some((wallet) => wallet.groupId === group.id)
      )

      return groups.some((group) => group.id === groupId)
    })
    .sort((a, b) => Number(b.date) - Number(a.date))
}

export const getOperationType = (
  state: RootStoreState,
  operationId: string
): ClientOperationType => {
  const operation = state.operations.find(
    (operation) => operation.id === operationId
  )
  assert(operation, 'Operation not found')

  if (operation.incomeWalletId && operation.expenseWalletId) {
    return ClientOperationType.TRANSFER
  } else if (operation.incomeWalletId) {
    return ClientOperationType.INCOME
  } else if (operation.expenseWalletId) {
    return ClientOperationType.EXPENSE
  }

  throw new Error('Operation type is not defined')
}

export const getPopulatedOperation = (
  state: RootStoreState,
  operationId: string
): PopulatedClientOperation => {
  const operation = state.operations.find(
    (operation) => operation.id === operationId
  )
  assert(operation, 'Operation not found')

  return {
    id: operation.id,
    name: operation.name,
    category: operation.category,
    date: operation.date,
    type: getOperationType(state, operationId),
    incomeAmount: operation.incomeAmount,
    expenseAmount: operation.expenseAmount,
    incomeWallet: operation.incomeWalletId
      ? getPopulatedWallet(state, operation.incomeWalletId)
      : null,
    expenseWallet: operation.expenseWalletId
      ? getPopulatedWallet(state, operation.expenseWalletId)
      : null,
  }
}