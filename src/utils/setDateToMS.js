export default function setDateToMS(date) {
  const reverseDate = date.split('-')
  const newDate = new Date(reverseDate)
  const dateToMS = newDate.getTime()
  return dateToMS
}
