<div align="center">
  <h1>Day 39: Advanced TypeScript Types</h1>
</div>

[<< Day 38](../38_day_ts_utility_types/38_day_ts_utility_types.md) | [Day 40 >>](40_day_ts_best_practices/40_day_ts_best_practices.md)

---

## 🎯 Learning Objectives

- Write conditional types
- Use mapped types with modifiers
- Apply template literal types for string manipulation
- Combine all type features in real-world patterns

---

## Conditional Types

```ts
// Syntax: T extends U ? X : Y
type IsString<T> = T extends string ? true : false

type A = IsString<'hello'>  // true
type B = IsString<42>       // false

// Distribute over unions:
type NonNullable<T> = T extends null | undefined ? never : T

type Result = NonNullable<string | null | undefined>
// string (null and undefined removed)

// Infer keyword — extract types:
type ReturnOf<T> = T extends (...args: any[]) => infer R ? R : never

type FnReturn = ReturnOf<() => number>  // number

// Extract function params:
type ParamsOf<T> = T extends (...args: infer P) => any ? P : never
```

## Mapped Types with Modifiers

```ts
// Add readonly:
type ReadonlyAll<T> = { readonly [K in keyof T]: T[K] }

// Remove readonly:
type Mutable<T> = { -readonly [K in keyof T]: T[K] }

// Add optional:
type OptionalAll<T> = { [K in keyof T]?: T[K] }

// Remove optional:
type RequiredAll<T> = { [K in keyof T]-?: T[K] }

// Combine modifiers:
type PartialReadonly<T> = { readonly [K in keyof T]?: T[K] }
```

## Template Literal Types

```ts
// String manipulation at type level:
type EventName<T extends string> = `on${Capitalize<T>}`
type ClickEvent = EventName<'click'>  // 'onClick'
type FocusEvent = EventName<'focus'>  // 'onFocus'

// CSS property names:
type CSSProperty = `${string}-${string}-${string}`
// 'margin-top-left', etc.

// URL paths:
type ApiRoute = `/api/v${number}/${string}`
const route: ApiRoute = '/api/v1/users'  // ✅

// Nested template literals for type-safe routes:
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
type TypedRoute<M extends HttpMethod, P extends string> = `${M} ${P}`
type GetUsers = TypedRoute<'GET', '/users'>  // 'GET /users'
```

---

## Real-World Pattern: Type-Safe Builder

```ts
type BuilderConfig<T> = {
  [K in keyof T]?: T[K]
} & {
  build(): T
}

function createBuilder<T>() {
  let config = {} as Partial<T>

  return {
    set<K extends keyof T>(key: K, value: T[K]) {
      config[key] = value
      return this
    },
    build(): T {
      return config as T
    }
  }
}

// Usage:
interface ServerConfig {
  port: number
  host: string
  ssl: boolean
}

const config = createBuilder<ServerConfig>()
  .set('port', 3000)
  .set('host', 'localhost')
  .set('ssl', false)
  .build()

// config: { port: number; host: string; ssl: boolean }
```

---

## Exercises

### Level 1

1. Create a `IsBoolean<T>` conditional type.
2. Use `infer` to extract the element type of an array: `ElementOf<string[]>` → `string`.
3. Create a template literal type `UpperCase<S>` that uppercases string literal types.

### Level 2

1. Build a `PathKeys<T>` type that returns all dot-separated paths of a nested object.
2. Create a `ResponseOf<T>` type that wraps any type in `{ data: T; status: number }`.
3. Use mapped types to make all leaf properties of a nested object optional.

### Level 3

1. Create a type-safe router with parameter extraction:
   ```ts
   type ExtractParams<T extends string> = ...
   type P = ExtractParams<'/users/:id/posts/:postId'>
   // { id: string; postId: string }
   ```
2. Build a `Diff<T, U>` type that finds properties in T not in U.
3. Create a type-safe SQL-like `Query<T>` builder.

---

[<< Day 38](../38_day_ts_utility_types/38_day_ts_utility_types.md) | [Day 40 >>](40_day_ts_best_practices/40_day_ts_best_practices.md)

🎉 **Day 39 Complete!**

🎉 **Progress**: 39/45 days complete
