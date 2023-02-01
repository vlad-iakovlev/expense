import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import useSWR from 'swr'
import { getWallets } from '../../api/client/wallets'
import { ClientWallet, GetWalletsQuery } from '../../api/types/wallets'
import { SWR_KEYS } from '../../constants/swr'
import { Fallback } from '../ui-kit/Fallback'

interface ContextValue {
  query: GetWalletsQuery
  wallets: ClientWallet[]
}

interface Props {
  groupId?: string
  children?: ReactNode
}

export const WalletsContext = createContext<ContextValue | undefined>(undefined)

export const WalletsProvider: FC<Props> = ({ groupId, children }) => {
  const query = useMemo<GetWalletsQuery>(() => ({ groupId }), [groupId])

  const { data, isLoading } = useSWR(
    SWR_KEYS.WALLETS(query),
    useCallback(() => getWallets(query), [query])
  )

  const value = useMemo<ContextValue | undefined>(
    () =>
      data && {
        query,
        wallets: data.wallets,
      },
    [data, query]
  )

  return (
    <Fallback isLoading={isLoading} data={value}>
      <WalletsContext.Provider value={value}>
        {children}
      </WalletsContext.Provider>
    </Fallback>
  )
}

export const useWalletsContext = () => {
  const context = useContext(WalletsContext)
  if (!context) {
    throw new Error('useWalletsContext must be within WalletsProvider')
  }
  return context
}
