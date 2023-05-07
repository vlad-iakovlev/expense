import { PerformSyncBody } from '../../../api/server/sync/types.ts'
import { RootStoreState } from '../types.tsx'
import { isTransactionEmpty } from '../utils.ts'

export const getRemoteStorageBody = (
  state: RootStoreState
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
      groups: state.groups.filter((group) => {
        return state.nextSyncTransaction.groups.includes(group.id)
      }),
      wallets: state.wallets.filter((wallet) => {
        return state.nextSyncTransaction.wallets.includes(wallet.id)
      }),
      operations: state.operations.filter((operation) => {
        return state.nextSyncTransaction.operations.includes(operation.id)
      }),
    },
  }
}
