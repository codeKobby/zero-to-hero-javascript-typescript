<div align="center">
  <h1>Day 37: TypeScript Generics</h1>
</div>

[<< Day 36](../36_day_ts_types/36_day_ts_types.md) | [Day 38 >>](38_day_ts_utility_types/38_day_ts_utility_types.md)

---

## 🎯 Learning Objectives

- Write generic functions, classes, and interfaces
- Use constraints with `extends`
- Apply multiple type parameters
- Build type-safe reusable utilities

---

## Generics: Write Once, Use with Any Type

```ts
// Without generics — limited to specific types:
function identityNumber(val: number): number { return val }
function identityString(val: string): string { return val }

// With generics — works with ANY type:
function identity<T>(val: T): T {
  return val
}

// TypeScript infers the type:
identity(42)        // T = number
identity('hello')   // T = string
identity(true)      // T = boolean

// Explicit type argument:
identity<number>(42)
```

## Generic Constraints

```ts
// Constrain generics to specific shapes:
interface HasLength {
  length: number
}

function logLength<T extends HasLength>(value: T): void {
  console.log(`Length: ${value.length}`)
}

logLength('hello')       // ✅ string has .length
logLength([1, 2, 3])     // ✅ array has .length
logLength({ length: 5 }) // ✅ object with .length
// logLength(42)         // ❌ number doesn't have .length

// keyof constraint:
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const user = { name: 'Alice', age: 25 }
getProperty(user, 'name')  // ✅ string
getProperty(user, 'age')   // ✅ number
// getProperty(user, 'email')  // ❌ 'email' not in keyof User
```

## Generic Interfaces and Classes

```ts
interface Repository<T> {
  getAll(): T[]
  getById(id: string): T | undefined
  create(item: T): T
  update(id: string, item: Partial<T>): T
  delete(id: string): boolean
}

interface User {
  id: string
  name: string
  email: string
}

class UserRepo implements Repository<User> {
  private users: User[] = []

  getAll(): User[] { return this.users }
  getById(id: string): User | undefined {
    return this.users.find(u => u.id === id)
  }
  create(item: User): User {
    this.users.push(item)
    return item
  }
  update(id: string, item: Partial<User>): User {
    const user = this.users.find(u => u.id === id)!
    Object.assign(user, item)
    return user
  }
  delete(id: string): boolean {
    const idx = this.users.findIndex(u => u.id === id)
    if (idx >= 0) { this.users.splice(idx, 1); return true }
    return false
  }
}
```

## Multiple Type Parameters

```ts
// Pair with two types:
function pair<A, B>(first: A, second: B): [A, B] {
  return [first, second]
}
pair('hello', 42)  // [string, number]

// Map from key to value:
function createMap<T, U>(items: T[], fn: (item: T) => U): Map<T, U> {
  const map = new Map<T, U>()
  items.forEach(item => map.set(item, fn(item)))
  return map
}
```

---

## Exercises

### Level 1

1. Write a generic `first<T>(arr: T[]): T | undefined` function.
2. Create a generic `swap<A, B>(pair: [A, B]): [B, A]` function.
3. Use `extends` to constrain a generic to `{ length: number }`.

### Level 2

1. Create a generic `Result<T, E>` type (success/failure).
2. Build a generic `Stack<T>` class with `push`, `pop`, `peek`.
3. Write a generic `debounce<T extends (...args: any[]) => any>(fn: T, ms: number)`.

### Level 3

1. Create a type-safe `EventEmitter<Events extends Record<string, any>>` class.
2. Build a generic `Builder<T>` with fluent API and compile-time field tracking.
3. Implement a `typedPick<T, K extends keyof T>` function that returns a subset.

---

[<< Day 36](../36_day_ts_types/36_day_ts_types.md) | [Day 38 >>](38_day_ts_utility_types/38_day_ts_utility_types.md)

🎉 **Day 37 Complete!**

🎉 **Progress**: 37/45 days complete
