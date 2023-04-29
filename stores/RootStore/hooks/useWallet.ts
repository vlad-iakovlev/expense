import { useCallback, useMemo } from 'react'
import { PopulatedClientWallet } from '../../../types/client.ts'
import { useRootStore } from '../RootStore.tsx'
import { getPopulatedWallet } from '../getters/wallets.ts'
import { WalletsActionTypes } from '../types.tsx'

interface Props {
  walletId: string
}

export const useWallet = ({ walletId }: Props) => {
  const { state, dispatch } = useRootStore()

  const wallet = useMemo<PopulatedClientWallet>(
    () => getPopulatedWallet(state, walletId),
    [state, walletId]
  )

  const setWalletName = useCallback(
    (name: string) => {
      dispatch({
        type: WalletsActionTypes.SET_WALLET_NAME,
        payload: { walletId, name },
      })
    },
    [dispatch, walletId]
  )

  const setWalletCurrency = useCallback(
    (currencyId: string) => {
      dispatch({
        type: WalletsActionTypes.SET_WALLET_CURRENCY,
        payload: { walletId, currencyId },
      })
    },
    [dispatch, walletId]
  )

  const removeWallet = useCallback(() => {
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
