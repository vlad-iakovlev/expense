import { createContext, FC, ReactNode, useMemo } from 'react'
import { getStatisticsByCategory } from '../../api/client/statistics'
import {
  GetStatisticsByCategoryQuery,
  GetStatisticsByCategoryResponse,
} from '../../api/types/statistics'
import { useSwrContext } from '../../hooks/useSwrContext'
import { SwrValue, useSwrValue } from '../../hooks/useSwrValue'

type ContextValue = SwrValue<
  GetStatisticsByCategoryResponse,
  GetStatisticsByCategoryQuery
>

interface ProviderProps {
  groupId?: string
  walletId?: string
  children: ReactNode
}

export const StatisticsByCategoryContext = createContext<
  ContextValue | undefined
>(undefined)
StatisticsByCategoryContext.displayName = 'StatisticsByCategoryContext'

export const StatisticsByCategoryProvider: FC<ProviderProps> = ({
  groupId,
  walletId,
  children,
}) => {
  const value = useSwrValue(
    'statistics-categories',
    getStatisticsByCategory,
    useMemo(() => ({ groupId, walletId }), [groupId, walletId])
  )

  return (
    <StatisticsByCategoryContext.Provider value={value}>
      {children}
    </StatisticsByCategoryContext.Provider>
  )
}

export const useStatisticsByCategoryContext = () => {
  const context = useSwrContext(StatisticsByCategoryContext)

  return {
    statisticsByCategory: context.data.statisticsByCategory,
    statisticsByCategoryQuery: context.query,
    mutateStatisticsByCategory: context.mutate,
  }
}
