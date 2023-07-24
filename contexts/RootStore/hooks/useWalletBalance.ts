import { useMemo } from 'react'
import { ClientBalance } from '../../../types/client.ts'
import { useRootStore } from '../RootStore.tsx'
import { getWalletBalance } from '../getters/wallets.ts'

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
