import { useEffect, useState } from 'react'
import Dashboard from './components/Dashboard'
import ExpenseForm from './components/ExpenseForm'
import MonthSelector from './components/MonthSelector'
import SalaryInput from './components/SalaryInput'
import { exportMonth } from './services/excelExport'
import { exportProjectData, loadData, mergeProjectData, parseBackupData, saveData } from './services/storage'
import { getSummary } from './utils/calculations'
import { currentMonth, formatMonth } from './utils/dateUtils'
import './styles/app.css'

function App() {
  const [data, setData] = useState(() => loadData())
  const [month, setMonth] = useState(currentMonth())
  const [editingExpense, setEditingExpense] = useState(null)
  const [notice, setNotice] = useState('')
  const monthData = data[month] || { salary: 0, expenses: [] }
  const summary = getSummary(monthData)

  useEffect(() => { saveData(data) }, [data])

  const updateMonth = (updates) => setData((previous) => ({ ...previous, [month]: { ...monthData, ...updates } }))

  const saveExpense = (expense) => {
    setData((previous) => {
      const currentMonth = previous[month] || { salary: 0, expenses: [] }
      const exists = currentMonth.expenses.some((item) => item.id === expense.id)

      const expenses = exists
        ? currentMonth.expenses.map((item) =>
            item.id === expense.id ? expense : item,
          )
        : [...currentMonth.expenses, expense]

      return {
        ...previous,
        [month]: {
          ...currentMonth,
          expenses,
        },
      }
    })

    setEditingExpense(null)
    setNotice(editingExpense ? 'Expense updated.' : 'Expense added.')
    setTimeout(() => setNotice(''), 2200)
  }

  const deleteExpense = (id) => { if (window.confirm('Delete this expense?')) updateMonth({ expenses: monthData.expenses.filter((expense) => expense.id !== id) }) }

  const handleExport = () => { try { exportMonth(month, monthData); setNotice('Excel file exported.'); setTimeout(() => setNotice(''), 2200) } catch { setNotice('Export failed. Please try again.') } }

  const copyTextToClipboard = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.setAttribute('readonly', '')
        textArea.style.position = 'fixed'
        textArea.style.opacity = '0'
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.setAttribute('readonly', '')
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      try { document.execCommand('copy') } catch { return false }
      document.body.removeChild(textArea)
    }

    return true
  }

  const handleCopyBackup = async () => {
    const backupText = exportProjectData(data)
    const copied = await copyTextToClipboard(backupText)
    setNotice(copied ? 'Project data copied to clipboard.' : 'Unable to copy backup data.')
    setTimeout(() => setNotice(''), 2200)
  }

  const handleImportBackup = async () => {
    let raw = ''

    try {
      if (navigator.clipboard && window.isSecureContext) {
        raw = await navigator.clipboard.readText()
      }
    } catch {
      raw = ''
    }

    if (!raw) {
      raw = window.prompt('Paste a project data backup JSON to import:') || ''
    }

    if (!raw.trim()) {
      setNotice('No project data was provided.')
      setTimeout(() => setNotice(''), 2200)
      return
    }

    const parsed = parseBackupData(raw)
    if (!parsed) {
      setNotice('The backup data format is invalid.')
      setTimeout(() => setNotice(''), 2200)
      return
    }

    const incoming = parsed
    const merged = mergeProjectData(data, incoming)
    setData(merged)
    saveData(merged)
    setNotice('Project data imported.')
    setTimeout(() => setNotice(''), 2200)
  }

  return <div className="app-shell"><header className="topbar"><div className="brand-mark">ST</div><div><p className="brand-name">Salary tracker</p><p className="brand-subtitle">A clear view of your everyday money-261711868</p></div><div className="top-actions"><button className="secondary-button" onClick={handleCopyBackup}>Copy Backup</button><button className="secondary-button" onClick={handleImportBackup}>Import Data</button><button className="secondary-button" onClick={handleExport}>Download Excel</button></div></header><main><section className="hero"><div><span className="eyebrow">Personal finance</span><h1>{formatMonth(month)}</h1><p>Stay close to your income, spending, and the balance in between.</p></div><MonthSelector month={month} onChange={(nextMonth) => { setMonth(nextMonth); setEditingExpense(null) }} /></section><SalaryInput salary={monthData.salary} onSave={(salary) => updateMonth({ salary: Number(salary) || 0 })} /><Dashboard summary={summary} expenses={monthData.expenses} onEdit={setEditingExpense} onDelete={deleteExpense} /><section className="entry-section"><ExpenseForm expense={editingExpense} onSave={saveExpense} onCancel={() => setEditingExpense(null)} /></section>{notice && <div className="toast" role="status">{notice}</div>}</main><footer>Stored securely in this browser &middot; {formatMonth(month)} data</footer></div>
}

export default App
