// Day 23 — JavaScript Starter: Web Storage
// Run in browser

function storageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error('Storage error:', e)
  }
}

function storageGet(key, fallback) {
  try {
    var raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

// Usage (browser):
// storageSet('preferences', { theme: 'dark', language: 'en' })
// var prefs = storageGet('preferences', { theme: 'light', language: 'en' })
// console.log(prefs)

console.log('Day 23: Web Storage — open in browser to test')
