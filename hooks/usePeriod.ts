import * as fns from 'date-fns'
import { useCallback, useMemo, useState } from 'react'

export enum Period {
  ALL = 'ALL',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}

export const usePeriod = () => {
  const [period, _setPeriod] = useState<Period>(Period.WEEK)
  const [fromDate, _setFromDate] = useState<Date>(fns.startOfWeek(new Date()))

  const startDate = useMemo(() => {
    if (period !== Period.ALL) {
      return fromDate
    }
  }, [fromDate, period])

  const endDate = useMemo(() => {
    switch (period) {
      case Period.WEEK:
        return fns.addWeeks(fromDate, 1)

      case Period.MONTH:
        return fns.addMonths(fromDate, 1)

      case Period.YEAR:
        return fns.addYears(fromDate, 1)
    }
  }, [fromDate, period])

  const setPeriod = useCallback((period: Period) => {
    _setPeriod(period)

    switch (period) {
      case Period.WEEK:
        _setFromDate(fns.startOfWeek(new Date()))
        break

      case Period.MONTH:
        _setFromDate(fns.startOfMonth(new Date()))
        break

      case Period.YEAR:
        _setFromDate(fns.startOfYear(new Date()))
        break
    }
  }, [])

  const goPrev = useCallback(() => {
    switch (period) {
      case Period.WEEK:
        _setFromDate((fromDate) => fns.subWeeks(fromDate, 1))
        break

      case Period.MONTH:
        _setFromDate((fromDate) => fns.subMonths(fromDate, 1))
        break

      case Period.YEAR:
        _setFromDate((fromDate) => fns.subYears(fromDate, 1))
        break
    }
  }, [period])

  const goNext = useCallback(() => {
    switch (period) {
      case Period.WEEK:
        _setFromDate((fromDate) => fns.addWeeks(fromDate, 1))
        break

      case Period.MONTH:
        _setFromDate((fromDate) => fns.addMonths(fromDate, 1))
        break

      case Period.YEAR:
        _setFromDate((fromDate) => fns.addYears(fromDate, 1))
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
