<div align="center">
  <h1>Day 36: TypeScript Types & Interfaces Deep Dive</h1>
</div>

[<< Day 35](../35_day_api_integration/35_day_api_integration.md) | [Day 37 >>](37_day_ts_generics/37_day_ts_generics.md)

---

## 🎯 Learning Objectives

- Master type aliases vs interfaces
- Use union types, intersection types, and literal types
- Apply type narrowing with `in`, `typeof`, `instanceof`, and `as const`
- Design type-safe APIs with discriminated unions

---

## Type Aliases vs Interfaces

```ts
// Type alias — can represent anything:
type ID = string | number
type Point = { x: number; y: number }
type Callback = (data: unknown) => void
type Result<T> = { ok: true; data: T } | { ok: false; error: string }

// Interface — only represents object shapes:
interface User {
  id: number
  name: string
  email?: string
}

// Interface extends:
interface Employee extends User {
  department: string
  salary: number
}

// Interface merges (declaration merging):
interface Window {
  customProperty: string
}
// Adds to the global Window type — type aliases can't do this
```

### When to use which

| Type Alias | Interface |
|---|---|
| Unions, primitives, functions | Object shapes only |
| Mapped types, conditional types | Declaration merging |
| Can't be extended with `extends` | Can be extended with `extends` |
| Better for complex type math | Better for OOP patterns |

---

## Union & Intersection Types

```ts
// Union (OR) — value can be one of the types:
type Status = 'pending' | 'active' | 'done'
type InputValue = string | number

function format(val: InputValue): string {
  if (typeof val === 'string') return val.toUpperCase()
  return val.toFixed(2)
}

// Intersection (AND) — combines all types:
type Timestamped = { createdAt: Date; updatedAt: Date }
type Named = { name: string }

type Article = Timestamped & Named & {
  id: number
  body: string
}
// Article has: name, id, body, createdAt, updatedAt
```

---

## Discriminated Unions (Tagged Unions)

```ts
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rectangle'; width: number; height: number }
  | { kind: 'triangle'; base: number; height: number }

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2
    case 'rectangle':
      return shape.width * shape.height
    case 'triangle':
      return (shape.base * shape.height) / 2
  }
}

// TypeScript exhaustiveness check:
function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle': return Math.PI * shape.radius ** 2
    case 'rectangle': return shape.width * shape.height
    case 'triangle': return (shape.base * shape.height) / 2
    default:
      const _exhaustive: never = shape
      return _exhaustive
  }
  // If you add a new shape and forget to handle it,
  // TypeScript will error at compile time!
}
```

---

## Exercises

### Level 1

1. Create a `type StringOrNumber = string | number` and write a function that accepts it.
2. Define an `interface` for a `Book` with required and optional fields.
3. Use a discriminated union for a `LoadingState` type.

### Level 2

1. Create a type-safe API response type with discriminated unions for success/error.
2. Use intersection types to combine `Timestamped`, `Identifiable`, and `SoftDeletable`.
3. Write a function with exhaustive switch-case checking.

### Level 3

1. Create a `DeepReadonly<T>` recursive type.
2. Build a `Routes` type that maps paths to param types:
   ```ts
   type Routes = {
     '/users': { id?: never }
     '/users/:id': { id: string }
     '/posts/:id/comments': { id: string }
   }
   ```
3. Design a type-safe event system with typed event maps.

---

[<< Day 35](../35_day_api_integration/35_day_api_integration.md) | [Day 37 >>](37_day_ts_generics/37_day_ts_generics.md)

🎉 **Day 36 Complete!**

🎉 **Progress**: 36/45 days complete
