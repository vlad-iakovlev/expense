import { PerformSyncBody } from '../../../api/types.ts'
import { RootStoreState } from '../types.tsx'

export const getRemoteStorageBody = (
  state: RootStoreState
): PerformSyncBody => {
  if (!state.isReady) {
    return {
      groups: [],
      wallets: [],
      operations: [],
      syncedAt: null,
    }
  }

  const syncedAt = state.syncedAt

  const groups = state.groups
    .filter((group) => !syncedAt || group.updatedAt > syncedAt)
    .map((group) => ({
      id: group.id,
      name: group.name,
      removed: group.removed,
      defaultCurrencyId: group.defaultCurrencyId,
    }))

  const wallets = state.wallets
    .filter((wallet) => !syncedAt || wallet.updatedAt > syncedAt)
    .map((wallet) => ({
      id: wallet.id,
      name: wallet.name,
      order: wallet.order,
      removed: wallet.removed,
      currencyId: wallet.currencyId,
      groupId: wallet.groupId,
    }))

  const operations = state.operations
    .filter((operation) => !syncedAt || operation.updatedAt > syncedAt)
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
