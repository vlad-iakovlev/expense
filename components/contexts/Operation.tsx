import { FC, ReactNode, createContext, useMemo } from 'react'
import { getOperation } from '../../api/client/operations.ts'
import { GetOperationResponse } from '../../api/types/operations.ts'
import { useSwrContext } from '../../hooks/useSwrContext.ts'
import { SwrValue, useSwrValue } from '../../hooks/useSwrValue.ts'

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
