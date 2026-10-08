import type { HistoryItem } from './types'

const STORAGE_KEY = 'weatherHistory'

export function getHistory(): HistoryItem[] {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved ? JSON.parse(saved) : []
}

export function addToHistory(item: HistoryItem): void {
  const history = getHistory()
  history.unshift(item) 
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY)
}
