export function totalExpenses(expenses) {
  return expenses.reduce((total, expense) => total + Number(expense.amount || 0), 0)
}

export function categoryTotals(expenses) {
  return expenses.reduce((totals, expense) => {
    totals[expense.category] = (totals[expense.category] || 0) + Number(expense.amount || 0)
    return totals
  }, {})
}

export function getSummary(monthData) {
  const expenses = monthData?.expenses || []
  const total = totalExpenses(expenses)
  const highest = expenses.reduce((result, expense) => Math.max(result, Number(expense.amount || 0)), 0)
  const topEntry = Object.entries(categoryTotals(expenses)).sort((a, b) => b[1] - a[1])[0]
  return {
    salary: Number(monthData?.salary || 0), total, remaining: Number(monthData?.salary || 0) - total,
    count: expenses.length, highest, average: expenses.length ? total / expenses.length : 0,
    topCategory: topEntry?.[0] || 'No spending yet',
  }
}
