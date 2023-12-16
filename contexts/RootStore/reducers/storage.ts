import assert from 'assert'
import { PerformSyncResponse } from '../../../api/server/sync/types.js'
import { parseAmount } from '../../../utils/parseAmount.js'
import { uniqBy } from '../../../utils/uniqBy.js'
import {
  BrowserStorageState,
  RootStoreState,
  StorageActionType,
} from '../types.jsx'
import {
  getEmptyState,
  getEmptyTransaction,
  mergeTransactions,
} from '../utils.js'

const startSyncReducer: React.Reducer<
  RootStoreState,
  { type: StorageActionType.START_SYNC }
> = (state) => {
  assert(!state.isSyncing, 'Already syncing')

  return {
    ...state,
    nextSyncTransaction: getEmptyTransaction(),
    syncingTransaction: state.nextSyncTransaction,
    isSyncing: true,
    shouldSync: false,
  }
}

const abortSyncReducer: React.Reducer<
  RootStoreState,
  { type: StorageActionType.ABORT_SYNC }
> = (state) => {
  return {
    ...state,
    nextSyncTransaction: mergeTransactions(
      state.nextSyncTransaction,
      state.syncingTransaction,
    ),
    syncingTransaction: getEmptyTransaction(),
    isSyncing: false,
    shouldSync: true,
  }
}

const setStateFromRemoteStorageReducer: React.Reducer<
  RootStoreState,
  {
    type: StorageActionType.SET_STATE_FROM_REMOTE_STORAGE
    payload: {
      response: PerformSyncResponse
      syncStartedAt: Date
    }
  }
> = (
  state,
  {
    payload: {
      response: { updates, lastTransactionId },
      syncStartedAt,
    },
  },
) => {
  const userGroups = uniqBy(
    [
      ...state.userGroups,
      ...updates.userGroups.filter((userGroup) => {
        return !state.nextSyncTransaction.userGroups.includes(userGroup.id)
      }),
    ],
    (userGroup) => userGroup.id,
  ).filter((userGroup) => {
    return (
      !userGroup.removed ||
      state.nextSyncTransaction.userGroups.includes(userGroup.id)
    )
  })

  const groups = uniqBy(
    [
      ...state.groups,
      ...(updates.groups.filter((group) => {
        return !state.nextSyncTransaction.groups.includes(group.id)
      }) as typeof state.groups),
    ],
    (group) => group.id,
  ).filter((group) => {
    return (
      ((!group.removed && !group.clientRemoved) ||
        state.nextSyncTransaction.groups.includes(group.id)) &&
      (group.clientOnly ||
        userGroups.find((userGroup) => userGroup.groupId === group.id))
    )
  })

  const wallets = uniqBy(
    [
      ...state.wallets,
      ...updates.wallets.filter((wallet) => {
        return !state.nextSyncTransaction.wallets.includes(wallet.id)
      }),
    ],
    (wallet) => wallet.id,
  ).filter((wallet) => {
    return (
      (!wallet.removed ||
        state.nextSyncTransaction.wallets.includes(wallet.id)) &&
      groups.find((group) => group.id === wallet.groupId)
    )
  })

  const operations = uniqBy(
    [
      ...state.operations,
      ...updates.operations
        .filter((operation) => {
          return !state.nextSyncTransaction.operations.includes(operation.id)
        })
        .map((operation) => ({
          ...operation,
          incomeAmount: parseAmount(operation.incomeAmount),
          expenseAmount: parseAmount(operation.expenseAmount),
        })),
    ],
    (operation) => operation.id,
  ).filter((operation) => {
    return (
      (!operation.removed ||
        state.nextSyncTransaction.operations.includes(operation.id)) &&
      (!operation.incomeWalletId ||
        wallets.find((wallet) => wallet.id === operation.incomeWalletId)) &&
      (!operation.expenseWalletId ||
        wallets.find((wallet) => wallet.id === operation.expenseWalletId))
    )
  })

  return {
    currencies: updates.currencies,
    users: updates.users,
    userGroups,
    groups,
    wallets,
    operations,
    disabledCategories: state.disabledCategories,
    nextSyncTransaction: state.nextSyncTransaction,
    syncingTransaction: getEmptyTransaction(),
    lastTransactionId,
    isSyncing: false,
    syncedAt: syncStartedAt,
  }
}

const setStateFromBrowserStorageReducer: React.Reducer<
  RootStoreState,
  {
    type: StorageActionType.SET_STATE_FROM_BROWSER_STORAGE
    payload: string
  }
> = (state, { payload }) => {
  const storedState = JSON.parse(payload) as BrowserStorageState

  return {
    currencies: storedState.currencies,
    users: storedState.users,
    userGroups: storedState.userGroups,
    groups: storedState.groups,
    wallets: storedState.wallets.map((wallet) => ({
      ...wallet,
      createdAt: new Date(wallet.createdAt),
    })),
    operations: storedState.operations.map((operation) => ({
      ...operation,
      date: new Date(operation.date),
    })),
    disabledCategories: storedState.disabledCategories ?? [],
    nextSyncTransaction: mergeTransactions(
      storedState.nextSyncTransaction,
      storedState.syncingTransaction,
    ),
    syncingTransaction: getEmptyTransaction(),
    lastTransactionId: storedState.lastTransactionId,
    isSyncing: false,
    syncedAt: storedState.syncedAt ? new Date(storedState.syncedAt) : null,
  }
}

const resetStateReducer: React.Reducer<
  RootStoreState,
  { type: StorageActionType.RESET_STATE }
> = () => getEmptyState()

export type StorageAction =
  | React.ReducerAction<typeof startSyncReducer>
  | React.ReducerAction<typeof abortSyncReducer>
  | React.ReducerAction<typeof setStateFromRemoteStorageReducer>
  | React.ReducerAction<typeof setStateFromBrowserStorageReducer>
  | React.ReducerAction<typeof resetStateReducer>

export const isStorageAction = (action: {
  type: string
  payload?: unknown
}): action is StorageAction => {
  return Object.values(StorageActionType).includes(
    action.type as StorageActionType,
  )
}

export const storageReducer: React.Reducer<RootStoreState, StorageAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case StorageActionType.START_SYNC:
      return startSyncReducer(state, action)

    case StorageActionType.ABORT_SYNC:
      return abortSyncReducer(state, action)

    case StorageActionType.SET_STATE_FROM_REMOTE_STORAGE:
      return setStateFromRemoteStorageReducer(state, action)

    case StorageActionType.SET_STATE_FROM_BROWSER_STORAGE:
      return setStateFromBrowserStorageReducer(state, action)

    case StorageActionType.RESET_STATE:
      return resetStateReducer(state, action)
  }
}
