export {}

// Day 23: Web Storage
// localStorage only exists in browsers. This in-memory fallback lets this
// learning example run in Node.js too.
class MemoryStorage implements Storage {
  private data = new Map<string, string>()

  getItem(key: string): string | null {
    return this.data.get(key) ?? null
  }

  setItem(key: string, value: string): void {
    this.data.set(key, value)
  }

  removeItem(key: string): void {
    this.data.delete(key)
  }

  clear(): void {
    this.data.clear()
  }

  key(index: number): string | null {
    return Array.from(this.data.keys())[index] ?? null
  }

  get length(): number {
    return this.data.size
  }
}

const safeStorage: Storage = typeof localStorage !== 'undefined'
  ? localStorage
  : new MemoryStorage()

class TypedStorage<T> {
  constructor(
    private key: string,
    private storage: Storage = safeStorage
  ) {}

  save(data: T): void {
    try {
      this.storage.setItem(this.key, JSON.stringify(data))
    } catch (error: unknown) {
      console.error('Storage error:', error)
    }
  }

  load(fallback: T): T {
    try {
      const raw = this.storage.getItem(this.key)
      return raw ? (JSON.parse(raw) as T) : fallback
    } catch {
      return fallback
    }
  }

  remove(): void {
    this.storage.removeItem(this.key)
  }
}

interface Preferences {
  theme: string
  language: string
}

const preferences = new TypedStorage<Preferences>('app-preferences')
preferences.save({ theme: 'dark', language: 'en' })
const loadedPreferences = preferences.load({ theme: 'light', language: 'en' })
console.log('Loaded preferences:', loadedPreferences)

function setWithExpiry(key: string, value: unknown, ttlMs: number): void {
  const item = {
    value,
    expiry: Date.now() + ttlMs
  }

  safeStorage.setItem(key, JSON.stringify(item))
}

function getWithExpiry<T>(key: string): T | null {
  const raw = safeStorage.getItem(key)
  if (!raw) return null

  try {
    const item = JSON.parse(raw) as { value: T; expiry: number }

    if (Date.now() > item.expiry) {
      safeStorage.removeItem(key)
      return null
    }

    return item.value
  } catch {
    return null
  }
}

setWithExpiry('temp', { data: 'expires soon' }, 1000)
const temporaryValue = getWithExpiry<{ data: string }>('temp')
console.log('TTL storage:', temporaryValue)

// Try this, read the error, then restore the comment:
// const restored = getWithExpiry<{ data: string }>('temp')
// console.log(restored.data)
