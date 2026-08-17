<div align="center">
  <h1>Day 15: Numbers & Math</h1>
</div>

[<< Day 14](../14_day_strings/14_day_strings.md) | [Day 16 >>](../16_day_dates/16_day_dates.md)

---

## What You'll Learn

- Parse, format, and validate numbers
- Math methods for common operations
- Fix floating-point precision issues

---

## Key Concepts

```js
parseInt('42')       // 42
parseFloat('3.14')   // 3.14
Number.isNaN(NaN)    // true
Number.isFinite(42)  // true

(1234567).toLocaleString('en-US')  // '1,234,567'

Math.round(4.5)    // 5
Math.floor(4.9)    // 4
Math.ceil(4.1)     // 5
Math.random()      // 0 to 0.999
```

## Floating-Point Fix

```js
0.1 + 0.2 === 0.3  // false!
// Fix:
Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON  // true
```

---

## Exercises

### Level 1

1. Generate a random integer between 1 and 100.
2. Format `1234567.89` as US currency.
3. Write a `clamp(value, min, max)` function.

### Level 2

1. In TypeScript, create a `DiceRoll` type: `1 | 2 | 3 | 4 | 5 | 6`.
2. Write a `lerp(start, end, t)` function for linear interpolation.

### Level 3

1. Write a `factorial(n): bigint` that handles large numbers.

<details>
<summary>🔍 View Solutions</summary>

```ts
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6

function rollDice(): DiceRoll {
  return (Math.floor(Math.random() * 6) + 1) as DiceRoll
}

function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}
```
</details>

---

[<< Day 14](../14_day_strings/14_day_strings.md) | [Day 16 >>](../16_day_dates/16_day_dates.md)

🌕 **Day 15 Complete!**
