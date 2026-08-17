<div align="center">
  <h1>Day 38: TypeScript Utility Types</h1>
</div>

[<< Day 37](../37_day_ts_generics/37_day_ts_generics.md) | [Day 39 >>](39_day_ts_advanced_types/39_day_ts_advanced_types.md)

---

## 🎯 Learning Objectives

- Use built-in utility types: `Partial`, `Required`, `Pick`, `Omit`, `Record`, `Readonly`
- Apply `keyof`, `typeof`, and template literal utility types
- Create custom utility types
- Transform types for real-world patterns

---

## Built-in Utility Types

```ts
interface User {
  id: number
  name: string
  email: string
  age: number
  role: 'admin' | 'user'
}

// Partial<T> — all properties optional:
type UpdateUser = Partial<User>
// { id?: number; name?: string; email?: string; age?: number; role?: 'admin' | 'user' }

function updateUser(id: number, updates: UpdateUser) {
  // updates can have any subset of User fields
}

updateUser(1, { name: 'New Name' })  // ✅
updateUser(1, { name: 'New', role: 'admin', email: 'x', age: 25, id: 99 })  // ✅ all optional

// Required<T> — all properties required:
type StrictUser = Required<User>

// Pick<T, K> — select specific properties:
type UserBasic = Pick<User, 'id' | 'name'>
// { id: number; name: string }

// Omit<T, K> — remove specific properties:
type UserWithoutId = Omit<User, 'id'>
// { name: string; email: string; age: number; role: 'admin' | 'user' }

// Record<K, V> — typed object with known keys:
type RolePermissions = Record<'admin' | 'user', string[]>
// { admin: string[]; user: string[] }

// Readonly<T> — all properties readonly:
type FrozenUser = Readonly<User>
// user.name = 'New'  // ❌ Error

// Extract<T, U> — extract types from union:
type AdminRole = Extract<'admin' | 'user' | 'guest', 'admin' | 'superadmin'>
// 'admin'

// Exclude<T, U> — exclude types from union:
type NonAdmin = Exclude<'admin' | 'user' | 'guest', 'admin'>
// 'user' | 'guest'

// ReturnType<T> — get function return type:
function getUser() { return { id: 1, name: 'Alice' } }
type UserReturn = ReturnType<typeof getUser>
// { id: number; name: string }

// Parameters<T> — get function parameter types:
type GetUserParams = Parameters<typeof getUser>
// [] (no params)
```

---

## Custom Utility Types

```ts
// Make selected properties required:
type RequireKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

// Example: email is required for User, other fields optional:
type UserCreate = RequireKeys<Partial<User>, 'name' | 'email'>

// Make all properties nullable:
type Nullable<T> = { [K in keyof T]: T[K] | null }

// Deep partial:
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}
```

---

## Exercises

### Level 1

1. Create a `Partial<User>` type and use it in an update function.
2. Use `Pick` to extract `{ name, email }` from a User type.
3. Use `Record` to create a typed dictionary: `Record<string, number>`.

### Level 2

1. Create a `RequireKeys<T, K>` utility that makes specific keys required.
2. Use `ReturnType` to type a variable from a function's return type.
3. Create a `Nullable<T>` utility that makes all properties nullable.

### Level 3

1. Create a `DeepReadonly<T>` type that recursively makes all properties readonly.
2. Build a `PathValue<T, P>` type that extracts the type at a nested path.
3. Create a `Mutable<T>` type that removes `readonly` from all properties.

---

[<< Day 37](../37_day_ts_generics/37_day_ts_generics.md) | [Day 39 >>](39_day_ts_advanced_types/39_day_ts_advanced_types.md)

🎉 **Day 38 Complete!**

🎉 **Progress**: 38/45 days complete
