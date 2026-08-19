# Day 37 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. A type parameter is a placeholder that the caller fills: `T` becomes the concrete input type at each call site.
2. `extends` names a shape requirement, not a parent class; any type with a `length` property satisfies `HasLength`.
3. `keyof T` restricts `K` to keys that actually exist on `T`, so `object[key]` can never be a misspelled or missing property.
4. A generic is less clear when every call site uses the same type; a plain annotation reads better and needs no placeholder.

## Level 2

```ts
function first<T>(items: T[]): T | undefined {
  return items[0]
}

function swap<A, B>(pair: [A, B]): [B, A] {
  return [pair[1], pair[0]]
}

interface HasLength { length: number }
function logLength<T extends HasLength>(value: T): void {
  console.log(`Length: ${value.length}`)
}

logLength('hello')
logLength([1, 2, 3])
logLength({ length: 5, tag: 'box' })

type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E }

function describe<T, E>(result: Result<T, E>): string {
  return result.ok ? 'Ok: ' + String(result.value) : 'Error: ' + String(result.error)
}
```

## Level 3

```ts
// 1. The identity promise
// identity(42)    -> T is number,   return type is number
// identity('go')  -> T is string,   return type is string
// One runtime function, a per-call type relationship.

// 2. The constraint audit
// logLength(42) reports:
// Argument of type 'number' is not assignable to parameter of type 'HasLength'.
// The compiler checked the call before it ever ran.

// 3. The repository trace
// create(item: Product) receives a full Product and stores it;
// getAll(): Product[] returns every stored Product in order.

// 4. The JS constraint imitation
// function logLength(value) {
//   if (!value || typeof value.length === 'undefined') {
//     throw new Error('Value must have a length property')
//   }
//   console.log('Length:', value.length)
// }
// The runtime check fires when the line executes; the compile-time check
// fired while the file was open. The former protects a running program,
// the latter protects the whole codebase.
```

Generics make one function preserve the relationship between input and output for every type, with `extends` and `keyof` constraining what the implementation may rely on — and with the emitted code still one ordinary JavaScript function.