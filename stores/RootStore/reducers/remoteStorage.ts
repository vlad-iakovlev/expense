import { Reducer, ReducerAction } from 'react'
import { PerformSyncResponse } from '../../../api/types.ts'
import { RemoteStorageActionType, RootStoreState } from '../types.tsx'

const remoteStoragePrepareReducer: Reducer<
  RootStoreState,
  { type: RemoteStorageActionType.REMOTE_STORAGE_PREPARE }
> = (state) => {
  return {
    ...state,
    shouldSynchronize: false,
  }
}

const remoteStorageSetSuccessfulReducer: Reducer<
  RootStoreState,
  {
    type: RemoteStorageActionType.REMOTE_STORAGE_SET_SUCCESSFUL
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
    shouldSynchronize: false,
    syncedAt: action.payload.syncStartedAt,
  }
}

export const remoteStorageSetFailedReducer: Reducer<
  RootStoreState,
  { type: RemoteStorageActionType.REMOTE_STORAGE_SET_FAILED }
> = (state) => {
  return {
    ...state,
    shouldSynchronize: true,
  }
}

export type RemoteStorageAction =
  | ReducerAction<typeof remoteStoragePrepareReducer>
  | ReducerAction<typeof remoteStorageSetSuccessfulReducer>
  | ReducerAction<typeof remoteStorageSetFailedReducer>

export const isRemoteStorageAction = (action: {
  type: string
  payload?: unknown
}): action is RemoteStorageAction => {
  return Object.values(RemoteStorageActionType).includes(
    action.type as RemoteStorageActionType
  )
}

export const remoteStorageReducer: Reducer<
  RootStoreState,
  RemoteStorageAction
> = (state, action) => {
  switch (action.type) {
    case RemoteStorageActionType.REMOTE_STORAGE_PREPARE:
      return remoteStoragePrepareReducer(state, action)

    case RemoteStorageActionType.REMOTE_STORAGE_SET_SUCCESSFUL:
      return remoteStorageSetSuccessfulReducer(state, action)

    case RemoteStorageActionType.REMOTE_STORAGE_SET_FAILED:
      return remoteStorageSetFailedReducer(state, action)
  }
}
