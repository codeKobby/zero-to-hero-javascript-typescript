<div align="center">
  <h1>Day 5: Control Flow</h1>
</div>

[<< Day 4](../04_day_operators/04_day_operators.md) | [Day 6 >>](../06_day_loops/06_day_loops.md)

---

## What You'll Learn

- `if`/`else` and `switch` for decisions
- Ternary operator for concise choices
- Discriminated unions in TypeScript

---

## if / else

```js
const score = 85

if (score >= 90) {
  console.log('Grade: A')
} else if (score >= 80) {
  console.log('Grade: B')
} else if (score >= 70) {
  console.log('Grade: C')
} else {
  console.log('Grade: F')
}
```

## Ternary Operator

A shorter way to write `if`/`else` when you need a value:

```js
const result = score >= 60 ? 'Pass' : 'Fail'
```

## Switch

```js
const day = 'Monday'

switch (day) {
  case 'Saturday':
  case 'Sunday':
    console.log('Weekend')
    break
  default:
    console.log('Workday')
}
```

## TypeScript: Discriminated Unions

TypeScript lets you create types that **narrow** in switch statements:

```ts
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number }

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2
    case 'square':
      return shape.size ** 2
  }
}
```

---

## Exercises

### Level 1

1. Write an `if`/`else` that checks if a number is positive, negative, or zero.
2. Rewrite it using a ternary operator.
3. Write a `switch` statement for the days of the week.

### Level 2

1. Create a TypeScript discriminated union for a `TrafficLight` with `'red'`, `'yellow'`, `'green'`.
2. Write a function that returns the action for each light.

### Level 3

1. Add a `default` case to your TypeScript discriminated union using `never` for exhaustiveness checking.

<details>
<summary>🔍 View Solutions</summary>

```ts
// Level 2:
type TrafficLight = 'red' | 'yellow' | 'green'

function getAction(light: TrafficLight): string {
  switch (light) {
    case 'red': return 'Stop'
    case 'yellow': return 'Slow down'
    case 'green': return 'Go'
  }
}
```
</details>

---

[<< Day 4](../04_day_operators/04_day_operators.md) | [Day 6 >>](../06_day_loops/06_day_loops.md)

🌕 **Day 5 Complete!**
