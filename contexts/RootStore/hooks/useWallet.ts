import React from 'react'
import { PopulatedClientWallet } from '@/types/client'
import { getPopulatedWallet } from '../getters/wallets'
import { useRootStore } from '../index'
import { WalletsActionTypes } from '../types'

interface UseWalletProps {
  walletId: string
}

export const useWallet = ({ walletId }: UseWalletProps) => {
  const { state, dispatch } = useRootStore()

  const wallet = React.useMemo<PopulatedClientWallet>(
    () => getPopulatedWallet(state, walletId),
    [state, walletId],
  )

  const setWalletName = React.useCallback(
    (name: string) => {
      dispatch({
        type: WalletsActionTypes.SET_WALLET_NAME,
        payload: { walletId, name },
      })
    },
    [dispatch, walletId],
  )

  const setWalletCurrency = React.useCallback(
    (currencyId: string) => {
      dispatch({
        type: WalletsActionTypes.SET_WALLET_CURRENCY,
        payload: { walletId, currencyId },
      })
    },
    [dispatch, walletId],
  )

  const removeWallet = React.useCallback(() => {
    dispatch({
      type: WalletsActionTypes.REMOVE_WALLET,
      payload: { walletId },
    })
  }, [dispatch, walletId])

  return {
    wallet,
    setWalletName,
    setWalletCurrency,
    removeWallet,
  }
}
