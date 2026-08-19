# Day 21 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. None — a value that is not exported stays private to its file, and any import attempt is a module error.
2. `.` means "the current folder". `formatters.js` alone would be treated as a package/bare specifier and fail to resolve.
3. A type export disappears at compile time; a function export remains JavaScript at runtime.
4. Before the module body runs — modules are loaded, linked, and evaluated first, so imported bindings are ready.
5. No — an imported binding is read-only (though a mutable object's properties can still change).
6. It marks the script as a module: deferred by default, following the import graph.
7. `day21:js` and `day21` run; `npm run check` passes.

## Level 2

```ts
// math.ts
export function add(left: number, right: number): number {
  return left + right
}

export function subtract(left: number, right: number): number {
  return left - right
}

function describeOperation(): string {
  return 'This helper is private to math.ts'
}
```

```ts
// main.ts
import { add, subtract } from './math.js'

console.log(add(4, 2))      // 6
console.log(subtract(4, 2)) // 2

// import { describeOperation } from './math.js' // module error
```

```ts
// products.ts
export type Product = {
  name: string
  priceInCents: number
}

export function formatProduct(product: Product): string {
  return product.name + ': ' + (product.priceInCents / 100).toFixed(2)
}
```

`describeOperation` is deliberately unavailable outside `math.ts`. That privacy is a module boundary, not a TypeScript-only convention.

## Level 3

```ts
// strings.ts
export type StringCase = 'lower' | 'upper'

export function capitalize(text: string): string {
  return text[0].toUpperCase() + text.slice(1)
}

export function slugify(text: string): string {
  return text.toLowerCase().trim().replace(/ /g, '-')
}

function joinWords(left: string, right: string): string {
  return left + '-' + right
}

export function slugPair(left: string, right: string): string {
  return joinWords(slugify(left), slugify(right))
}
```

```ts
// counter.ts
export function createCounter(label: string) {
  let count = 0

  return {
    increment(): number {
      count += 1
      return count
    },
    read(): number {
      return count
    },
    label
  }
}
```

```ts
// config.ts
export const CONFIG = Object.freeze({
  theme: 'dark'
})

export function getConfig() {
  return { theme: 'dark' }
}

// CONFIG is frozen: reassigning the whole object is blocked, but sharing a
// frozen object still shares identity. getConfig() returns a fresh copy, which
// is the safer public surface when callers may mutate their copy.
```

```ts
// main.ts (importing the pieces)
import { capitalize, slugify, slugPair } from './strings.js'
import { createCounter } from './counter.js'
import { getConfig } from './config.js'

console.log(capitalize('mina')) // Mina
console.log(slugify('Hello World')) // hello-world
console.log(slugPair('Hello', 'World')) // hello-world

const study = createCounter('Study')
study.increment()
console.log(study.read()) // 1

console.log(getConfig()) // { theme: 'dark' }

// 4. The module memo
// Public surface: the small set of names other modules need (functions, types,
// and config accessors). Private: implementation helpers, internal state, and
// anything whose change should not ripple through importers. A module's public
// surface is its contract — the smaller it is, the easier the module is to test
// and change.
```

The pattern across all four: every module exposes a deliberate public surface, keeps implementation detail private, and lets the main file read cleanly.