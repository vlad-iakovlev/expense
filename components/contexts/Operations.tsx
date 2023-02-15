import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { getOperations } from '../../api/client/operations'
import { ClientOperation, GetOperationsQuery } from '../../api/types/operations'
import { useSwrContext } from '../../hooks/useSwrContext'
import { SwrValue, useSwrValue } from '../../hooks/useSwrValue'

interface GetOperationsClientResponse {
  operations: ClientOperation[]
  skip: number
  setSkip: Dispatch<SetStateAction<number>>
}

type ContextValue = SwrValue<GetOperationsClientResponse, GetOperationsQuery>

interface ProviderProps {
  groupId?: string
  walletId?: string
  children: ReactNode
}

export const OperationsContext = createContext<ContextValue | undefined>(
  undefined
)
OperationsContext.displayName = 'OperationsContext'

const PER_PAGE = 10

export const OperationsProvider: FC<ProviderProps> = ({
  groupId,
  walletId,
  children,
}) => {
  const [skip, setSkip] = useState(0)

  const value = useSwrValue(
    'operations',
    useCallback(async (query: GetOperationsQuery) => {
      const { operations } = await getOperations(query)

      return {
        operations,
        skip: query.skip || 0,
        setSkip,
      }
    }, []),
    useMemo(
      () => ({ groupId, walletId, skip, take: PER_PAGE + 1 }),
      [groupId, skip, walletId]
    )
  )

  return (
    <OperationsContext.Provider value={value}>
      {children}
    </OperationsContext.Provider>
  )
}

export const useOperationsContext = () => {
  const context = useSwrContext(OperationsContext)

  const getPrevOperations = useCallback(() => {
    context.data.setSkip((skip) => skip - PER_PAGE)
  }, [context.data])

  const getNextOperations = useCallback(() => {
    context.data.setSkip((skip) => skip + PER_PAGE)
  }, [context.data])

  return {
    operations: context.data.operations.slice(0, PER_PAGE),
    operationsQuery: context.query,
    mutateOperations: context.mutate,
    hasPrevOperations: context.data.skip > 0,
    hasNextOperations: context.data.operations.length > PER_PAGE,
    getPrevOperations,
    getNextOperations,
  }
}
