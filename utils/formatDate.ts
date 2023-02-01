import { format } from 'date-fns'

export const formatDate = (date: Date) => {
  return format(date, 'd MMM yyyy HH:mm')
}
