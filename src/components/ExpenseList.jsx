import { useState } from 'react'
import { formatDate } from '../utils/dateUtils'
const money = (value) => `₹${Number(value).toLocaleString('en-IN')}`

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('date-desc')
  const categories = [...new Set(expenses.map((expense) => expense.category))]
  const visible = expenses.filter((expense) => category === 'all' || expense.category === category).sort((a, b) => sort === 'amount-desc' ? b.amount - a.amount : sort === 'amount-asc' ? a.amount - b.amount : sort === 'date-asc' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date))
  return <section className="panel expenses-panel"><div className="section-heading"><div><span className="eyebrow">This month</span><h2>Expenses <span className="count-pill">{expenses.length}</span></h2></div><div className="filters"><select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter by category"><option value="all">All categories</option>{categories.map((item) => <option key={item}>{item}</option>)}</select><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort expenses"><option value="date-desc">Newest first</option><option value="date-asc">Oldest first</option><option value="amount-desc">Highest amount</option><option value="amount-asc">Lowest amount</option></select></div></div>{visible.length ? <div className="table-wrap"><table><thead><tr><th>Date</th><th>Description</th><th>Category</th><th>Amount</th><th>Notes</th><th aria-label="Actions"></th></tr></thead><tbody>{visible.map((expense) => <tr key={expense.id}><td>{formatDate(expense.date)}</td><td className="description-cell">{expense.description}</td><td><span className="category-tag">{expense.category}</span></td><td className="amount-cell">{money(expense.amount)}</td><td className="notes-cell">{expense.notes || '-'}</td><td className="actions"><button
  type="button"
  onClick={() => onEdit(expense)}
  aria-label={`Edit ${expense.description}`}
>
  Edit
</button>

<button
  type="button"
  className="delete-button"
  onClick={() => onDelete(expense.id)}
  aria-label={`Delete ${expense.description}`}
>
  Delete
</button></td></tr>)}</tbody></table></div> : <div className="empty-state">No expenses match this month or filter.</div>}</section>
}
