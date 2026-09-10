export function currentMonth() {
  return new Date().toISOString().slice(0, 7)
}

export function formatMonth(month) {
  return new Date(`${month}-01T12:00:00`).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export function shiftMonth(month, amount) {
  const date = new Date(`${month}-01T12:00:00`)
  date.setMonth(date.getMonth() + amount)
  return date.toISOString().slice(0, 7)
}

export function formatDate(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
}
