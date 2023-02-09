import { format } from 'date-fns'

export const formatDate = (date: Date) => {
  return format(date, "d MMM yyyy 'at' HH:mm")
}

export const formatDateForInput = (date: Date) => {
  return format(date, "yyyy-MM-dd'T'HH:mm")
}
