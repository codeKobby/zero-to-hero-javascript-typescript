export {}

// Day 34 — Fetch API — TypeScript Starter

interface ApiUser {
  id: number
  name: string
  email: string
}

async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options)
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return response.json() as Promise<T>
}

async function getUsers(): Promise<void> {
  const users = await apiFetch<ApiUser[]>('https://jsonplaceholder.typicode.com/users')
  users.forEach(u => console.log(`${u.name} <${u.email}>`))
}

async function createUser(data: Omit<ApiUser, 'id'>): Promise<ApiUser> {
  return apiFetch<ApiUser>('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
}

getUsers()
