# Day 16 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. → `'1970-01-01T00:00:00.000Z'` — the epoch instant.
2. → `0` — months are zero-based; January is `0`.
3. → the number of milliseconds between that instant and the epoch.
4. → `NaN` — the constructor produced an Invalid Date.
5. `'2025-01-15'` is interpreted as **UTC** midnight; `'2025-01-15T00:00:00'` with no offset is interpreted as **local** time. That difference can shift the displayed day across a zone boundary.
6. `36` hours: `(end - start) / (1000 * 60 * 60)`.
7. A `Date` instance (or `null` for invalid input).
8. `day16:js` and `day16` run; `npm run check` passes.

## Level 2

```js
// 1. isValidInstant
function isValidInstant(text) {
  return !Number.isNaN(new Date(text).getTime())
}
console.log(isValidInstant('2025-01-15T09:30:00Z')) // true
console.log(isValidInstant('not a date'))           // false

// 2. formatInAccra
function formatInAccra(date) {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Africa/Accra'
  }).format(date)
}
console.log(formatInAccra(new Date('2025-01-15T09:30:00Z')))

// 3. hoursBetween — decision stated: signed (negative when end precedes start)
function hoursBetween(start, end) {
  const startDate = new Date(start)
  const endDate = new Date(end)

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return null
  }

  return (endDate.getTime() - startDate.getTime()) / 3_600_000
}
console.log(hoursBetween('2025-01-01T00:00:00Z', '2025-01-02T12:00:00Z')) // 36

// 4. daysBetween — approximation for UTC instants only
function daysBetween(start, end) {
  const startDate = new Date(start)
  const endDate = new Date(end)

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return null
  }

  // Safe only when both instants are UTC and zone boundaries do not matter.
  return Math.round((endDate.getTime() - startDate.getTime()) / 86_400_000)
}
console.log(daysBetween('2025-01-01T00:00:00Z', '2025-01-03T00:00:00Z')) // 2
```

```ts
// 5. parseInstant in TypeScript
function parseInstant(text: string): Date | null {
  const date = new Date(text)
  return Number.isNaN(date.getTime()) ? null : date
}

const launch = parseInstant('2025-01-15T09:30:00Z')
if (launch !== null) {
  console.log(launch.toISOString()) // 2025-01-15T09:30:00.000Z
}
```

## Level 3

```js
// 1. The event poster
function eventLabel(instant) {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Africa/Accra'
  }).format(new Date(instant))
}
console.log(eventLabel('2025-01-15T09:30:00Z'))
// Fixed zone chosen so the label is stable and testable, like the starter.

// 2. The countdown
function hoursUntil(instant) {
  const target = new Date(instant)
  if (Number.isNaN(target.getTime())) {
    return null
  }

  const remaining = target.getTime() - Date.now()
  return remaining > 0 ? Math.floor(remaining / 3_600_000) : 0
}
console.log(hoursUntil('2030-01-01T00:00:00Z')) // a large positive number

// 3. The booking date (UTC day, not local day)
function isWeekend(isoDate) {
  const date = new Date(`${isoDate}T00:00:00Z`)
  const day = date.getUTCDay() // UTC: the string was UTC midnight, so this is stable
  return day === 0 || day === 6
}
console.log(isWeekend('2025-01-18')) // true (Saturday)
console.log(isWeekend('2025-01-15')) // false (Wednesday)
// The local getDay() would depend on the machine's time zone, so getUTCDay keeps
// the answer independent of where the code runs.

// 4. The safe formatter
function formatInstant(text) {
  const date = new Date(text)
  if (Number.isNaN(date.getTime())) {
    return 'Invalid date'
  }

  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Africa/Accra'
  }).format(date)
}
console.log(formatInstant('2025-01-15T09:30:00Z'))
console.log(formatInstant('not a date')) // Invalid date
```

This solution handles invalid timestamps, not every business rule. A booking application must also decide which date format it accepts, which time zone owns the appointment, and whether an end before a start is valid.