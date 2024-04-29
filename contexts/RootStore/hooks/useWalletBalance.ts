import React from 'react'
import { ClientBalance } from '@/types/client.js'
import { getWalletBalance } from '../getters/wallets.js'
import { useRootStore } from '../index.jsx'

interface UseWalletBalanceProps {
  walletId: string
}

export const useWalletBalance = ({ walletId }: UseWalletBalanceProps) => {
  const { state } = useRootStore()

  const walletBalance = React.useMemo<ClientBalance>(
    () => getWalletBalance(state, walletId),
    [state, walletId],
  )

  return {
    walletBalance,
  }
}
