export {}

// Day 36 — TypeScript Types & Interfaces — Starter

type ID = string | number
type Status = 'pending' | 'active' | 'done'

interface User {
  id: number
  name: string
  email?: string
  role: 'admin' | 'user'
}

interface Employee extends User {
  department: string
  salary: number
}

// Discriminated union
type ApiResponse =
  | { ok: true; data: User }
  | { ok: false; error: string }

function handleResponse(response: ApiResponse): string {
  if (response.ok) {
    return `User: ${response.data.name}`
  }
  return `Error: ${response.error}`
}

console.log(handleResponse({ ok: true, data: { id: 1, name: 'Alice', role: 'admin' } }))
console.log(handleResponse({ ok: false, error: 'Not found' }))

// Try this, read the error, then restore the comment:
// const role: 'admin' | 'user' = 'guest'
