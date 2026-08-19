# Day 40 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. The browser only ever sees JavaScript because types are erased at compile time; runtime validation of external data is therefore required even in a strict TypeScript project.
2. `any` skips checking and lets an unverified value flow anywhere; `unknown` forces a narrowing guard before use, keeping the boundary visible and reviewable.
3. An explicit return type at a boundary earns its place when a public function or a data model is shared; obvious local variables are better left to inference.
4. A non-null assertion is a design smell because it claims a possibly-absent value is present without runtime evidence — the fix is a proper boundary or a guard.

## Level 2

A refactor of an earlier starter keeps JS and TS acceptance criteria identical:

```ts
type LoadingState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: string }
  | { status: 'error'; message: string }

function parseTodo(value: unknown): { title: string; done: boolean } {
  if (typeof value !== 'object' || value === null) throw new Error('Not an object')
  const record = value as Record<string, unknown>
  if (typeof record.title !== 'string' || typeof record.done !== 'boolean') {
    throw new Error('Malformed todo')
  }
  return { title: record.title, done: record.done }
}

function describe(state: LoadingState): string {
  switch (state.status) {
    case 'idle': return 'Waiting...'
    case 'loading': return 'Loading...'
    case 'success': return `Got: ${state.data}`
    case 'error': return `Error: ${state.message}`
  }
}
```

The domain type shapes the state, the `unknown` parser validates external data, and the pure functions keep behavior testable.

## Level 3

```ts
// 1. The strict audit
// Replace any with unknown + guards; replace non-null assertions with bounds checks.

// 2. The boundary case
function toMessage(value: unknown): string {
  if (typeof value === 'string') return value
  if (value instanceof Error) return value.message
  return 'Unknown value'
}

// 3. The effect split
// Domain logic stays in pure functions; DOM, storage, and network calls stay at the edges.

// 4. The test case
// A pure-function test proves behavior on real values;
// the compiler proves structure on declared types. Neither replaces the other.
```

A maintainable project keeps the compiler strict, treats external data as `unknown` until a guard proves it, and uses tests and runtime validation for what the compiler cannot see — because the browser only ever runs JavaScript.