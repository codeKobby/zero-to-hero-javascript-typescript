// Day 21 — JavaScript Starter: Modules
// In browser: use <script type="module">
// In Node.js: use .mjs extension or "type": "module" in package.json

// Named exports
function formatUser(user) {
  return '#' + user.id + ': ' + user.name + ' <' + user.email + '>'
}

// Default export
function createDefaultUser() {
  return { id: 0, name: 'Guest', email: 'guest@test.com' }
}

// Dynamic import (async):
// const module = await import('./utils.js')

console.log(formatUser({ id: 1, name: 'Alice', email: 'alice@test.com' }))
console.log(createDefaultUser())
