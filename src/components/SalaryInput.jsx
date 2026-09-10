export default function SalaryInput({ salary, onSave }) {
  return <form className="salary-form" onSubmit={(event) => { event.preventDefault(); onSave(event.currentTarget.salary.value) }}><label htmlFor="salary">Monthly salary</label><div className="salary-control"><span>₹</span><input id="salary" name="salary" type="number" min="0" step="0.01" defaultValue={salary || ''} placeholder="0" /><button type="submit">Save salary</button></div></form>
}
