import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { getOperations } from '../../api/client/operations.ts'
import {
  GetOperationsQuery,
  GetOperationsResponse,
} from '../../api/types/operations.ts'
import { useSwrContext } from '../../hooks/useSwrContext.ts'
import { SwrValue, useSwrValue } from '../../hooks/useSwrValue.ts'

interface OperationsResponse extends GetOperationsResponse {
  hasPrevOperations: boolean
  hasNextOperations: boolean
}

interface OperationsPayload {
  groupId?: string
  walletId?: string
  category: string
  setCategory: (category: string) => void
  getPrevOperations: () => void
  getNextOperations: () => void
}

type ContextValue = SwrValue<OperationsResponse, OperationsPayload>

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
  const [category, setCategory] = useState('')
  const [skip, setSkip] = useState(0)

  const handleSetCategory = useCallback((category: string) => {
    setCategory(category)
    setSkip(0)
  }, [])

  const getPrevOperations = useCallback(() => {
    setSkip((skip) => skip - PER_PAGE)
  }, [])

  const getNextOperations = useCallback(() => {
    setSkip((skip) => skip + PER_PAGE)
  }, [])

  const value = useSwrValue(
    'operations',
    useCallback(async (query: GetOperationsQuery) => {
      const { operations } = await getOperations(query)

      return {
        operations: operations.slice(0, PER_PAGE),
        hasPrevOperations: (query.skip ?? 0) > 0,
        hasNextOperations: operations.length > PER_PAGE,
      }
    }, []),
    useMemo(
      () => ({
        groupId,
        walletId,
        category: category || undefined,
        skip,
        take: PER_PAGE + 1,
      }),
      [category, groupId, skip, walletId]
    ),
    useMemo(
      () => ({
        groupId,
        walletId,
        category,
        setCategory: handleSetCategory,
        getPrevOperations,
        getNextOperations,
      }),
      [
        category,
        getNextOperations,
        getPrevOperations,
        groupId,
        handleSetCategory,
        walletId,
      ]
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

  return {
    operationsResponse: context.response,
    operationsPayload: context.payload,
    mutateOperations: context.mutate,
  }
}
