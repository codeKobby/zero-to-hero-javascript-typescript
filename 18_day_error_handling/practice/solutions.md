# Day 18 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. `{ ok: true, value: { theme: 'dark' } }` and `{ ok: false, value: null }`.
2. `finally` runs **whether or not** the `try` block threw — after `try` completes or after `catch` runs.
3. No — `catch` runs only when `try` throws.
4. A **string** — `JSON.parse` checks syntax only, so `'3000'` stays text until your code validates it.
5. `unknown` — JavaScript can throw any value.
6. It throws `Error: people must be a positive whole number`.
7. Because the caller can continue with a normal decision (show "nothing found"); an error would interrupt flow for an expected case.
8. `day18:js` and `day18` run; `npm run check` passes.

## Level 2

```js
// 1. tryParseNumber
function tryParseNumber(text) {
  const trimmed = text.trim()
  const value = Number(trimmed)

  if (trimmed === '' || !Number.isFinite(value)) {
    return { ok: false, value: null }
  }

  return { ok: true, value }
}
console.log(tryParseNumber('42'))  // { ok: true, value: 42 }
console.log(tryParseNumber(''))    // { ok: false, value: null }
console.log(tryParseNumber('abc')) // { ok: false, value: null }

// 2. divide
function divide(total, people) {
  if (!Number.isInteger(people) || people <= 0) {
    throw new Error('people must be a positive whole number')
  }

  return total / people
}

// 3. Safe caller
try {
  divide(12, 0)
} catch (error) {
  console.log('Please choose at least one person.')
  if (error instanceof Error) {
    console.log('Developer detail:', error.message)
  }
}

// 4. readConfig
function readConfig(text) {
  try {
    return { ok: true, config: JSON.parse(text) }
  } catch {
    return { ok: false, reason: 'The config file is not valid JSON.' }
  }
}
console.log(readConfig('{"theme":"dark"}')) // ok: true
console.log(readConfig('{bad}'))            // ok: false, safe reason
```

```ts
// 5. Narrow a caught unknown error — no assertion
try {
  JSON.parse('{bad}')
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message)
  } else {
    console.error('An unknown value was thrown')
  }
}
```

## Level 3

```js
// 1. The JSON shape guard
function asPort(text) {
  try {
    const parsed = JSON.parse(text)
    const port = parsed?.port

    if (typeof port !== 'number' || !Number.isFinite(port)) {
      return { ok: false }
    }

    return { ok: true, port }
  } catch {
    return { ok: false }
  }
}
console.log(asPort('{"port":3000}'))   // { ok: true, port: 3000 }
console.log(asPort('{"port":"3000"}')) // { ok: false } — string, not number
console.log(asPort('{bad}'))           // { ok: false }

// 2. The safe average
function average(numbers) {
  if (numbers.length === 0) {
    throw new Error('average requires at least one number')
  }
  return numbers.reduce((sum, n) => sum + n, 0) / numbers.length
}

try {
  average([])
} catch (error) {
  console.log('The list is empty; nothing to average.')
}

// 3. parseWithSummary — a discriminated union with a safe message
function parseWithSummary(text) {
  try {
    return { ok: true, value: JSON.parse(text) }
  } catch {
    return { ok: false, message: 'Input is not valid JSON.' }
  }
}

const result = parseWithSummary('{bad}')
if (result.ok) {
  console.log(result.value)
} else {
  console.log(result.message) // Input is not valid JSON.
}
// The discriminated union means TypeScript knows `message` exists only on the
// `ok: false` branch, and `value` only on the `ok: true` branch.
```

```ts
// 3 (typed). parseWithSummary
type ParseSummary =
  | { ok: true; value: unknown }
  | { ok: false; message: string }

function parseWithSummary(text: string): ParseSummary {
  try {
    return { ok: true, value: JSON.parse(text) }
  } catch {
    return { ok: false, message: 'Input is not valid JSON.' }
  }
}

const parsed = parseWithSummary('{bad}')
if (parsed.ok) {
  console.log(parsed.value)      // narrowed to unknown
} else {
  console.log(parsed.message)    // narrowed to string
}
```

The discriminated result is a stronger TypeScript version of the JavaScript pattern: when `ok` is `true`, `value` is a number; otherwise it is `null`. The runtime checks still do the actual validation.