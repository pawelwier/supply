import {addHours, format} from 'date-fns'

export const formatDate = (date) => {
  return format(addHours(date, 1), 'dd/MM/yyyy HH:mm')
}
