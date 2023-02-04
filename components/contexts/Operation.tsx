import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import useSWR from 'swr'
import { getOperation } from '../../api/client/operations'
import { ClientOperation, GetOperationQuery } from '../../api/types/operations'
import { SWR_KEYS } from '../../constants/swr'
import { Fallback } from '../ui-kit/Fallback'

interface ContextValue {
  operationQuery: GetOperationQuery
  operation: ClientOperation
  mutateOperation: () => Promise<unknown>
}

interface ProviderProps {
  operationId: string
  children: ReactNode
}

export const OperationContext = createContext<ContextValue | undefined>(
  undefined
)

export const OperationProvider: FC<ProviderProps> = ({
  operationId,
  children,
}) => {
  const query = useMemo<GetOperationQuery>(
    () => ({ operationId }),
    [operationId]
  )

  const { data, isLoading, mutate } = useSWR(
    SWR_KEYS.OPERATION(query),
    useCallback(() => getOperation(query), [query])
  )

  const value = useMemo<ContextValue | undefined>(
    () =>
      data && {
        operationQuery: query,
        operation: data.operation,
        mutateOperation: mutate,
      },
    [data, mutate, query]
  )

  return (
    <Fallback isLoading={isLoading} data={value}>
      <OperationContext.Provider value={value}>
        {children}
      </OperationContext.Provider>
    </Fallback>
  )
}

export const useOperationContext = () => {
  const context = useContext(OperationContext)
  if (!context) {
    throw new Error('useOperationContext must be within OperationProvider')
  }
  return context
}
