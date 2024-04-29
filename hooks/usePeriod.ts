import * as fns from 'date-fns'
import React from 'react'

export enum Period {
  ALL = 'ALL',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}

export const usePeriod = () => {
  const [period, setPeriod] = React.useState<Period>(Period.WEEK)
  const [fromDate, setFromDate] = React.useState<Date>(
    fns.startOfWeek(new Date()),
  )

  React.useEffect(() => {
    switch (period) {
      case Period.WEEK:
        setFromDate(fns.startOfWeek(new Date()))
        break

      case Period.MONTH:
        setFromDate(fns.startOfMonth(new Date()))
        break

      case Period.YEAR:
        setFromDate(fns.startOfYear(new Date()))
        break
    }
  }, [period])

  const startDate = period === Period.ALL ? undefined : fromDate

  const endDate = React.useMemo(() => {
    switch (period) {
      case Period.WEEK:
        return fns.addWeeks(fromDate, 1)

      case Period.MONTH:
        return fns.addMonths(fromDate, 1)

      case Period.YEAR:
        return fns.addYears(fromDate, 1)
    }
  }, [fromDate, period])

  const goPrev = React.useCallback(() => {
    switch (period) {
      case Period.WEEK:
        setFromDate((fromDate) => fns.subWeeks(fromDate, 1))
        break

      case Period.MONTH:
        setFromDate((fromDate) => fns.subMonths(fromDate, 1))
        break

      case Period.YEAR:
        setFromDate((fromDate) => fns.subYears(fromDate, 1))
        break
    }
  }, [period])

  const goNext = React.useCallback(() => {
    switch (period) {
      case Period.WEEK:
        setFromDate((fromDate) => fns.addWeeks(fromDate, 1))
        break

      case Period.MONTH:
        setFromDate((fromDate) => fns.addMonths(fromDate, 1))
        break

      case Period.YEAR:
        setFromDate((fromDate) => fns.addYears(fromDate, 1))
        break
    }
  }, [period])

  return {
    startDate,
    endDate,
    fromDate,
    period,
    setPeriod,
    goPrev,
    goNext,
  }
}
