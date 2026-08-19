# Day 23 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. `getItem` returns the stored string, or `null` when the key is missing. It never returns a number or an object.
2. JavaScript running on the page can read `localStorage`, including malicious code introduced through an XSS vulnerability.
3. `getItem` returns the string `'5'`, because storage only stores strings.
4. `JSON.parse` proves the text is valid JSON, not that the parsed value matches the shape the application needs. Old, hand-edited, or corrupted entries must pass a shape guard.
5. An expiry timestamp only removes a value after a time passes. Anyone who can read storage can also read the value before it expires.
6. `clear()` removes every key belonging to the origin, including data owned by unrelated parts of the same application.
7. `day23:js` and `day23` run; `npm run check` passes.

## Level 2

```ts
type Preferences = {
  theme: 'light' | 'dark'
}

function isPreferences(value: unknown): value is Preferences {
  return typeof value === 'object' &&
    value !== null &&
    'theme' in value &&
    (value.theme === 'light' || value.theme === 'dark')
}

function loadPreferences(storage: Storage): Preferences {
  const raw = storage.getItem('preferences')
  if (raw === null) return { theme: 'light' }

  try {
    const value: unknown = JSON.parse(raw)
    return isPreferences(value) ? value : { theme: 'light' }
  } catch {
    return { theme: 'light' }
  }
}

function savePreferences(storage: Storage, preferences: Preferences): void {
  storage.setItem('preferences', JSON.stringify(preferences))
}

function setWithExpiry(storage: Storage, key: string, value: unknown, ttlMs: number): void {
  storage.setItem(
    key,
    JSON.stringify({ value, expiry: Date.now() + ttlMs })
  )
}

function getWithExpiry(storage: Storage, key: string): unknown | null {
  const raw = storage.getItem(key)
  if (raw === null) return null

  try {
    const item = JSON.parse(raw) as { value: unknown; expiry: number }

    if (Date.now() > item.expiry) {
      storage.removeItem(key)
      return null
    }

    return item.value
  } catch {
    return null
  }
}
```

The fallback keeps the application usable if storage is missing, malformed, blocked, or from an older version of the application.

## Level 3

```ts
// 1. The versioned draft
// The version belongs in the key so a future schema change reads nothing
// stale: a 'draft:v1' key can be ignored entirely when the app moves to v2.
function loadDraft(storage: Storage): Draft | null {
  const raw = storage.getItem('draft:v1')
  if (raw === null) return null

  try {
    const value: unknown = JSON.parse(raw)
    return isDraft(value) ? value : null
  } catch {
    return null
  }
}

// 2. The TTL cache
function setWithTtl<T>(storage: Storage, key: string, value: T, ttlMs: number): void {
  storage.setItem(key, JSON.stringify({ value, expiry: Date.now() + ttlMs }))
}

function getWithTtl<T>(storage: Storage, key: string, guard: (v: unknown) => v is T): T | null {
  const raw = storage.getItem(key)
  if (raw === null) return null

  try {
    const item = JSON.parse(raw) as { value: unknown; expiry: number }

    if (Date.now() > item.expiry) {
      storage.removeItem(key)
      return null
    }

    return guard(item.value) ? item.value : null
  } catch {
    return null
  }
}
// The guard runs at read time, so a stored value that no longer matches the
// current schema is treated exactly like a missing value: null.

// 3. The safe boundary
type LoadResult =
  | { ok: true; preferences: Preferences }
  | { ok: false }

function loadPreferences(storage: Storage): LoadResult {
  try {
    const raw = storage.getItem('preferences')
    if (raw === null) return { ok: false }

    const value: unknown = JSON.parse(raw)
    return isPreferences(value)
      ? { ok: true, preferences: value }
      : { ok: false }
  } catch {
    return { ok: false }
  }
}
// Syntax failures (catch) and shape failures (guard) are distinct paths, so a
// caller can decide whether to retry, show a message, or fall back to defaults.

// 4. The threat memo
// Never store in localStorage:
//   - access tokens or session IDs  -> keep in memory or a server-managed cookie
//   - passwords or payment data     -> never on the client at all
//   - private user data             -> keep server-side, fetch on demand
// Any XSS-introduced script can read everything an origin has stored.
```

The storage habit is now complete: version the key, stringify with intent, fall back on every failure, guard the parsed shape, and treat expiry as a cache rule.