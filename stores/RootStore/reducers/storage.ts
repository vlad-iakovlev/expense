import assert from 'assert'
import { Reducer, ReducerAction } from 'react'
import { PerformSyncResponse } from '../../../api/types.ts'
import * as P from '../../../utils/piped/index.ts'
import {
  BrowserStorageState,
  RootStoreState,
  StorageActionType,
} from '../types.tsx'
import {
  getEmptyState,
  getEmptyTransaction,
  isTransactionEmpty,
  mergeTransactions,
} from '../utils.ts'

const startSyncReducer: Reducer<
  RootStoreState,
  { type: StorageActionType.START_SYNC }
> = (state) => {
  assert(isTransactionEmpty(state.syncingTransaction), 'Already syncing')

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
      response: PerformSyncResponse & { coldStartNeeded: false }
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
  const mergeItems = <T extends { id: string; updatedAt: Date }>(
    oldItems: T[]
  ): ((newItems: T[]) => T[]) => {
    return (newItems) =>
      P.pipe([...newItems, ...oldItems])
        .pipe(P.sort((a, b) => Number(b.updatedAt) - Number(a.updatedAt)))
        .pipe(P.uniqBy((item) => item.id))
        .value()
  }

  const groups = P.pipe(updates.groups)
    .pipe(P.map((group) => ({ ...group, updatedAt: syncStartedAt })))
    .pipe(mergeItems(state.groups))
    .pipe(
      P.filter(
        (group) =>
          !group.removed || state.nextSyncTransaction.groups.includes(group.id)
      )
    )
    .value()

  const userGroups = P.pipe(updates.userGroups)
    .pipe(P.map((userGroup) => ({ ...userGroup, updatedAt: syncStartedAt })))
    .pipe(
      mergeItems(
        state.userGroups.filter(
          (userGroup) =>
            !state.syncingTransaction.userGroups.includes(userGroup.id)
        )
      )
    )
    .pipe(
      P.filter(
        (userGroup) =>
          !userGroup.removed &&
          groups.find((group) => group.id === userGroup.groupId)
      )
    )
    .value()

  const wallets = P.pipe(updates.wallets)
    .pipe(P.map((wallet) => ({ ...wallet, updatedAt: syncStartedAt })))
    .pipe(mergeItems(state.wallets))
    .pipe(
      P.filter(
        (wallet) =>
          (!wallet.removed ||
            state.nextSyncTransaction.wallets.includes(wallet.id)) &&
          groups.find((group) => group.id === wallet.groupId)
      )
    )
    .value()

  const operations = P.pipe(updates.operations)
    .pipe(
      P.map((operation) => ({
        ...operation,
        updatedAt: syncStartedAt,
        date: new Date(operation.date),
      }))
    )
    .pipe(mergeItems(state.operations))
    .pipe(
      P.filter(
        (operation) =>
          (!operation.removed ||
            state.nextSyncTransaction.operations.includes(operation.id)) &&
          (!operation.incomeWalletId ||
            wallets.find((wallet) => wallet.id === operation.incomeWalletId)) &&
          (!operation.expenseWalletId ||
            wallets.find((wallet) => wallet.id === operation.expenseWalletId))
      )
    )
    .value()

  return {
    currencies: updates.currencies.sort((a, b) => a.name.localeCompare(b.name)),
    users: updates.users,
    userGroups,
    groups,
    wallets,
    operations,
    nextSyncTransaction: state.nextSyncTransaction,
    syncingTransaction: getEmptyTransaction(),
    lastTransactionId,
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
    groups: storedState.groups.map((group) => ({
      ...group,
      updatedAt: new Date(group.updatedAt),
    })),
    wallets: storedState.wallets.map((wallet) => ({
      ...wallet,
      updatedAt: new Date(wallet.updatedAt),
    })),
    operations: storedState.operations.map((operation) => ({
      ...operation,
      updatedAt: new Date(operation.updatedAt),
      date: new Date(operation.date),
    })),
    nextSyncTransaction: mergeTransactions(
      storedState.nextSyncTransaction,
      storedState.syncingTransaction
    ),
    syncingTransaction: getEmptyTransaction(),
    lastTransactionId: storedState.lastTransactionId,
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

export const StorageReducer: Reducer<RootStoreState, StorageAction> = (
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
