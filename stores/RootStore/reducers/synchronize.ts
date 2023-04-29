import { Reducer, ReducerAction } from 'react'
import * as R from 'remeda'
import {
  ClientCurrency,
  ClientGroup,
  ClientOperation,
  ClientWallet,
} from '../../../types/client.ts'
import { RootStoreState, SynchronizeActionTypes } from '../types.tsx'

const applySynchronizeResponseReducer: Reducer<
  RootStoreState,
  {
    type: SynchronizeActionTypes.APPLY_SYNCHRONIZE_RESPONSE
    payload: {
      currencies: ClientCurrency[]
      groups: ClientGroup[]
      wallets: ClientWallet[]
      operations: ClientOperation[]
      nextStartDate: Date
    }
  }
> = (state, action) => {
  return {
    currencies: action.payload.currencies,
    groups: R.uniqBy(
      [...action.payload.groups, ...state.groups],
      (group) => group.id
    ),
    wallets: R.uniqBy(
      [...action.payload.wallets, ...state.wallets],
      (wallet) => wallet.id
    ),
    operations: R.uniqBy(
      [...action.payload.operations, ...state.operations],
      (operation) => operation.id
    ),
    nextStartDate: action.payload.nextStartDate,
  }
}

export type SynchronizeAction = ReducerAction<
  typeof applySynchronizeResponseReducer
>

export const isSynchronizeAction = (action: {
  type: string
  payload: unknown
}): action is SynchronizeAction => {
  return Object.values(SynchronizeActionTypes).includes(
    action.type as SynchronizeActionTypes
  )
}

export const synchronizeReducer: Reducer<RootStoreState, SynchronizeAction> = (
  state,
  action
) => {
  switch (action.type) {
    case SynchronizeActionTypes.APPLY_SYNCHRONIZE_RESPONSE:
      return applySynchronizeResponseReducer(state, action)
  }
}
