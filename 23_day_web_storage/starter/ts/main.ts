export {}

// Day 23: Web Storage
class TypedStorage<T> {
  constructor(
    private key: string,
    private storage: Storage = localStorage
  ) {}

  save(data: T): void {
    try {
      this.storage.setItem(this.key, JSON.stringify(data))
    } catch (e) {
      console.error('Storage error:', e)
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

// Usage
interface Preferences {
  theme: string
  language: string
}

const prefs = new TypedStorage<Preferences>('app-preferences')
prefs.save({ theme: 'dark', language: 'en' })
const loaded = prefs.load({ theme: 'light', language: 'en' })
console.log('Loaded preferences:', loaded)

// TTL storage
function setWithExpiry(key: string, value: unknown, ttlMs: number): void {
  const item = {
    value,
    expiry: Date.now() + ttlMs
  }
  localStorage.setItem(key, JSON.stringify(item))
}

function getWithExpiry<T>(key: string): T | null {
  const raw = localStorage.getItem(key)
  if (!raw) return null
  const item = JSON.parse(raw)
  if (Date.now() > item.expiry) {
    localStorage.removeItem(key)
    return null
  }
  return item.value as T
}
