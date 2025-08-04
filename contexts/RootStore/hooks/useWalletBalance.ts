import { useMemo } from 'react'
import { ClientBalance } from '@/types/client'
import { getWalletBalance } from '../getters/wallets'
import { useRootStore } from '../index'

type UseWalletBalanceProps = {
  walletId: string
}

export const useWalletBalance = ({ walletId }: UseWalletBalanceProps) => {
  const { state } = useRootStore()

  const walletBalance = useMemo<ClientBalance>(
    () => getWalletBalance(state, walletId),
    [state, walletId],
  )

  return {
    walletBalance,
  }
}
