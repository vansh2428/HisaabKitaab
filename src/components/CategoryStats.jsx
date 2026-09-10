import { categoryTotals } from '../utils/calculations'
const money = (value) => `₹${Math.round(value).toLocaleString('en-IN')}`

export default function CategoryStats({ expenses }) {
  const totals = Object.entries(categoryTotals(expenses)).sort((a, b) => b[1] - a[1])
  const total = totals.reduce((sum, [, amount]) => sum + amount, 0)
  return <section className="panel stats-panel"><div className="section-heading"><div><span className="eyebrow">Where it goes</span><h2>Category statistics</h2></div><span className="muted">{totals.length} categories</span></div>{totals.length ? <div className="stats-list">{totals.map(([category, amount]) => { const percentage = total ? (amount / total) * 100 : 0; return <div className="stat-row" key={category}><div className="stat-label"><span>{category}</span><strong>{money(amount)}</strong></div><div className="progress-track"><span style={{ width: `${percentage}%` }} /></div><small>{percentage.toFixed(0)}%</small></div> })}</div> : <p className="empty-state">Your category breakdown will appear here.</p>}</section>
}
