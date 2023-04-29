import { Reducer, ReducerAction } from 'react'
import { PerformSyncResponse } from '../../../api/types.ts'
import { RootStoreState, StorageActionType } from '../types.tsx'

const startSyncReducer: Reducer<
  RootStoreState,
  { type: StorageActionType.START_SYNC }
> = (state) => {
  return {
    ...state,
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
> = (state, action) => {
  const newGroups = action.payload.response.groups.map((group) => ({
    ...group,
    updatedAt: action.payload.syncStartedAt,
  }))

  const newWallets = action.payload.response.wallets.map((wallet) => ({
    ...wallet,
    updatedAt: action.payload.syncStartedAt,
  }))

  const newOperations = action.payload.response.operations.map((operation) => ({
    ...operation,
    date: new Date(operation.date),
    updatedAt: action.payload.syncStartedAt,
  }))

  return {
    currencies: action.payload.response.currencies,
    groups: newGroups,
    wallets: [...newWallets, ...state.wallets]
      .sort((a, b) => Number(b.updatedAt) - Number(a.updatedAt))
      .filter(
        (item, index, array) =>
          array.findIndex((i) => i.id === item.id) === index
      ),
    operations: [...newOperations, ...state.operations]
      .sort((a, b) => Number(b.updatedAt) - Number(a.updatedAt))
      .filter(
        (item, index, array) =>
          array.findIndex((i) => i.id === item.id) === index
      ),
    isReady: true,
    isSyncing: false,
    shouldSync: false,
    syncedAt: action.payload.syncStartedAt,
  }
}

const setStateFromBrowserStorageReducer: Reducer<
  RootStoreState,
  {
    type: StorageActionType.SET_STATE_FROM_BROWSER_STORAGE
    payload: string
  }
> = (state, action) => {
  const storedState = JSON.parse(action.payload) as RootStoreState

  return {
    currencies: storedState.currencies,
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
      date: new Date(operation.date),
      updatedAt: new Date(operation.updatedAt),
    })),
    isReady: storedState.isReady,
    isSyncing: false,
    shouldSync: false,
    syncedAt: storedState.syncedAt ? new Date(storedState.syncedAt) : null,
  }
}

const clearBrowserStorage: Reducer<
  RootStoreState,
  { type: StorageActionType.CLEAR_BROWSER_STORAGE }
> = () => {
  return {
    currencies: [],
    groups: [],
    wallets: [],
    operations: [],
    isReady: false,
    isSyncing: false,
    shouldSync: false,
    syncedAt: null,
  }
}

export type StorageAction =
  | ReducerAction<typeof startSyncReducer>
  | ReducerAction<typeof abortSyncReducer>
  | ReducerAction<typeof setStateFromRemoteStorageReducer>
  | ReducerAction<typeof setStateFromBrowserStorageReducer>
  | ReducerAction<typeof clearBrowserStorage>

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

    case StorageActionType.CLEAR_BROWSER_STORAGE:
      return clearBrowserStorage(state, action)
  }
}