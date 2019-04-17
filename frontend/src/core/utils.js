import moment from 'moment'

export const getTimeFromNow = (date) => {
  return moment(date).fromNow();
}

export const sort = (data, field, order = 'asc') => {
  return data.sort((a, b) => {
    a = new Date(a[field])
    b = new Date(b[field])
    return order === 'desc'
      ? a < b ? -1 : a > b ? 1 : 0
      : a > b ? -1 : a < b ? 1 : 0
  })
}