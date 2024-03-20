export default function setNowToMS(date) {
  const reverseDate = date.split('.').reverse()
  const newDate = new Date(reverseDate)
  const dateToMS = newDate.getTime()
  return dateToMS
}
