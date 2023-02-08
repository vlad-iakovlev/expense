import { createContext, FC, ReactNode, useMemo } from 'react'
import { getOperations } from '../../api/client/operations'
import {
  GetOperationsQuery,
  GetOperationsResponse,
} from '../../api/types/operations'
import { useSwrContext } from '../../hooks/useSwrContext'
import { SwrValue, useSwrValue } from '../../hooks/useSwrValue'

type ContextValue = SwrValue<GetOperationsResponse, GetOperationsQuery>

interface ProviderProps {
  groupId?: string
  walletId?: string
  children: ReactNode
}

export const OperationsContext = createContext<ContextValue | undefined>(
  undefined
)
OperationsContext.displayName = 'OperationsContext'

export const OperationsProvider: FC<ProviderProps> = ({
  groupId,
  walletId,
  children,
}) => {
  const value = useSwrValue(
    'operations',
    getOperations,
    useMemo(() => ({ groupId, walletId }), [groupId, walletId])
  )

  return (
    <OperationsContext.Provider value={value}>
      {children}
    </OperationsContext.Provider>
  )
}

export const useOperationsContext = () => {
  const context = useSwrContext(OperationsContext)

  return {
    operations: context.data.operations,
    operationsQuery: context.query,
    mutateOperations: context.mutate,
  }
}
