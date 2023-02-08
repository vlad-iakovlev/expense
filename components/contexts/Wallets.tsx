import { createContext, FC, ReactNode, useMemo } from 'react'
import { getWallets } from '../../api/client/wallets'
import { GetWalletsQuery, GetWalletsResponse } from '../../api/types/wallets'
import { useSwrContext } from '../../hooks/useSwrContext'
import { SwrValue, useSwrValue } from '../../hooks/useSwrValue'

type ContextValue = SwrValue<GetWalletsResponse, GetWalletsQuery>

interface Props {
  groupId?: string
  children?: ReactNode
}

export const WalletsContext = createContext<ContextValue | undefined>(undefined)
WalletsContext.displayName = 'WalletsContext'

export const WalletsProvider: FC<Props> = ({ groupId, children }) => {
  const value = useSwrValue(
    'wallet',
    getWallets,
    useMemo(() => ({ groupId }), [groupId])
  )

  return (
    <WalletsContext.Provider value={value}>{children}</WalletsContext.Provider>
  )
}

export const useWalletsContext = () => {
  const context = useSwrContext(WalletsContext)

  return {
    wallets: context.data.wallets,
    walletsQuery: context.query,
    mutateWallets: context.mutate,
  }
}
