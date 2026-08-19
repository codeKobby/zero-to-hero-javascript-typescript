# Day 16: Dates and Time — Moments and Durations

[Day 15 <<](../15_day_numbers/15_day_numbers.md) | [Day 17 >>](../17_day_regex/17_day_regex.md)

## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [Start with the kind of time you mean](#start-with-the-kind-of-time-you-mean)
  - [Creating a Date](#creating-a-date)
  - [Read local time or UTC time on purpose](#read-local-time-or-utc-time-on-purpose)
  - [Subtraction measures durations](#subtraction-measures-durations)
  - [Format for people with Intl](#format-for-people-with-intl)
  - [Validate before using a Date](#validate-before-using-a-date)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [Type the parser, handle the failure](#type-the-parser-handle-the-failure)
  - [What TypeScript cannot decide](#what-typescript-cannot-decide)
  - [One compiler error, walked through](#one-compiler-error-walked-through)
- [One-sentence mental model](#one-sentence-mental-model)
- [Practice](#practice)
  - [Level 1 — Mechanical (10-15 min)](#level-1--mechanical-10-15-min)
  - [Level 2 — Applied mini-projects](#level-2--applied-mini-projects)
  - [Level 3 — Creative synthesis](#level-3--creative-synthesis)
- [Finish line](#finish-line)
- [Prove it](#prove-it)

## Why this lesson exists

"June 15" and "a meeting at 14:00 UTC" are different kinds of information — one is a calendar date, the other an instant in history. Treating them as the same is how date bugs are born: a reminder firing on the wrong day, a duration off by one, a booking displayed in the wrong hour.

This lesson teaches the distinctions that make dates safe: an **instant** is one exact point in history, a **calendar date** is a day on a calendar, and a **local appointment** is a wall-clock time in a particular zone. You will learn to create, compare, measure, and format each kind on purpose — and to validate before any of it happens.

## Prerequisites

- Day 15: `Number.isNaN`, `Number.isFinite`, parsing and validation.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- create a `Date` from a timestamp, a complete ISO instant, or numeric components;
- read a local or UTC view of the same instant with `getFullYear`/`getUTCFullYear` and `getTime`;
- measure a duration by subtracting timestamps and converting to hours;
- format a date for people with `Intl.DateTimeFormat` and an explicit time zone;
- validate a parsed date before formatting or calculating;
- run this course's Day 16 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- the difference between an instant, a calendar date, and a local appointment;
- why a date-only string can land on a different day for someone in another zone;
- why the numeric component form treats months as zero-based;
- why an explicit `timeZone` in a formatter matters;
- why dividing milliseconds by one day is not a universal calendar-day calculation;
- why TypeScript cannot validate a date string by itself.

## The problem this solves

A server sends an event as an ISO instant. The app must store it unchanged, display it for a person in a chosen zone, and measure how long the event lasted:

```js
const event = new Date('2025-01-15T09:30:00Z')

const formatter = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'full',
  timeStyle: 'short',
  timeZone: 'Africa/Accra'
})

console.log(formatter.format(event))
```

The fixed instant travels between systems unchanged; the formatter is the only place a human-facing string is produced. This split — **store instants, format for people at the boundary** — is the same discipline as Day 15's "format only at the display boundary," now applied to time.

## JS runtime deep dive

### Start with the kind of time you mean

- An **instant** is one exact point in history, such as a server response timestamp.
- A **calendar date** is a day on a calendar, such as a birthday or due date.
- A **local appointment** is a wall-clock time in a particular time zone.

The traditional `Date` object represents an instant as milliseconds since `1970-01-01T00:00:00.000Z`. Its local getter methods interpret that instant using the device time zone. That makes `Date` useful and ubiquitous, but it means you must be deliberate about parsing and display.

### Creating a Date

```js
const now = new Date()
const fromTimestamp = new Date(1735689600000)
const localAppointment = new Date(2025, 0, 15, 9, 30)
```

The numeric component form above is a **local** date and time. Months are zero-based: January is `0`, December is `11`. Never use a two-digit year.

For an instant stored or sent between systems, use a complete ISO date-time with an offset:

```js
const launch = new Date('2025-01-15T09:30:00Z')
console.log(launch.toISOString()) // always UTC, ending in Z
```

Avoid non-standard strings such as `01/15/2025` — different environments interpret them differently.

**Important historical pitfall:** a date-only string such as `'2025-01-15'` is interpreted as UTC by `Date`, while a date-time with no offset is interpreted as local time. A birthday in the middle of the night UTC can display as the previous day somewhere else. Do not use a `Date` for a birthday or a due date until you have chosen how the application preserves the calendar date.

### Read local time or UTC time on purpose

One `Date` stores one timestamp. You choose a local or UTC view:

```js
const instant = new Date('2025-01-15T00:30:00Z')

instant.getFullYear()    // local year
instant.getUTCFullYear() // UTC year
instant.getTime()        // timestamp in milliseconds
```

### Subtraction measures durations

For two instants, subtraction works because dates convert to their timestamps:

```js
const start = new Date('2025-01-01T00:00:00Z')
const end = new Date('2025-01-02T12:00:00Z')
const milliseconds = end.getTime() - start.getTime()
const hours = milliseconds / (1000 * 60 * 60)

console.log(hours) // 36
```

A duration is a **number of milliseconds**, not a date. Do not calculate "calendar days" by dividing milliseconds when a time-zone boundary or daylight-saving transition matters — a local calendar day is not always 24 hours.

### Format for people with Intl

Store or transport an unambiguous ISO instant; format it for people only at the interface:

```js
const event = new Date('2025-01-15T09:30:00Z')
const formatter = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'full',
  timeStyle: 'short',
  timeZone: 'Africa/Accra'
})

console.log(formatter.format(event))
```

Passing `locale` and `timeZone` makes your intent visible and makes tests predictable. Without them, output depends on the person's device settings.

### Validate before using a Date

The constructor can create an Invalid Date. Check its timestamp before formatting or performing calculations:

```js
function parseInstant(text) {
  const date = new Date(text)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return date
}
```

This validates that the runtime produced a usable timestamp. It does not prove that a user entered the business date they intended. For calendar-date input, validate the expected string shape and business rules separately.

### Common mistakes table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Treating a calendar date as an instant | The app did not choose what the value means | Store a date-only value as a date, not a `Date` at UTC midnight |
| Using `01/15/2025` strings | Ambiguous, environment-dependent parsing | Use a complete ISO string with an offset |
| Off-by-one months | `new Date(2025, 0, 15)` is January | Remember months are zero-based |
| Formatting without a time zone | Output follows device settings | Pass `timeZone` to `Intl.DateTimeFormat` |
| Formatting an Invalid Date | The constructor succeeded with garbage | Check `Number.isNaN(date.getTime())` first |
| Dividing by 24 hours for calendar days | DST and zone boundaries break the assumption | Measure instants, or use a calendar-aware rule |
| Using `toISOString()` on an invalid date | It throws `RangeError` | Validate before formatting |

## The TypeScript layer

### Type the parser, handle the failure

Date behavior is JavaScript runtime behavior. TypeScript can accurately describe a parser that may fail:

```ts
function parseInstant(text: string): Date | null {
  const date = new Date(text)
  return Number.isNaN(date.getTime()) ? null : date
}

const launch = parseInstant('2025-01-15T09:30:00Z')
if (launch !== null) {
  console.log(launch.toISOString())
}
```

The null check protects the `toISOString` call. TypeScript does not validate a date string by itself — the runtime check does that work. TypeScript's job is to make you *handle* the possibility that parsing failed.

### What TypeScript cannot decide

TypeScript cannot know whether `'2025-01-15'` is meant as a calendar date or an instant — that is a product decision. It cannot know that `new Date(2025, 0, 15)` is January in the application's intent. And it cannot detect that `end - start` crosses a daylight-saving boundary. Every one of those is a runtime and domain concern that tests must prove.

### One compiler error, walked through

Open `16_day_dates/starter/ts/main.ts`. The last line is commented out and deliberately broken:

```ts
console.log(parseInstant('2025-01-15T09:30:00Z').toISOString())
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the reason:

```
'parseInstant(...)' is possibly 'null'.
```

Read it as: *"You called a method on a value that may be `null` — parsing can fail, so the return type says so."* The fix is to capture the result and narrow:

```ts
const launch = parseInstant('2025-01-15T09:30:00Z')
if (launch !== null) {
  console.log(launch.toISOString())
}
```

Comment the broken line back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

Dates are instants measured in milliseconds since 1970, stored as unambiguous ISO text, validated before use, and formatted for people with an explicit locale and time zone — while TypeScript forces you to handle the `Date | null` reality of parsing.

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact output before running.

1. `new Date(0).toISOString()` — what is the result?
2. `new Date(2025, 0, 15).getMonth()` — what is the result, and why?
3. `new Date('2025-01-15T09:30:00Z').getTime()` — what does it represent?
4. `new Date('not a date').getTime()` — what is the result?
5. `new Date('2025-01-15')` versus `new Date('2025-01-15T00:00:00')` — what is the difference in how each is interpreted?
6. `new Date('2025-01-02T12:00:00Z').getTime() - new Date('2025-01-01T00:00:00Z').getTime()` — how many hours is that, and how do you compute it?
7. `parseInstant('2025-01-15T09:30:00Z')` returns what type of value on success?
8. Run `npm.cmd run day16:js` and `npm.cmd run day16`; then `npm.cmd run check` and confirm it passes.

**LeetCode:** 1185 Day of the Week — https://leetcode.com/problems/day-of-the-week/ (hint: NeetCode roadmap)

### Level 2 — Applied mini-projects

1. Write `isValidInstant(text)` that returns `true` only when `new Date(text)` has a valid timestamp.
2. Write `formatInAccra(date)` using `Intl.DateTimeFormat` with a fixed `Africa/Accra` time zone.
3. Write `hoursBetween(start, end)` given two ISO instant strings; decide whether the result should be signed or absolute and state your choice.
4. Write `daysBetween(start, end)` that returns whole calendar days for two UTC instants, and add a comment noting when that approximation is safe.
5. TypeScript: write `parseInstant` returning `Date | null` and make the caller handle both paths.

### Level 3 — Creative synthesis

1. The event poster: given an ISO instant, produce a short human label such as `'Wed, 15 Jan 2025, 09:30'` using `Intl.DateTimeFormat`. Pick a fixed `timeZone` and state why you chose it.
2. The countdown: write `hoursUntil(instant)` that takes a future ISO instant and returns how many whole hours remain, or `0` for past input. Validate the input first.
3. The booking date: write `isWeekend(isoDate)` that returns `true` when a date-only string such as `'2025-01-18'` falls on a Saturday or Sunday in UTC. Add a comment explaining why you read the UTC day, not the local day.
4. The safe formatter: write `formatInstant(text)` that returns a formatted label for valid input and `'Invalid date'` for anything else. Combine validation with `Intl.DateTimeFormat`.
5. The decision memo: write a comment block explaining, for your future self, (a) whether an appointment should be stored as an instant or a calendar date, and (b) which time zone owns it.

## Finish line

Day 16 is complete when you can do all of these **without notes**:

1. Name the three kinds of time and say which `Date` actually represents.
2. Create a `Date` from a timestamp, an ISO instant, and numeric components.
3. Read local and UTC views of one instant with `getFullYear`/`getUTCFullYear`/`getTime`.
4. Measure a duration by subtracting timestamps and converting units.
5. Format a date with `Intl.DateTimeFormat` and an explicit `timeZone`.
6. Validate a parsed date with `Number.isNaN(date.getTime())` before using it.
7. Model a parser as `Date | null` in TypeScript and narrow before use.

If any answer is a guess, revisit the matching section before Day 17.

## Prove it

Write, in your own words, a short answer to each:

1. What is the difference between an instant and a calendar date?
2. Why can a date-only string cause a different local day for someone in another time zone?
3. Why is an explicit `timeZone` useful in a formatter?
4. Why is dividing milliseconds by one day not a universal calendar-day calculation?
5. Why does `new Date(2025, 0, 15)` show January?
6. What does the type checker know that your tests must still verify about dates?

Your answers are today's evidence. If you can write them, move to [Day 17: Regular Expressions — Patterns as Tools](../17_day_regex/17_day_regex.md).

**Day 16 complete.** Time is now three distinct ideas — instants measured in milliseconds, calendar dates, and local appointments — and each one is created, validated, measured, and formatted on purpose.