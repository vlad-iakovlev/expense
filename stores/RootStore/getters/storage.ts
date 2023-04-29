import { PerformSyncBody } from '../../../api/types.ts'
import { BrowserStorageState, RootStoreState } from '../types.tsx'

export const getBrowserStorageState = (
  state: RootStoreState
): BrowserStorageState => {
  return {
    currencies: state.currencies,
    groups: state.groups,
    wallets: state.wallets,
    operations: state.operations,
    syncedAt: state.syncedAt,
  }
}

export const getRemoteStorageBody = (
  state: RootStoreState
): PerformSyncBody => {
  if (!state.syncedAt) {
    return {
      groups: [],
      wallets: [],
      operations: [],
      syncedAt: null,
    }
  }

  const syncedAt = state.syncedAt

  const groups = state.groups
    .filter((group) => group.updatedAt > syncedAt)
    .map((group) => ({
      id: group.id,
      name: group.name,
      removed: group.removed,
      defaultCurrencyId: group.defaultCurrencyId,
    }))

  const wallets = state.wallets
    .filter((wallet) => wallet.updatedAt > syncedAt)
    .map((wallet) => ({
      id: wallet.id,
      name: wallet.name,
      order: wallet.order,
      removed: wallet.removed,
      currencyId: wallet.currencyId,
      groupId: wallet.groupId,
    }))

  const operations = state.operations
    .filter((operation) => operation.updatedAt > syncedAt)
    .map((operation) => ({
      id: operation.id,
      name: operation.name,
      category: operation.category,
      date: operation.date,
      incomeAmount: operation.incomeAmount,
      expenseAmount: operation.expenseAmount,
      removed: operation.removed,
      incomeWalletId: operation.incomeWalletId,
      expenseWalletId: operation.expenseWalletId,
    }))

  return {
    groups,
    wallets,
    operations,
    syncedAt,
  }
}
