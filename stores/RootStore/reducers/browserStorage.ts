import { Reducer, ReducerAction } from 'react'
import { BrowserStorageActionType, RootStoreState } from '../types.tsx'

const browserStorageSetSuccessfulReducer: Reducer<
  RootStoreState,
  {
    type: BrowserStorageActionType.BROWSER_STORAGE_SET_SUCCESSFUL
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

  return {
    ...nextState,
    shouldSynchronize: true,
  }
}

const browserStorageSetFailedReducer: Reducer<
  RootStoreState,
  { type: BrowserStorageActionType.BROWSER_STORAGE_SET_FAILED }
> = (state) => {
  return {
    ...state,
    shouldSynchronize: true,
  }
}

const browserStorageClearReducer: Reducer<
  RootStoreState,
  { type: BrowserStorageActionType.BROWSER_STORAGE_CLEAR }
> = () => {
  return {
    currencies: [],
    groups: [],
    wallets: [],
    operations: [],
    isReady: false,
    shouldSynchronize: false,
    syncedAt: null,
  }
}

export type BrowserStorageAction =
  | ReducerAction<typeof browserStorageSetSuccessfulReducer>
  | ReducerAction<typeof browserStorageSetFailedReducer>
  | ReducerAction<typeof browserStorageClearReducer>

export const isBrowserStorageAction = (action: {
  type: string
  payload?: unknown
}): action is BrowserStorageAction => {
  return Object.values(BrowserStorageActionType).includes(
    action.type as BrowserStorageActionType
  )
}

export const browserStorageReducer: Reducer<
  RootStoreState,
  BrowserStorageAction
> = (state, action) => {
  switch (action.type) {
    case BrowserStorageActionType.BROWSER_STORAGE_SET_SUCCESSFUL:
      return browserStorageSetSuccessfulReducer(state, action)

    case BrowserStorageActionType.BROWSER_STORAGE_SET_FAILED:
      return browserStorageSetFailedReducer(state, action)

    case BrowserStorageActionType.BROWSER_STORAGE_CLEAR:
      return browserStorageClearReducer(state, action)
  }
}
