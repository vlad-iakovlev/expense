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
      removed: group.removed,
      name: group.name,
      defaultCurrencyId: group.defaultCurrencyId,
    }))

  const wallets = state.wallets
    .filter((wallet) => wallet.updatedAt > syncedAt)
    .map((wallet) => ({
      id: wallet.id,
      removed: wallet.removed,
      name: wallet.name,
      order: wallet.order,
      currencyId: wallet.currencyId,
      groupId: wallet.groupId,
    }))

  const operations = state.operations
    .filter((operation) => operation.updatedAt > syncedAt)
    .map((operation) => ({
      id: operation.id,
      removed: operation.removed,
      name: operation.name,
      category: operation.category,
      date: operation.date,
      incomeAmount: operation.incomeAmount,
      expenseAmount: operation.expenseAmount,
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
