# Day 36 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. `message` receives a `Response` union; `response.ok` is the discriminator that narrows which fields exist.
2. `JSON.parse` returns `unknown`; the compiler cannot know what bytes were parsed, so a runtime guard is the only thing that proves shape.
3. Use an interface when a shape is an object that other shapes extend; use a type alias for unions, tuples, primitives, and composition.
4. `as User` tells the compiler to trust you; the runtime has no memory of that claim, so it cannot validate anything.

## Level 2

```ts
interface Book {
  id: number
  title: string
  author: string
  publishedAt?: string
}

type LoadingState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string }

function describeState(state: LoadingState<string>): string {
  switch (state.status) {
    case 'idle': return 'Not started'
    case 'loading': return 'Loading'
    case 'success': return state.data
    case 'error': return state.message
  }
}
```

The JavaScript equivalent uses the same discriminator pattern but with no compiler: a typo like `state.dat` would only surface when that line runs. The compiler adds a check that happens before execution.

## Level 3

```ts
// 1. The shape guard
function isBook(value: unknown): value is Book {
  return typeof value === 'object' &&
    value !== null &&
    'id' in value && typeof value.id === 'number' &&
    'title' in value && typeof value.title === 'string' &&
    'author' in value && typeof value.author === 'string'
}
// A type alias describes the shape; only this guard proves a real value.

// 2. The extendable model
interface Employee extends User {
  department: string
  salary: number
}
// Interface inheritance adds fields to a base shape without repeating them.

// 3. The exhaustive state
// Adding { status: 'cancelled'; reason: string } to LoadingState makes
// every switch over state.status report a missing arm at compile time.

// 4. The assertion trap
// const maybe = JSON.parse(raw) as Book
// The claim compiles; the moment the parsed object lacks 'title', every
// later read of maybe.title silently returns undefined instead of failing.
```

TypeScript types and interfaces are a compile-time contract that describes shape, narrows unions through a discriminator, and vanishes at runtime — while runtime guards, not assertions, are the only thing that validates data crossing a boundary.