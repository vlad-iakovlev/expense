import * as fns from 'date-fns'
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { getStatisticsByCategory } from '../../api/client/statistics'
import { GetStatisticsByCategoryResponse } from '../../api/types/statistics'
import { useSwrContext } from '../../hooks/useSwrContext'
import { SwrValue, useSwrValue } from '../../hooks/useSwrValue'

export enum StatisticsByCategoryPeriod {
  ALL = 'ALL',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}

interface StatisticsByCategoryPayload {
  period: StatisticsByCategoryPeriod
  setPeriod: (period: StatisticsByCategoryPeriod) => void
  fromDate: Date
  goPrev: () => void
  goNext: () => void
}

type ContextValue = SwrValue<
  GetStatisticsByCategoryResponse,
  StatisticsByCategoryPayload
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
  const [period, setPeriod] = useState<StatisticsByCategoryPeriod>(
    StatisticsByCategoryPeriod.WEEK
  )
  const [fromDate, setFromDate] = useState<Date>(
    fns.startOfWeek(new Date(), { weekStartsOn: 1 })
  )

  const startDate = useMemo(() => {
    if (period !== StatisticsByCategoryPeriod.ALL) {
      return fromDate.toISOString()
    }
  }, [fromDate, period])

  const endDate = useMemo(() => {
    switch (period) {
      case StatisticsByCategoryPeriod.WEEK:
        return fns.addWeeks(fromDate, 1).toISOString()

      case StatisticsByCategoryPeriod.MONTH:
        return fns.addMonths(fromDate, 1).toISOString()

      case StatisticsByCategoryPeriod.YEAR:
        return fns.addYears(fromDate, 1).toISOString()
    }
  }, [fromDate, period])

  const handleSetPeriod = useCallback((period: StatisticsByCategoryPeriod) => {
    setPeriod(period)

    switch (period) {
      case StatisticsByCategoryPeriod.WEEK:
        setFromDate(fns.startOfWeek(new Date(), { weekStartsOn: 1 }))
        break

      case StatisticsByCategoryPeriod.MONTH:
        setFromDate(fns.startOfMonth(new Date()))
        break

      case StatisticsByCategoryPeriod.YEAR:
        setFromDate(fns.startOfYear(new Date()))
        break
    }
  }, [])

  const goPrev = useCallback(() => {
    switch (period) {
      case StatisticsByCategoryPeriod.WEEK:
        setFromDate((fromDate) => fns.subWeeks(fromDate, 1))
        break

      case StatisticsByCategoryPeriod.MONTH:
        setFromDate((fromDate) => fns.subMonths(fromDate, 1))
        break

      case StatisticsByCategoryPeriod.YEAR:
        setFromDate((fromDate) => fns.subYears(fromDate, 1))
        break
    }
  }, [period])

  const goNext = useCallback(() => {
    switch (period) {
      case StatisticsByCategoryPeriod.WEEK:
        setFromDate((fromDate) => fns.addWeeks(fromDate, 1))
        break

      case StatisticsByCategoryPeriod.MONTH:
        setFromDate((fromDate) => fns.addMonths(fromDate, 1))
        break

      case StatisticsByCategoryPeriod.YEAR:
        setFromDate((fromDate) => fns.addYears(fromDate, 1))
        break
    }
  }, [period])

  const value = useSwrValue(
    'statistics-categories',
    getStatisticsByCategory,
    useMemo(
      () => ({ groupId, walletId, startDate, endDate }),
      [endDate, groupId, startDate, walletId]
    ),
    useMemo(
      () => ({
        period,
        setPeriod: handleSetPeriod,
        fromDate,
        goPrev,
        goNext,
      }),
      [fromDate, goNext, goPrev, handleSetPeriod, period]
    )
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
    statisticsByCategoryResponse: context.response,
    statisticsByCategoryPayload: context.payload,
    mutateStatisticsByCategory: context.mutate,
  }
}
