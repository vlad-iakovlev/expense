import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import useSWR from 'swr'
import { getWallet } from '../../api/client/wallets'
import { ClientWallet, GetWalletQuery } from '../../api/types/wallets'
import { SWR_KEYS } from '../../constants/swr'
import { Fallback } from '../ui-kit/Fallback'

interface ContextValue {
  walletQuery: GetWalletQuery
  wallet: ClientWallet
  mutateWallet: () => Promise<unknown>
}

interface ProviderProps {
  walletId: string
  children: ReactNode
}

export const WalletContext = createContext<ContextValue | undefined>(undefined)

export const WalletProvider: FC<ProviderProps> = ({ walletId, children }) => {
  const query = useMemo<GetWalletQuery>(() => ({ walletId }), [walletId])

  const { data, error, isLoading, mutate } = useSWR(
    SWR_KEYS.WALLET(query),
    useCallback(() => getWallet(query), [query])
  )

  const value = useMemo<ContextValue | undefined>(
    () =>
      data && {
        walletQuery: query,
        wallet: data.wallet,
        mutateWallet: mutate,
      },
    [data, mutate, query]
  )

  return (
    <Fallback isLoading={isLoading} data={value} error={error}>
      <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
    </Fallback>
  )
}

export const useWalletContext = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWalletContext must be within WalletProvider')
  }
  return context
}
