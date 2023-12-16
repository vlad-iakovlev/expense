import { PerformSyncBody } from '../../../api/server/sync/types.js'
import { formatAmount } from '../../../utils/formatAmount.js'
import { BrowserStorageState, RootStoreState } from '../types.jsx'
import { isTransactionEmpty } from '../utils.js'

export const getBrowserStorageState = (
  state: RootStoreState,
): BrowserStorageState => {
  return {
    currencies: state.currencies,
    users: state.users,
    userGroups: state.userGroups,
    groups: state.groups,
    wallets: state.wallets,
    operations: state.operations,
    disabledCategories: state.disabledCategories,
    nextSyncTransaction: state.nextSyncTransaction,
    syncingTransaction: state.syncingTransaction,
    lastTransactionId: state.lastTransactionId,
    syncedAt: state.syncedAt,
  }
}

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
      userGroups: state.userGroups.filter((userGroup) => {
        return state.nextSyncTransaction.userGroups.includes(userGroup.id)
      }),
      groups: state.groups.filter((group) => {
        return state.nextSyncTransaction.groups.includes(group.id)
      }),
      wallets: state.wallets.filter((wallet) => {
        return state.nextSyncTransaction.wallets.includes(wallet.id)
      }),
      operations: state.operations
        .filter((operation) => {
          return state.nextSyncTransaction.operations.includes(operation.id)
        })
        .map((operation) => ({
          ...operation,
          incomeAmount: formatAmount(operation.incomeAmount),
          expenseAmount: formatAmount(operation.expenseAmount),
        })),
    },
  }
}
