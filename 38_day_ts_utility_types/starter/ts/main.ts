export {}

// Day 38 — TypeScript Utility Types — Starter

interface User {
  id: number
  name: string
  email: string
  age: number
  role: 'admin' | 'user'
}

// Partial — all optional
type UpdateUser = Partial<User>

// Pick — select fields
type UserBasic = Pick<User, 'id' | 'name'>

// Omit — remove fields
type UserWithoutId = Omit<User, 'id'>

// Record — typed dictionary
type RolePermissions = Record<'admin' | 'user', string[]>

// Readonly
type FrozenUser = Readonly<User>

const basic: UserBasic = { id: 1, name: 'Alice' }
const permissions: RolePermissions = {
  admin: ['read', 'write', 'delete'],
  user: ['read']
}

console.log(basic)
console.log(permissions)
