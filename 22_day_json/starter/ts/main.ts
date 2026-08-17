export {}

// Day 22: JSON & APIs
interface UserData {
  id: number
  name: string
  email: string
}

// Safe JSON parse
function safeJsonParse<T>(text: string, fallback: T): T {
  try {
    return JSON.parse(text) as T
  } catch {
    return fallback
  }
}

const jsonData = '{"id":1,"name":"Alice","email":"alice@test.com"}'
const user: UserData = safeJsonParse<UserData>(jsonData, { id: 0, name: 'Unknown', email: '' })
console.log(user)

// Filter sensitive fields
function safeStringify(obj: Record<string, unknown>, allowedKeys: string[]): string {
  const filtered: Record<string, unknown> = {}
  for (const key of allowedKeys) {
    if (key in obj) filtered[key] = obj[key]
  }
  return JSON.stringify(filtered, null, 2)
}

const rawData = { name: 'Alice', email: 'alice@test.com', password: 'secret123', age: 25 }
const safeJson = safeStringify(rawData, ['name', 'email', 'age'])
console.log(safeJson)
