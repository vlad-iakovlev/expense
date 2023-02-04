import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import useSWR from 'swr'
import { getOperations } from '../../api/client/operations'
import { ClientOperation, GetOperationsQuery } from '../../api/types/operations'
import { SWR_KEYS } from '../../constants/swr'
import { Fallback } from '../ui-kit/Fallback'

interface ContextValue {
  operationsQuery: GetOperationsQuery
  operations: ClientOperation[]
  mutateOperations: () => Promise<unknown>
}

interface ProviderProps {
  groupId?: string
  walletId?: string
  children: ReactNode
}

export const OperationsContext = createContext<ContextValue | undefined>(
  undefined
)

export const OperationsProvider: FC<ProviderProps> = ({
  groupId,
  walletId,
  children,
}) => {
  const [skip] = useState(0)
  const [take] = useState(21)

  const query = useMemo<GetOperationsQuery>(
    () => ({ groupId, walletId, skip, take }),
    [groupId, walletId, skip, take]
  )

  const { data, isLoading, mutate } = useSWR(
    SWR_KEYS.OPERATIONS(query),
    useCallback(() => getOperations(query), [query])
  )

  const value = useMemo<ContextValue | undefined>(
    () =>
      data && {
        operationsQuery: query,
        operations: data.operations,
        mutateOperations: mutate,
      },
    [data, mutate, query]
  )

  return (
    <Fallback isLoading={isLoading} data={value}>
      <OperationsContext.Provider value={value}>
        {children}
      </OperationsContext.Provider>
    </Fallback>
  )
}

export const useOperationsContext = () => {
  const context = useContext(OperationsContext)
  if (!context) {
    throw new Error('useOperationsContext must be within OperationsProvider')
  }
  return context
}
