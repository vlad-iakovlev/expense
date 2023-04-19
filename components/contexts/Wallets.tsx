import { FC, ReactNode, createContext, useMemo } from 'react'
import { getWallets } from '../../api/client/wallets.ts'
import { GetWalletsResponse } from '../../api/types/wallets.ts'
import { useSwrContext } from '../../hooks/useSwrContext.ts'
import { SwrValue, useSwrValue } from '../../hooks/useSwrValue.ts'

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
