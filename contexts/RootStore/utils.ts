import { ClientTransaction } from '../../types/client.ts'
import { RootStoreState } from './types.tsx'

export const getEmptyState = (): RootStoreState => ({
  currencies: [],
  users: [],
  userGroups: [],
  groups: [],
  wallets: [],
  operations: [],
  disabledCategories: [],
  nextSyncTransaction: getEmptyTransaction(),
  syncingTransaction: getEmptyTransaction(),
  lastTransactionId: null,
  isSyncing: false,
  syncedAt: null,
})

export const getEmptyTransaction = (): ClientTransaction => ({
  userGroups: [],
  groups: [],
  wallets: [],
  operations: [],
})

export const mergeTransactions = (
  a: Partial<ClientTransaction>,
  b: Partial<ClientTransaction>,
): ClientTransaction => ({
  userGroups: [...(a.userGroups ?? []), ...(b.userGroups ?? [])],
  groups: [...(a.groups ?? []), ...(b.groups ?? [])],
  wallets: [...(a.wallets ?? []), ...(b.wallets ?? [])],
  operations: [...(a.operations ?? []), ...(b.operations ?? [])],
})

export const isTransactionEmpty = (transaction: ClientTransaction) => {
  return (
    transaction.userGroups.length === 0 &&
    transaction.groups.length === 0 &&
    transaction.wallets.length === 0 &&
    transaction.operations.length === 0
  )
}
