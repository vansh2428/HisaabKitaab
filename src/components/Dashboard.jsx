import SummaryCards from './SummaryCards'
import CategoryStats from './CategoryStats'
import ExpenseList from './ExpenseList'

export default function Dashboard({ summary, expenses, onEdit, onDelete }) {
  return <><SummaryCards summary={summary} /><div className="content-grid"><CategoryStats expenses={expenses} /><ExpenseList expenses={expenses} onEdit={onEdit} onDelete={onDelete} /></div></>
}
