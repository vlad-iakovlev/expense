import { FC, ReactNode, createContext, useMemo } from 'react'
import { getWallet } from '../../api/client/wallets.ts'
import { GetWalletResponse } from '../../api/types/wallets.ts'
import { useSwrContext } from '../../hooks/useSwrContext.ts'
import { SwrValue, useSwrValue } from '../../hooks/useSwrValue.ts'

type ContextValue = SwrValue<GetWalletResponse, undefined>

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
    useMemo(() => ({ walletId }), [walletId]),
    undefined
  )

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  )
}

export const useWalletContext = () => {
  const context = useSwrContext(WalletContext)

  return {
    walletResponse: context.response,
    mutateWallet: context.mutate,
  }
}
