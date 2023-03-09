import { createContext, FC, ReactNode, useMemo } from 'react'
import { getOperation } from '../../api/client/operations'
import { GetOperationResponse } from '../../api/types/operations'
import { useSwrContext } from '../../hooks/useSwrContext'
import { SwrValue, useSwrValue } from '../../hooks/useSwrValue'

type ContextValue = SwrValue<GetOperationResponse, undefined>

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
    useMemo(() => ({ operationId }), [operationId]),
    undefined
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
    operationResponse: context.response,
    mutateOperation: context.mutate,
  }
}
