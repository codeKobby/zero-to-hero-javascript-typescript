export {}

// Day 39 — Advanced TypeScript Types — Starter

// Conditional type
type IsString<T> = T extends string ? true : false
type A = IsString<'hello'>  // true
type B = IsString<42>       // false

// Infer
type ReturnOf<T> = T extends (...args: any[]) => infer R ? R : never
type FnReturn = ReturnOf<() => number>  // number

// Mapped type with modifiers
type Mutable<T> = {
  -readonly [K in keyof T]: T[K]
}

// Template literal type
type EventName<T extends string> = `on${Capitalize<T>}`
type ClickEvent = EventName<'click'>  // 'onClick'

// Practical: type-safe route params
type ExtractParams<T extends string> =
  T extends `${string}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractParams<Rest>]: string }
    : T extends `${string}:${infer Param}`
    ? { [K in Param]: string }
    : {}

type UserRoutes = ExtractParams<'/users/:id/posts/:postId'>
// { id: string; postId: string }

const route: UserRoutes = { id: '1', postId: '42' }
console.log(route)

// Try this, read the error, then restore the comment:
// const route: UserRoutes = { id: '1' }
