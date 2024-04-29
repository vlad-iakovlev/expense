import * as fns from 'date-fns'
import React from 'react'

export enum PeriodType {
  ALL = 'ALL',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}

export const usePeriod = () => {
  const [fromDate, setFromDate] = React.useState<Date>(
    fns.startOfWeek(new Date()),
  )
  const [periodType, setPeriodType] = React.useState<PeriodType>(
    PeriodType.WEEK,
  )

  React.useEffect(() => {
    switch (periodType) {
      case PeriodType.WEEK:
        setFromDate(fns.startOfWeek(new Date()))
        break

      case PeriodType.MONTH:
        setFromDate(fns.startOfMonth(new Date()))
        break

      case PeriodType.YEAR:
        setFromDate(fns.startOfYear(new Date()))
        break
    }
  }, [periodType])

  const startDate = periodType === PeriodType.ALL ? undefined : fromDate

  const endDate = React.useMemo(() => {
    switch (periodType) {
      case PeriodType.WEEK:
        return fns.addWeeks(fromDate, 1)

      case PeriodType.MONTH:
        return fns.addMonths(fromDate, 1)

      case PeriodType.YEAR:
        return fns.addYears(fromDate, 1)
    }
  }, [fromDate, periodType])

  const goPrev = React.useCallback(() => {
    switch (periodType) {
      case PeriodType.WEEK:
        setFromDate((fromDate) => fns.subWeeks(fromDate, 1))
        break

      case PeriodType.MONTH:
        setFromDate((fromDate) => fns.subMonths(fromDate, 1))
        break

      case PeriodType.YEAR:
        setFromDate((fromDate) => fns.subYears(fromDate, 1))
        break
    }
  }, [periodType])

  const goNext = React.useCallback(() => {
    switch (periodType) {
      case PeriodType.WEEK:
        setFromDate((fromDate) => fns.addWeeks(fromDate, 1))
        break

      case PeriodType.MONTH:
        setFromDate((fromDate) => fns.addMonths(fromDate, 1))
        break

      case PeriodType.YEAR:
        setFromDate((fromDate) => fns.addYears(fromDate, 1))
        break
    }
  }, [periodType])

  return {
    startDate,
    endDate,
    fromDate,
    periodType,
    setPeriodType,
    goPrev,
    goNext,
  }
}
