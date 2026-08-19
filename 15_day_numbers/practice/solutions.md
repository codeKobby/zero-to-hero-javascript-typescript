# Day 15 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. `42`, `3.5`, `0` (surprising — validate empty input first), `NaN`.
2. `12`, `3.5`.
3. `5`, `4`, `5`.
4. → `100` — the clamp raises 120 to the maximum.
5. `false` — `0.1 + 0.2` is `0.30000000000000004` in binary floating point.
6. A **string**: `'3.50'`.
7. `false` — use `Number.isNaN(value)` instead.
8. Whole numbers `1` through `6`, because `Math.random()` is in `[0, 1)`.
9. `true`, `false`.
10. `day15:js` and `day15` run; `npm run check` passes.

## Level 2

```js
// 1. readPercentage
function readPercentage(text) {
  const trimmed = text.trim()
  const value = Number(trimmed)

  if (trimmed === '' || !Number.isFinite(value) || value < 0 || value > 100) {
    return null
  }

  return value
}
console.log(readPercentage('75'))     // 75
console.log(readPercentage('150'))    // null
console.log(readPercentage(''))       // null
console.log(readPercentage('abc'))    // null

// 2. formatCents
function formatCents(cents, locale, currency) {
  return (cents / 100).toLocaleString(locale, {
    style: 'currency',
    currency
  })
}
console.log(formatCents(1234, 'en-US', 'USD')) // $12.34

// 3. clamp
function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum)
}
console.log(clamp(120, 0, 100)) // 100
console.log(clamp(-5, 0, 100))  // 0
console.log(clamp(50, 0, 100))  // 50

// 4. rollDie
function rollDie() {
  return Math.floor(Math.random() * 6) + 1
}
console.log(rollDie()) // 1-6

// 6. nearlyEqual
function nearlyEqual(a, b) {
  return Math.abs(a - b) < Number.EPSILON
}
console.log(nearlyEqual(0.1 + 0.2, 0.3)) // true
```

```ts
// 5. readPercentage in TypeScript — no any
function readPercentage(text: string): number | null {
  const trimmed = text.trim()
  const value = Number(trimmed)

  if (trimmed === '' || !Number.isFinite(value) || value < 0 || value > 100) {
    return null
  }

  return value
}

const percentage = readPercentage('75')
if (percentage !== null) {
  console.log(percentage) // 75 — narrowed to number
}
```

## Level 3

```js
// 1. The range reader
function randomInteger(minimum, maximum) {
  if (minimum > maximum) {
    // Contract decision: this input is a programming error, so fail loudly.
    throw new Error('minimum must not be greater than maximum')
  }

  const count = maximum - minimum + 1
  return Math.floor(Math.random() * count) + minimum
}
console.log(randomInteger(1, 6))   // 1-6
console.log(randomInteger(10, 20)) // 10-20
// Alternative contract: return null on an inverted range. Choose one and document it.

// 2. The validator
function readNonNegative(text) {
  const trimmed = text.trim()
  const value = Number(trimmed)

  if (trimmed === '' || !Number.isFinite(value) || value < 0) {
    return null
  }

  return value
}
console.log(readNonNegative('4.5')) // 4.5
console.log(readNonNegative('-1'))  // null
// Note: empty input is rejected before Number(trimmed) matters, like readQuantity.

// 3. The safe total, in cents
function totalInCents(priceText, quantityText) {
  const price = readNonNegative(priceText)
  const quantity = readNonNegative(quantityText)

  if (price === null || quantity === null) {
    return null
  }

  // Whole cents: 12.99 * 3 works exactly with integer math.
  return Math.round(price * 100) * quantity
}
console.log(totalInCents('12.99', '3')) // 3897 cents
console.log(totalInCents('x', '3'))     // null

// 4. The display helpers
function formatPrice(price) {
  return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}
function formatPercent(value) {
  return value.toLocaleString('en-US', { style: 'percent' })
}
console.log(formatPrice(12.34))      // $12.34
console.log(formatPercent(0.125))    // 12.5%
```

```ts
// 3 (typed). The safe total — money math stays in integer cents
function totalInCents(priceText: string, quantityText: string): number | null {
  const price = readPercentage(priceText)
  const quantity = readPercentage(quantityText)

  if (price === null || quantity === null) {
    return null
  }

  return Math.round(price * 100) * quantity
}

// 4 (typed). The display helpers
function formatPrice(price: number): string {
  return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}
function formatPercent(value: number): string {
  return value.toLocaleString('en-US', { style: 'percent' })
}
```

The error in `randomInteger` is a contract decision. In a user-facing form you might return `null` instead of throwing; choose one behavior and document it.