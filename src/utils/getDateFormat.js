export default function getDateFormat(date) {
  const day = new Date(date).getDate()
  const month = new Date(date).getMonth()
  const year = new Date(date).getFullYear()
  const today = `${year}-${month > 9 ? month + 1 : `0${month + 1}`}-${
    day > 9 ? day : `0${day}`
  }`

  return today
}
