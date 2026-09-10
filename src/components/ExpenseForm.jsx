import { useEffect, useState } from 'react'
import { CATEGORIES } from '../utils/categories'

const emptyExpense = { date: new Date().toISOString().slice(0, 10), description: '', category: '', amount: '', notes: '' }

export default function ExpenseForm({ expense, onSave, onCancel }) {
  const [form, setForm] = useState(expense || emptyExpense)
  const [error, setError] = useState('')
  useEffect(() => setForm(expense || emptyExpense), [expense])
  const update = (event) => {
    const { name, value } = event.target
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }
  const submit = (event) => {
    event.preventDefault()
    if (!form.date || !form.description.trim() || !form.category || Number(form.amount) <= 0) { setError('Add a date, description, category, and amount greater than zero.'); return }
    onSave({ ...form, description: form.description.trim(), amount: Number(form.amount), id: form.id || crypto.randomUUID() })
    setForm(emptyExpense); setError('')
  }
  return <form className="expense-form" onSubmit={submit}><div className="form-heading"><div><span className="eyebrow">{expense ? 'Update entry' : 'New entry'}</span><h2>{expense ? 'Edit expense' : 'Add an expense'}</h2></div>{expense && <button type="button" className="text-button" onClick={onCancel}>Cancel</button>}</div><div className="field-grid"><label>Date<input name="date" type="date" value={form.date} onChange={update} /></label><label>Description<input name="description" value={form.description} onChange={update} placeholder="e.g. Gym membership" /></label><label>Category<select name="category" value={form.category} onChange={update}><option value="">Choose category</option>{CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select></label><label>Amount<input name="amount" type="number" min="0" step="0.01" value={form.amount} onChange={update} placeholder="0" /></label><label className="wide">Notes <span className="optional">Optional</span><textarea name="notes" rows="2" value={form.notes} onChange={update} placeholder="Add a note"></textarea></label></div>{error && <p className="form-error">{error}</p>}<button className="primary-button" type="submit">{expense ? 'Update expense' : '+ Add expense'}</button></form>
}
