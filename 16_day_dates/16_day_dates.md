<div align="center">
  <h1>Day 16: Dates & Time</h1>
</div>

[<< Day 15](../15_day_numbers/15_day_numbers.md) | [Day 17 >>](../17_day_regex/17_day_regex.md)

---

## What You'll Learn

- Create dates from strings, timestamps, and components
- Get date parts: year, month, day, hours
- Format dates with `Intl.DateTimeFormat`
- Calculate time differences
- Use TypeScript with dates

---

## Creating Dates

```js
// Current moment:
const now = new Date()
console.log(now)

// From a string (ISO format — most reliable):
const birthday = new Date('1995-06-15')

// From components (month is 0-indexed! January = 0):
const specific = new Date(1995, 5, 15)  // June 15, 1995

// From timestamp:
const timestamp = new Date(1700000000000)
```

> **Warning:** `new Date('08/16/2024')` works differently in different browsers. Always use ISO format: `'YYYY-MM-DD'`.

## Getting Date Parts

```js
const now = new Date()

now.getFullYear()   // 2024
now.getMonth()      // 0-11 (January = 0! This trips up everyone)
now.getDate()       // 1-31 (day of month)
now.getDay()        // 0-6 (Sunday = 0)
now.getHours()      // 0-23
now.getMinutes()    // 0-59
now.getSeconds()    // 0-59
```

## Formatting Dates

```js
const now = new Date()

// toLocaleDateString — locale-aware:
now.toLocaleDateString('en-US')
// '8/16/2024'

now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
// 'Friday, August 16, 2024'

now.toLocaleDateString('de-DE', { dateStyle: 'full' })
// 'Freitag, 16. August 2024'

// Intl.DateTimeFormat — reusable formatter:
const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})
console.log(formatter.format(now))

// ISO string (good for storage):
now.toISOString()   // '2024-08-16T10:30:00.000Z'

// Simple string:
now.toDateString()  // 'Fri Aug 16 2024'
```

## Calculating Differences

```js
const start = new Date('2024-01-01')
const end = new Date('2024-12-31')

// Difference in milliseconds:
const diffMs = end - start
const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
console.log(diffDays)  // 365

// Adding days:
function addDays(date, days) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

console.log(addDays(new Date(), 7).toDateString())  // One week from now
```

## TypeScript: Date Types

```ts
// Date is a built-in type:
const now: Date = new Date()

// Helper function:
function formatRelative(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSecs = Math.floor(diffMs / 1000)

  if (diffSecs < 60) return `${diffSecs} seconds ago`
  if (diffSecs < 3600) return `${Math.floor(diffSecs / 60)} minutes ago`
  return `${Math.floor(diffSecs / 3600)} hours ago`
}

// Accept Date or string:
type DateInput = Date | string | number
function toDate(input: DateInput): Date {
  return input instanceof Date ? input : new Date(input)
}

console.log(toDate('2024-01-15'))
console.log(toDate(1700000000000))
```

---

## Exercises

### Level 1

1. Create a `Date` for your birthday and log the day of the week.
2. Format today's date as "Saturday, August 16, 2024".
3. Calculate how many days old you are.
4. Get the ISO string of the current time.

### Level 2

1. Write `isWeekend(date)` that returns true if Saturday or Sunday.
2. Create `formatDate(date, locale)` in TypeScript that formats a date for a given locale.
3. Add 3 months to the current date.

### Level 3

1. Create a `Duration` class that calculates time between two dates and formats it as "X days, Y hours, Z minutes".
2. Write `isSameDay(a: Date, b: Date): boolean`.
3. Implement a countdown timer function.

<details>
<summary>🔍 View Solutions</summary>

**Level 2 — isWeekend:**
```js
function isWeekend(date) {
  const day = date.getDay()
  return day === 0 || day === 6
}
```

**Level 2 — formatDate:**
```ts
function formatDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'full'
  }).format(date)
}
```

**Level 3 — isSameDay:**
```ts
function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth() === b.getMonth() &&
         a.getDate() === b.getDate()
}
```
</details>

---

[<< Day 15](../15_day_numbers/15_day_numbers.md) | [Day 17 >>](../17_day_regex/17_day_regex.md)

🌕 **Day 16 Complete!** You now create, format, and calculate with dates in JavaScript and TypeScript.
