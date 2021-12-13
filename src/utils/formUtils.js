export const formatDate = (date) => {
  const minutes = date.getMinutes()
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getUTCHours() + 2}:${minutes >= 10 ? minutes : `0${minutes}`}`
}
