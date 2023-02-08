import { createContext, FC, ReactNode, useMemo } from 'react'
import { getWallet } from '../../api/client/wallets'
import { GetWalletQuery, GetWalletResponse } from '../../api/types/wallets'
import { useSwrContext } from '../../hooks/useSwrContext'
import { SwrValue, useSwrValue } from '../../hooks/useSwrValue'

type ContextValue = SwrValue<GetWalletResponse, GetWalletQuery>

interface ProviderProps {
  walletId: string
  children: ReactNode
}

export const WalletContext = createContext<ContextValue | undefined>(undefined)
WalletContext.displayName = 'WalletContext'

export const WalletProvider: FC<ProviderProps> = ({ walletId, children }) => {
  const value = useSwrValue(
    'wallet',
    getWallet,
    useMemo(() => ({ walletId }), [walletId])
  )

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  )
}

export const useWalletContext = () => {
  const context = useSwrContext(WalletContext)

  return {
    wallet: context.data.wallet,
    walletQuery: context.query,
    mutateWallet: context.mutate,
  }
}
