import { createContext, FC, ReactNode, useMemo } from 'react'
import { getWallets } from '../../api/client/wallets'
import { GetWalletsResponse } from '../../api/types/wallets'
import { useSwrContext } from '../../hooks/useSwrContext'
import { SwrValue, useSwrValue } from '../../hooks/useSwrValue'

interface WalletsPayload {
  groupId?: string
}

type ContextValue = SwrValue<GetWalletsResponse, WalletsPayload>

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
    useMemo(() => ({ groupId }), [groupId]),
    useMemo(() => ({ groupId }), [groupId])
  )

  return (
    <WalletsContext.Provider value={value}>{children}</WalletsContext.Provider>
  )
}

export const useWalletsContext = () => {
  const context = useSwrContext(WalletsContext)

  return {
    walletsResponse: context.response,
    walletsPayload: context.payload,
    mutateWallets: context.mutate,
  }
}
