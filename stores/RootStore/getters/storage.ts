import assert from 'assert'
import { PerformSyncBody } from '../../../api/types.ts'
import { ClientTransaction } from '../../../types/client.ts'
import * as P from '../../../utils/piped/index.ts'
import { BrowserStorageState, RootStoreState } from '../types.tsx'
import { isTransactionEmpty } from '../utils.ts'

export const getBrowserStorageState = (
  state: RootStoreState
): BrowserStorageState => {
  return {
    currencies: state.currencies,
    users: state.users,
    userGroups: state.userGroups,
    groups: state.groups,
    wallets: state.wallets,
    operations: state.operations,
    nextSyncTransaction: state.nextSyncTransaction,
    syncingTransaction: state.syncingTransaction,
    lastTransactionId: state.lastTransactionId,
    syncedAt: state.syncedAt,
  }
}

export const getRemoteStorageBody = (
  state: RootStoreState,
  transactionToSync: ClientTransaction
): PerformSyncBody => {
  if (!state.lastTransactionId) {
    return {
      lastTransactionId: null,
      updates: null,
    }
  }

  if (isTransactionEmpty(transactionToSync)) {
    return {
      lastTransactionId: state.lastTransactionId,
      updates: null,
    }
  }

  const groups = P.pipe(transactionToSync.groups)
    .pipe(P.uniq())
    .pipe(
      P.map((groupId) => {
        const group = state.groups.find((item) => item.id === groupId)
        assert(group, 'Group not found')

        return {
          id: group.id,
          removed: group.removed,
          name: group.name,
          defaultCurrencyId: group.defaultCurrencyId,
        }
      })
    )
    .value()

  const wallets = P.pipe(transactionToSync.wallets)
    .pipe(P.uniq())
    .pipe(
      P.map((walletId) => {
        const wallet = state.wallets.find((item) => item.id === walletId)
        assert(wallet, 'Wallet not found')

        return {
          id: wallet.id,
          removed: wallet.removed,
          name: wallet.name,
          order: wallet.order,
          currencyId: wallet.currencyId,
          groupId: wallet.groupId,
        }
      })
    )
    .value()

  const operations = P.pipe(transactionToSync.operations)
    .pipe(P.uniq())
    .pipe(
      P.map((operationId) => {
        const operation = state.operations.find(
          (item) => item.id === operationId
        )
        assert(operation, 'Operation not found')

        return {
          id: operation.id,
          removed: operation.removed,
          name: operation.name,
          category: operation.category,
          date: operation.date,
          incomeAmount: operation.incomeAmount,
          expenseAmount: operation.expenseAmount,
          incomeWalletId: operation.incomeWalletId,
          expenseWalletId: operation.expenseWalletId,
        }
      })
    )
    .value()

  return {
    lastTransactionId: state.lastTransactionId,
    updates: {
      groups,
      wallets,
      operations,
    },
  }
}
