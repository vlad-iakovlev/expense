import { Reducer, ReducerAction } from 'react'
import { getDefaultCurrency } from '../getters/currencies.ts'
import { RootStoreState, WalletsActionTypes } from '../types.tsx'

const createWalletReducer: Reducer<
  RootStoreState,
  {
    type: WalletsActionTypes.CREATE_WALLET
    payload: {
      walletId: string
      groupId: string
    }
  }
> = (state, action) => {
  return {
    ...state,
    wallets: [
      ...state.wallets,
      {
        id: action.payload.walletId,
        name: 'Untitled',
        order: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        removed: false,
        currencyId: getDefaultCurrency(state, {
          groupId: action.payload.groupId,
        }).id,
        groupId: action.payload.groupId,
      },
    ],
  }
}

const removeWalletReducer: Reducer<
  RootStoreState,
  {
    type: WalletsActionTypes.REMOVE_WALLET
    payload: {
      walletId: string
    }
  }
> = (state, action) => {
  return {
    ...state,
    wallets: state.wallets.map((wallet) => {
      if (wallet.id === action.payload.walletId) {
        return {
          ...wallet,
          removed: true,
          updatedAt: new Date(),
        }
      }

      return wallet
    }),
  }
}

const setWalletNameReducer: Reducer<
  RootStoreState,
  {
    type: WalletsActionTypes.SET_WALLET_NAME
    payload: {
      walletId: string
      name: string
    }
  }
> = (state, action) => {
  return {
    ...state,
    wallets: state.wallets.map((wallet) => {
      if (wallet.id === action.payload.walletId) {
        return {
          ...wallet,
          name: action.payload.name,
          updatedAt: new Date(),
        }
      }

      return wallet
    }),
  }
}

const setWalletCurrencyReducer: Reducer<
  RootStoreState,
  {
    type: WalletsActionTypes.SET_WALLET_CURRENCY
    payload: {
      walletId: string
      currencyId: string
    }
  }
> = (state, action) => {
  return {
    ...state,
    wallets: state.wallets.map((wallet) => {
      if (wallet.id === action.payload.walletId) {
        return {
          ...wallet,
          currencyId: action.payload.currencyId,
          updatedAt: new Date(),
        }
      }

      return wallet
    }),
  }
}

const reorderWalletsReducer: Reducer<
  RootStoreState,
  {
    type: WalletsActionTypes.REORDER_WALLETS
    payload: {
      walletIds: string[]
      groupId: string
    }
  }
> = (state, action) => {
  return {
    ...state,
    wallets: state.wallets.map((wallet) => {
      if (wallet.groupId !== action.payload.groupId) {
        return wallet
      }

      const newOrder = action.payload.walletIds.findIndex(
        (id) => id === wallet.id
      )

      if (newOrder === -1) {
        return wallet
      }

      return {
        ...wallet,
        order: newOrder,
        updatedAt: new Date(),
      }
    }),
  }
}

export type WalletsAction =
  | ReducerAction<typeof createWalletReducer>
  | ReducerAction<typeof removeWalletReducer>
  | ReducerAction<typeof setWalletNameReducer>
  | ReducerAction<typeof setWalletCurrencyReducer>
  | ReducerAction<typeof reorderWalletsReducer>

export const isWalletsAction = (action: {
  type: string
  payload: unknown
}): action is WalletsAction => {
  return Object.values(WalletsActionTypes).includes(
    action.type as WalletsActionTypes
  )
}

export const walletsReducer: Reducer<RootStoreState, WalletsAction> = (
  state,
  action
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
