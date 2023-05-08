import assert from 'assert'
import { Reducer, ReducerAction } from 'react'
import { PerformSyncResponse } from '../../../api/server/sync/types.ts'
import { uniqBy } from '../../../utils/uniqBy.ts'
import {
  BrowserStorageState,
  RootStoreState,
  StorageActionType,
} from '../types.tsx'
import {
  getEmptyState,
  getEmptyTransaction,
  mergeTransactions,
} from '../utils.ts'

const startSyncReducer: Reducer<
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

const abortSyncReducer: Reducer<
  RootStoreState,
  { type: StorageActionType.ABORT_SYNC }
> = (state) => {
  return {
    ...state,
    nextSyncTransaction: mergeTransactions(
      state.nextSyncTransaction,
      state.syncingTransaction
    ),
    syncingTransaction: getEmptyTransaction(),
    isSyncing: false,
    shouldSync: true,
  }
}

const setStateFromRemoteStorageReducer: Reducer<
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
  }
) => {
  const userGroups = uniqBy(
    [...state.userGroups, ...updates.userGroups],
    (userGroup) => userGroup.id
  ).filter((userGroup) => !userGroup.removed)

  const groups = uniqBy(
    [
      ...state.groups,
      ...(updates.groups.filter((group) => {
        return !state.nextSyncTransaction.groups.includes(group.id)
      }) as typeof state.groups),
    ],
    (group) => group.id
  ).filter((group) => {
    return (
      (!group.removed || state.nextSyncTransaction.groups.includes(group.id)) &&
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
    (wallet) => wallet.id
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
          date: new Date(operation.date),
        })),
    ],
    (operation) => operation.id
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
    nextSyncTransaction: state.nextSyncTransaction,
    syncingTransaction: getEmptyTransaction(),
    lastTransactionId,
    isSyncing: false,
    syncedAt: syncStartedAt,
  }
}

const setStateFromBrowserStorageReducer: Reducer<
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
    wallets: storedState.wallets,
    operations: storedState.operations.map((operation) => ({
      ...operation,
      date: new Date(operation.date),
    })),
    nextSyncTransaction: mergeTransactions(
      storedState.nextSyncTransaction,
      storedState.syncingTransaction
    ),
    syncingTransaction: getEmptyTransaction(),
    lastTransactionId: storedState.lastTransactionId,
    isSyncing: false,
    syncedAt: storedState.syncedAt ? new Date(storedState.syncedAt) : null,
  }
}

const resetStateReducer: Reducer<
  RootStoreState,
  { type: StorageActionType.RESET_STATE }
> = () => getEmptyState()

export type StorageAction =
  | ReducerAction<typeof startSyncReducer>
  | ReducerAction<typeof abortSyncReducer>
  | ReducerAction<typeof setStateFromRemoteStorageReducer>
  | ReducerAction<typeof setStateFromBrowserStorageReducer>
  | ReducerAction<typeof resetStateReducer>

export const isStorageAction = (action: {
  type: string
  payload?: unknown
}): action is StorageAction => {
  return Object.values(StorageActionType).includes(
    action.type as StorageActionType
  )
}

export const storageReducer: Reducer<RootStoreState, StorageAction> = (
  state,
  action
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
