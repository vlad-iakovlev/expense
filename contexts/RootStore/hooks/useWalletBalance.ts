import { useMemo } from 'react'
import { ClientBalance } from '@/types/client.js'
import { useRootStore } from '../RootStore.jsx'
import { getWalletBalance } from '../getters/wallets.js'

interface Props {
  walletId: string
}

export const useWalletBalance = ({ walletId }: Props) => {
  const { state } = useRootStore()

  const walletBalance = useMemo<ClientBalance>(
    () => getWalletBalance(state, walletId),
    [state, walletId],
  )

  return {
    walletBalance,
  }
}
