// Day 23 - JavaScript: safe small-value storage
class MemoryStorage {
  constructor() {
    this.data = new Map()
  }

  getItem(key) {
    return this.data.get(key) ?? null
  }

  setItem(key, value) {
    this.data.set(key, value)
  }

  removeItem(key) {
    this.data.delete(key)
  }
}

const safeStorage = typeof localStorage !== 'undefined'
  ? localStorage
  : new MemoryStorage()

function saveJson(storage, key, value) {
  storage.setItem(key, JSON.stringify(value))
}

function loadJson(storage, key, fallback) {
  const raw = storage.getItem(key)
  if (raw === null) return fallback

  try {
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

const fallback = { theme: 'light', language: 'en' }
saveJson(safeStorage, 'preferences', { theme: 'dark', language: 'en' })
console.log('Loaded preferences:', loadJson(safeStorage, 'preferences', fallback))

safeStorage.setItem('preferences', '{bad JSON}')
console.log('Fallback after invalid data:', loadJson(safeStorage, 'preferences', fallback))
