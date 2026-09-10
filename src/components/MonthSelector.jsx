import { formatMonth, shiftMonth } from '../utils/dateUtils'

export default function MonthSelector({ month, onChange }) {
  return <div className="month-selector"><button className="icon-button" onClick={() => onChange(shiftMonth(month, -1))} aria-label="Previous month">&larr;</button><div><span>Selected month</span><strong>{formatMonth(month)}</strong></div><button className="icon-button" onClick={() => onChange(shiftMonth(month, 1))} aria-label="Next month">&rarr;</button><input type="month" value={month} onChange={(event) => onChange(event.target.value)} aria-label="Choose month" /></div>
}
