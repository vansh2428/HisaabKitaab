import * as XLSX from 'xlsx'
import { categoryTotals, getSummary } from '../utils/calculations'
import { formatMonth } from '../utils/dateUtils'

export function exportMonth(month, monthData) {
  const summary = getSummary(monthData)
  const rows = [
    ['MONTHLY SUMMARY', formatMonth(month)],
    ['Monthly Salary', summary.salary], ['Total Expenses', summary.total], ['Remaining Balance', summary.remaining],
    [], ['CATEGORY TOTALS', 'Amount'],
    ...Object.entries(categoryTotals(monthData.expenses)).map(([category, amount]) => [category, amount]),
    [], ['EXPENSES'], ['Date', 'Description', 'Category', 'Amount', 'Notes'],
    ...monthData.expenses.map(({ date, description, category, amount, notes }) => [date, description, category, amount, notes || '']),
  ]
  const sheet = XLSX.utils.aoa_to_sheet(rows)
  const book = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(book, sheet, 'Expenses')
  XLSX.writeFile(book, `salary-expenses-${month}.xlsx`)
}
