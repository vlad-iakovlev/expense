import { Reducer, ReducerAction } from 'react'
import { PerformSyncResponse } from '../../../api/types.ts'
import { RootStoreState, StorageActionType } from '../types.tsx'

const setShouldSyncReducer: Reducer<
  RootStoreState,
  {
    type: StorageActionType.SET_SHOULD_SYNC
    payload: boolean
  }
> = (state, action) => {
  return {
    ...state,
    shouldSync: action.payload,
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
    shouldSync: false,
    syncedAt: action.payload.syncStartedAt,
  }
}

const setStateFromBrowserStorageReducer: Reducer<
  RootStoreState,
  {
    type: StorageActionType.SET_STATE_FROM_BROWSER_STORAGE
    payload: {
      storedState: string
    }
  }
> = (state, action) => {
  const nextState = JSON.parse(action.payload.storedState) as RootStoreState

  nextState.groups.forEach((group) => {
    group.updatedAt = new Date(group.updatedAt)
  })

  nextState.wallets.forEach((wallet) => {
    wallet.updatedAt = new Date(wallet.updatedAt)
  })

  nextState.operations.forEach((operation) => {
    operation.date = new Date(operation.date)
    operation.updatedAt = new Date(operation.updatedAt)
  })

  nextState.syncedAt = nextState.syncedAt && new Date(nextState.syncedAt)

  return nextState
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
    shouldSync: false,
    syncedAt: null,
  }
}

export type StorageAction =
  | ReducerAction<typeof setShouldSyncReducer>
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
    case StorageActionType.SET_SHOULD_SYNC:
      return setShouldSyncReducer(state, action)

    case StorageActionType.SET_STATE_FROM_REMOTE_STORAGE:
      return setStateFromRemoteStorageReducer(state, action)

    case StorageActionType.SET_STATE_FROM_BROWSER_STORAGE:
      return setStateFromBrowserStorageReducer(state, action)

    case StorageActionType.CLEAR_BROWSER_STORAGE:
      return clearBrowserStorage(state, action)
  }
}
