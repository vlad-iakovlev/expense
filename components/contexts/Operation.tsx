import { createContext, FC, ReactNode, useMemo } from 'react'
import { getOperation } from '../../api/client/operations'
import {
  GetOperationQuery,
  GetOperationResponse,
} from '../../api/types/operations'
import { useSwrContext } from '../../hooks/useSwrContext'
import { SwrValue, useSwrValue } from '../../hooks/useSwrValue'

type ContextValue = SwrValue<GetOperationResponse, GetOperationQuery>

interface ProviderProps {
  operationId: string
  children: ReactNode
}

export const OperationContext = createContext<ContextValue | undefined>(
  undefined
)
OperationContext.displayName = 'OperationContext'

export const OperationProvider: FC<ProviderProps> = ({
  operationId,
  children,
}) => {
  const value = useSwrValue(
    'operation',
    getOperation,
    useMemo(() => ({ operationId }), [operationId])
  )

  return (
    <OperationContext.Provider value={value}>
      {children}
    </OperationContext.Provider>
  )
}

export const useOperationContext = () => {
  const context = useSwrContext(OperationContext)

  return {
    operation: context.data.operation,
    operationQuery: context.query,
    mutateOperation: context.mutate,
  }
}
