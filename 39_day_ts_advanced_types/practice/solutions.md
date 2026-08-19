# Day 39 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. `infer` asks the compiler to name a piece of a type it can discover (such as a function's return type); the compiler resolves it while editing, so there is no JavaScript to run.
2. Mapped types iterate over `keyof T` at compile time; JavaScript uses `Object.keys`, `Object.values`, and `Object.entries` at runtime.
3. An advanced type earns its complexity when a real API becomes harder to misuse; if a named interface or union reads better, the simpler contract wins.
4. Type-level route safety derives the required parameter keys from the path string; it never reads a real URL or a server payload, so runtime validation remains mandatory.

## Level 2

```ts
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number }
  | { kind: 'rectangle'; width: number; height: number }

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle': return Math.PI * shape.radius * shape.radius
    case 'square': return shape.size * shape.size
    case 'rectangle': return shape.width * shape.height
  }
}

type EventName<Name extends string> = `on${Capitalize<Name>}`
type ClickEvent = EventName<'click'> // 'onClick'

type Params<Path extends string> =
  Path extends `${string}:${infer Name}/${infer Rest}`
    ? { [Key in Name | keyof Params<Rest>]: string }
    : Path extends `${string}:${infer Name}`
      ? { [Key in Name]: string }
      : {}

type UserRoutes = Params<'/users/:id/posts/:postId'> // { id: string; postId: string }
```

Runtime parser:

```js
function routeParams(pathname) {
  var params = {}
  var segments = pathname.split('/')
  segments.forEach(function (segment) {
    if (segment.startsWith(':')) params[segment.slice(1)] = null
  })
  return params
}
```

The type rejects a missing key while editing; the parser reads a real pathname when the code runs.

## Level 3

```ts
// 1. The conditional audit
type IsString<T> = T extends string ? true : false
// IsString<'hi'> = true; IsString<42> = false; IsString<string | number> = boolean

// 2. The infer extractor
type ReturnOf<T> = T extends (...args: never[]) => infer Result ? Result : never
// ReturnOf<() => number> = number
// ReturnOf<string> = never  — the string is not a function, so no Result exists

// 3. The mapped modifier
type Mutable<T> = { -readonly [Key in keyof T]: T[Key] }
// -readonly removes the readonly modifier from every key at compile time

// 4. The runtime parser
// The type guarantees the required keys are present in the object literal;
// the parser guarantees the real pathname is read. Neither replaces the other.
```

Advanced types compute new contracts from shapes — conditional on a relationship, inferred by discovery, mapped over keys, composed from string literals — so the compiler rejects misuse while editing, and the runtime still does the real work in JavaScript.