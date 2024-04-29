import { PerformSyncBody } from '@/api/server/sync/types.js'
import { BrowserStorageState, RootStoreState } from '../types.jsx'
import { isTransactionEmpty } from '../utils.js'

export const getBrowserStorageState = (
  state: RootStoreState,
): BrowserStorageState => ({
  currencies: state.currencies,
  users: state.users,
  userGroups: state.userGroups,
  groups: state.groups,
  wallets: state.wallets.map((wallet) => ({
    ...wallet,
    createdAt: wallet.createdAt.toISOString(),
  })),
  operations: state.operations.map((operation) => ({
    ...operation,
    date: operation.date.toISOString(),
  })),
  disabledCategories: state.disabledCategories,
  nextSyncTransaction: state.nextSyncTransaction,
  syncingTransaction: state.syncingTransaction,
  lastTransactionId: state.lastTransactionId,
  syncedAt: state.syncedAt ? state.syncedAt.toISOString() : null,
})

export const getRemoteStorageBody = (
  state: RootStoreState,
): PerformSyncBody => {
  if (!state.lastTransactionId) {
    return {
      lastTransactionId: null,
      updates: null,
    }
  }

  if (isTransactionEmpty(state.nextSyncTransaction)) {
    return {
      lastTransactionId: state.lastTransactionId,
      updates: null,
    }
  }

  return {
    lastTransactionId: state.lastTransactionId,
    updates: {
      userGroups: state.userGroups.filter((userGroup) =>
        state.nextSyncTransaction.userGroups.includes(userGroup.id),
      ),
      groups: state.groups.filter((group) =>
        state.nextSyncTransaction.groups.includes(group.id),
      ),
      wallets: state.wallets.filter((wallet) =>
        state.nextSyncTransaction.wallets.includes(wallet.id),
      ),
      operations: state.operations
        .filter((operation) =>
          state.nextSyncTransaction.operations.includes(operation.id),
        )
        .map((operation) => ({
          ...operation,
          date: operation.date.toISOString(),
          incomeAmount: String(operation.incomeAmount),
          expenseAmount: String(operation.expenseAmount),
        })),
    },
  }
}
