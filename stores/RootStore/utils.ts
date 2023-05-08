import { ClientTransaction } from '../../types/client.ts'
import { RootStoreState } from './types.tsx'

export const getEmptyState = (): RootStoreState => ({
  currencies: [],
  users: [],
  userGroups: [],
  groups: [],
  wallets: [],
  operations: [],
  nextSyncTransaction: getEmptyTransaction(),
  syncingTransaction: getEmptyTransaction(),
  lastTransactionId: null,
  syncedAt: null,
})

export const getEmptyTransaction = (): ClientTransaction => ({
  groups: [],
  wallets: [],
  operations: [],
})

export const mergeTransactions = (
  a: ClientTransaction,
  b: ClientTransaction
): ClientTransaction => ({
  groups: [...a.groups, ...b.groups],
  wallets: [...a.wallets, ...b.wallets],
  operations: [...a.operations, ...b.operations],
})

export const isTransactionEmpty = (transaction: ClientTransaction) => {
  return (
    transaction.groups.length === 0 &&
    transaction.wallets.length === 0 &&
    transaction.operations.length === 0
  )
}
