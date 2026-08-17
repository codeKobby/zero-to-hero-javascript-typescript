// Day 36 — JavaScript Equivalent: Types & Interfaces (using plain objects)
// In plain JS, we use conventions instead of types

// Discriminated union pattern (works in JS too):
function handleResponse(response) {
  if (response.ok) {
    return 'User: ' + response.data.name
  }
  return 'Error: ' + response.error
}

console.log(handleResponse({ ok: true, data: { name: 'Alice' } }))
console.log(handleResponse({ ok: false, error: 'Not found' }))

// "Interface" pattern — just document the shape:
// User: { id: number, name: string, email?: string, role: 'admin' | 'user' }
var user = { id: 1, name: 'Alice', role: 'admin' }
console.log(user)
