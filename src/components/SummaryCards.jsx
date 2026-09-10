const money = (value) => `₹${Math.round(value).toLocaleString('en-IN')}`

export default function SummaryCards({ summary }) {
  const cards = [
    ['Monthly salary', money(summary.salary), 'income'],
    ['Total expenses', money(summary.total), 'expense'],
    ['Remaining balance', money(summary.remaining), summary.remaining < 0 ? 'negative' : 'balance'],
    ['Number of expenses', summary.count, 'count'],
  ]
  return <section className="summary-grid">{cards.map(([label, value, type]) => <article className={`summary-card ${type}`} key={label}><span>{label}</span><strong>{value}</strong></article>)}</section>
}
