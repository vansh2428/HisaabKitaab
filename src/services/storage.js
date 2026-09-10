const STORAGE_KEY = 'salary-expense-tracker-data'

export function isValidData(value) {
  return value && typeof value === 'object' && !Array.isArray(value) && Object.values(value).every((month) =>
    month && typeof month === 'object' && Number.isFinite(Number(month.salary)) && Array.isArray(month.expenses))
}

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return isValidData(parsed) ? parsed : {}
  } catch {
    return {}
  }
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    return true
  } catch {
    return false
  }
}

export function serializeData(data) {
  return JSON.stringify(data, null, 2)
}

export function parseBackupData(rawText) {
  try {
    const parsed = JSON.parse(rawText)
    return isValidData(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function mergeProjectData(currentData, incomingData) {
  if (!isValidData(incomingData)) return currentData

  return {
    ...currentData,
    ...incomingData,
  }
}

export function exportProjectData(data) {
  return serializeData(data)
}
