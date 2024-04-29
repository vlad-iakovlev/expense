import { produce } from 'immer'
import { getDefaultCurrency } from '../getters/currencies.js'
import { RootStoreState, WalletsActionTypes } from '../types.jsx'

const createWalletReducer: React.Reducer<
  RootStoreState,
  {
    type: WalletsActionTypes.CREATE_WALLET
    payload: {
      walletId: string
      groupId: string
    }
  }
> = (state, { payload: { walletId, groupId } }) =>
  produce(state, (draft) => {
    draft.wallets.push({
      id: walletId,
      createdAt: new Date(),
      removed: false,
      name: 'Untitled',
      order: null,
      currencyId: getDefaultCurrency(state, { groupId }).id,
      groupId: groupId,
    })
    draft.nextSyncTransaction.wallets.push(walletId)
  })

const removeWalletReducer: React.Reducer<
  RootStoreState,
  {
    type: WalletsActionTypes.REMOVE_WALLET
    payload: {
      walletId: string
    }
  }
> = (state, { payload: { walletId } }) =>
  produce(state, (draft) => {
    draft.wallets.forEach((wallet) => {
      if (wallet.id === walletId) {
        wallet.removed = true
        draft.nextSyncTransaction.wallets.push(walletId)
      }
    })
  })

const setWalletNameReducer: React.Reducer<
  RootStoreState,
  {
    type: WalletsActionTypes.SET_WALLET_NAME
    payload: {
      walletId: string
      name: string
    }
  }
> = (state, { payload: { walletId, name } }) =>
  produce(state, (draft) => {
    draft.wallets.forEach((wallet) => {
      if (wallet.id === walletId) {
        wallet.name = name
        draft.nextSyncTransaction.wallets.push(walletId)
      }
    })
  })

const setWalletCurrencyReducer: React.Reducer<
  RootStoreState,
  {
    type: WalletsActionTypes.SET_WALLET_CURRENCY
    payload: {
      walletId: string
      currencyId: string
    }
  }
> = (state, { payload: { walletId, currencyId } }) =>
  produce(state, (draft) => {
    draft.wallets.forEach((wallet) => {
      if (wallet.id === walletId) {
        wallet.currencyId = currencyId
        draft.nextSyncTransaction.wallets.push(walletId)
      }
    })
  })

const reorderWalletsReducer: React.Reducer<
  RootStoreState,
  {
    type: WalletsActionTypes.REORDER_WALLETS
    payload: {
      walletIds: string[]
    }
  }
> = (state, { payload: { walletIds } }) =>
  produce(state, (draft) => {
    walletIds.forEach((walletId, order) => {
      draft.wallets.forEach((wallet) => {
        if (wallet.id === walletId) {
          wallet.order = order
          draft.nextSyncTransaction.wallets.push(walletId)
        }
      })
    })
  })

export type WalletsAction =
  | React.ReducerAction<typeof createWalletReducer>
  | React.ReducerAction<typeof removeWalletReducer>
  | React.ReducerAction<typeof setWalletNameReducer>
  | React.ReducerAction<typeof setWalletCurrencyReducer>
  | React.ReducerAction<typeof reorderWalletsReducer>

export const isWalletsAction = (action: {
  type: string
  payload?: unknown
}): action is WalletsAction =>
  Object.values(WalletsActionTypes).includes(action.type as WalletsActionTypes)

export const walletsReducer: React.Reducer<RootStoreState, WalletsAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case WalletsActionTypes.CREATE_WALLET:
      return createWalletReducer(state, action)

    case WalletsActionTypes.REMOVE_WALLET:
      return removeWalletReducer(state, action)

    case WalletsActionTypes.SET_WALLET_NAME:
      return setWalletNameReducer(state, action)

    case WalletsActionTypes.SET_WALLET_CURRENCY:
      return setWalletCurrencyReducer(state, action)

    case WalletsActionTypes.REORDER_WALLETS:
      return reorderWalletsReducer(state, action)
  }
}
