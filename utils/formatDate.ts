import * as fns from 'date-fns'
import { Period } from '../hooks/usePeriod.ts'

export const formatDateTime = (date: Date) => {
  return fns.format(date, "d MMM yyyy 'at' HH:mm")
}

export const formatDateTimeForAriaLabel = (date: Date) => {
  return fns.format(date, "MMMM do yyyy 'at' HH:mm")
}

export const formatDate = (date: Date) => {
  if (fns.isToday(date)) {
    return 'Today'
  }

  if (fns.isYesterday(date)) {
    return 'Yesterday'
  }

  if (fns.isThisWeek(date)) {
    return fns.format(date, 'd MMM, EEEE')
  }

  if (fns.isThisYear(date)) {
    return fns.format(date, 'd MMM')
  }

  return fns.format(date, 'd MMM yyyy')
}

export const formatDateForAriaLabel = (date: Date) => {
  if (fns.isToday(date)) {
    return 'Today'
  }

  if (fns.isYesterday(date)) {
    return 'Yesterday'
  }

  return fns.format(date, 'MMMM do yyyy')
}

export const formatTime = (date: Date) => {
  return fns.format(date, 'HH:mm')
}

export const formatPeriod = (period: Period, firstDate: Date) => {
  if (period === Period.WEEK) {
    const lastDate = fns.addDays(firstDate, 6)
    const formattedLastDate = fns.format(lastDate, `d MMM yyyy`)

    if (firstDate.getFullYear() === lastDate.getFullYear()) {
      if (firstDate.getMonth() === lastDate.getMonth()) {
        return `${fns.format(firstDate, `d`)} – ${formattedLastDate}`
      }

      return `${fns.format(firstDate, `d MMM`)} – ${formattedLastDate}`
    }

    return `${fns.format(firstDate, `d MMM yyyy`)} – ${formattedLastDate}`
  }

  if (period === Period.MONTH) {
    return fns.format(firstDate, `MMM yyyy`)
  }

  if (period === Period.YEAR) {
    return fns.format(firstDate, `yyyy`)
  }

  return 'All time'
}

export const formatPeriodForAriaLabel = (period: Period, firstDate: Date) => {
  if (period === Period.WEEK) {
    const lastDate = fns.addDays(firstDate, 6)
    const formattedLastDate = fns.format(lastDate, `d MMMM yyyy`)

    if (firstDate.getFullYear() === lastDate.getFullYear()) {
      if (firstDate.getMonth() === lastDate.getMonth()) {
        return `${fns.format(firstDate, `d`)} to ${formattedLastDate}`
      }

      return `${fns.format(firstDate, `d MMMM`)} to ${formattedLastDate}`
    }

    return `${fns.format(firstDate, `d MMMM yyyy`)} to ${formattedLastDate}`
  }

  if (period === Period.MONTH) {
    return fns.format(firstDate, `MMMM yyyy`)
  }

  if (period === Period.YEAR) {
    return fns.format(firstDate, `yyyy`)
  }

  return 'All time'
}

export const formatDateForInput = (date: Date) => {
  return fns.format(date, "yyyy-MM-dd'T'HH:mm")
}
