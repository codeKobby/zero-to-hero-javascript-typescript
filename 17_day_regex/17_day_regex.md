# Day 17: Regular Expressions — Patterns as Tools

[Day 16 <<](../16_day_dates/16_day_dates.md) | [Day 18 >>](../18_day_error_handling/18_day_error_handling.md)

## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [Use a regex only when it is the clearest tool](#use-a-regex-only-when-it-is-the-clearest-tool)
  - [Read a pattern as a sentence](#read-a-pattern-as-a-sentence)
  - [The three operations you will use most](#the-three-operations-you-will-use-most)
  - [Character classes, quantifiers, and flags](#character-classes-quantifiers-and-flags)
  - [Capture only the data you need](#capture-only-the-data-you-need)
  - [Escape user text before making a dynamic regex](#escape-user-text-before-making-a-dynamic-regex)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [Model extraction failure as a union](#model-extraction-failure-as-a-union)
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

A regular expression describes a text pattern. It is the right tool for controlled formats — a course code, a slug, repeated whitespace, a list of tags — and the wrong tool when simpler methods would be clearer. It is not a badge that code is advanced.

This lesson teaches the three operations you will use most (`test`, `matchAll`, `replace`), how to read a pattern as a sentence, and how to capture only the data you need. The goal is patterns you can still read next month — not clever one-liners.

## Prerequisites

- Day 14: strings, `includes`, `replace`, `trim`.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- read a regex as a sentence, piece by piece;
- use `test` for a yes/no answer;
- use `matchAll` with the `g` flag to extract repeated matches;
- use `replace` with `\s+` to collapse whitespace;
- use character classes, quantifiers, and the `i` and `g` flags;
- capture groups with parentheses and handle the null result of `exec`;
- choose `includes` over a dynamic regex for literal text;
- run this course's Day 17 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- what changes when `^` and `$` anchor a validation pattern;
- the difference between `test` and `matchAll`;
- why an `exec` result must be checked for `null`;
- when string `includes` is preferable to a dynamic regex;
- why a regex is not a full email-address validator.

## The problem this solves

A course catalog needs one rule applied to every input: the code must be exactly two uppercase letters, a hyphen, and three digits — like `JS-101`. Written as a regex and read as a sentence:

```js
const courseCode = /^[A-Z]{2}-\d{3}$/

console.log(courseCode.test('JS-101'))      // true
console.log(courseCode.test('js-101'))      // false — lowercase
console.log(courseCode.test('JS-12'))       // false — two digits
console.log(courseCode.test('pre-JS-101'))  // false — not the whole string
```

The `^` and `$` anchors are the difference between *"the whole input must be this shape"* and *"this shape appears somewhere in the input."* Validation almost always wants the anchors; search does not.

## JS runtime deep dive

### Use a regex only when it is the clearest tool

Before reaching for regex, ask whether `trim`, `includes`, `startsWith`, `endsWith`, `split`, or a small function would be clearer. For example, a full email-address validator is more complicated than a beginner regex suggests — and the server must still validate and verify the address regardless.

### Read a pattern as a sentence

Consider the course-code rule again:

```js
const courseCode = /^[A-Z]{2}-\d{3}$/
```

| Piece | Meaning |
| --- | --- |
| `^` | start of the whole string |
| `[A-Z]` | one uppercase English letter |
| `{2}` | exactly two of the previous item |
| `-` | a literal hyphen |
| `\d` | one digit |
| `{3}` | exactly three digits |
| `$` | end of the whole string |

So `AB-123` matches; `ab-123`, `AB-12`, and `prefix-AB-123` do not.

### The three operations you will use most

Use `test` for a yes or no answer:

```js
const courseCode = /^[A-Z]{2}-\d{3}$/
console.log(courseCode.test('JS-101')) // true
```

Use `matchAll` to extract text:

```js
const note = 'Review #javascript and #typescript'
const matches = [...note.matchAll(/#([a-z]+)/gi)]
const tags = matches.map((match) => match[1].toLowerCase())
console.log(tags) // ['javascript', 'typescript']
```

Use `replace` to create cleaned text:

```js
const raw = '  one     two  '
const cleaned = raw.replace(/\s+/g, ' ').trim()
console.log(cleaned) // 'one two'
```

None of these mutate the original string — they return new values, exactly like Day 14's string methods.

### Character classes, quantifiers, and flags

```js
/\d/       // one digit
/\s/       // one whitespace character
/\w/       // ASCII-style word character: letter, digit, underscore
/[aeiou]/  // one listed character
/[^,]/     // one character that is not a comma

/a+/       // one or more a characters
/a*/       // zero or more a characters
/a?/       // zero or one a character
/\d{2,4}/  // two through four digits
```

Flags change how the pattern searches:

```js
/hello/i // ignore case
/hello/g // find all occurrences when using matchAll or replace
```

Avoid the `g` flag with repeated `test` calls on the same `RegExp` object until you understand its mutable `lastIndex` state. For basic validation, omit `g`.

### Capture only the data you need

Parentheses capture part of a match:

```js
const match = /^([a-z]+)-([a-z]+)$/i.exec('first-last')

if (match === null) {
  console.log('The format is invalid')
} else {
  const first = match[1]
  const last = match[2]
  console.log(first, last)
}
```

The whole matched text is at position zero. The first and second parenthesized groups are at positions one and two. **Always handle the null path**: `exec` and `match` may find nothing.

### Escape user text before making a dynamic regex

Do not pass unchecked text directly into `new RegExp`. Characters like `.` and `*` have regex meanings. When you merely need a literal search, string `includes` is simpler and safer:

```js
const search = 'C++'
const title = 'Learn C++'
console.log(title.includes(search)) // true
```

### Common mistakes table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Forgetting `^` and `$` on a validation pattern | The pattern then searches anywhere | Anchor whole-string rules |
| Ignoring the `g` flag with `matchAll` | `matchAll` requires it | Add `g` (and `i` when case-insensitive) |
| Forgetting `matchAll` returns an iterator | It does not return an array | Spread it: `[...text.matchAll(...)]` |
| Skipping the null check on `exec` | The result can be `null` | Check before reading `match[1]` |
| Reusing a `g` regex in repeated `test` calls | `lastIndex` is mutable | Omit `g` for validation |
| Building `new RegExp(userText)` | Regex characters change the meaning | Use `includes` for literal search |
| Writing a "full email regex" | Email is deceptively complex | Validate shape, then verify server-side |
| Expecting regex to mutate a string | Like all string tools it returns new values | Capture the return value |

## The TypeScript layer

### Model extraction failure as a union

RegExp executes the same way in JavaScript and TypeScript. TypeScript helps you model extraction failure:

```ts
function parseCourseCode(value: string): { subject: string; number: string } | null {
  const match = /^([A-Z]{2})-(\d{3})$/.exec(value)

  if (match === null) {
    return null
  }

  return { subject: match[1], number: match[2] }
}
```

The runtime regular expression determines whether parsing succeeds. The null return tells a TypeScript caller it must not use `subject` or `number` before checking success.

### What TypeScript cannot decide

TypeScript cannot tell you that `/^([A-Z]{2})-(\d{3})$/` matches what the business means by "course code" — that is a product rule your tests must pin down. It cannot verify that a regex actually rejects real-world input, and it cannot know whether a full email regex is complete enough. The pattern's correctness is entirely runtime behavior; the type system only forces callers to handle the `| null`.

### One compiler error, walked through

Open `17_day_regex/starter/ts/main.ts`. The last section is commented out and deliberately broken:

```ts
const brokenMatch = /^([A-Z]{2})-(\d{3})$/.exec('JS-101')
console.log(brokenMatch[1])
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the reason:

```
'brokenMatch' is possibly 'null'.
```

Read it as: *"You read `match[1]` on a value that may be `null` — a regex match is not guaranteed."* The fix is to check before reading, exactly as `parseCourseCode` does:

```ts
const brokenMatch = /^([A-Z]{2})-(\d{3})$/.exec('JS-101')
if (brokenMatch !== null) {
  console.log(brokenMatch[1])
}
```

Comment the broken section back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

A regex is a readable description of a text pattern with three main operations — test for yes/no, matchAll to extract, replace to clean — and TypeScript forces you to handle the `null` result when extraction may fail.

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. `/^[A-Z]{2}-\d{3}$/.test('JS-101')` — true or false?
2. `/^[A-Z]{2}-\d{3}$/.test('js-101')` — true or false, and which part fails?
3. `/^[A-Z]{2}-\d{3}$/.test('pre-JS-101')` — true or false, and why?
4. `/^([a-z]+)-([a-z]+)$/i.exec('First-Last')` — what are `match[1]` and `match[2]`?
5. `'Ada   Lovelace'.replace(/\s+/g, ' ')` — what is the result?
6. `[...'a #tag here #Tag'.matchAll(/#([a-z]+)/gi)]` — how many matches, and what does each `match[1]` hold?
7. `/hello/i.test('HELLO')` — true or false?
8. `/[aeiou]/.test('sky')` — true or false?
9. `'C++'.includes('+')` — what does this avoid needing?
10. Run `npm.cmd run day17:js` and `npm.cmd run day17`; then `npm.cmd run check` and confirm it passes.

### Level 2 — Applied mini-projects

1. Write `isCourseCode(value)` for exactly two uppercase letters, a hyphen, and three digits. Confirm it rejects lowercase, a short code, and a prefixed code.
2. Extract every hashtag from `'Build #JavaScript with #TypeScript'`. Return lowercase tag names **without** the `#` symbol.
3. Write `collapseSpaces(text)` that converts `'Ada   Lovelace'` to `'Ada Lovelace'`, then `trim`s the result.
4. Write `firstTag(text)` that returns the first hashtag without the `#`, or `null` when there is none.
5. TypeScript: write `parseCourseCode(value)` that returns `{ subject, number }` or `null`, matching the lesson.

### Level 3 — Creative synthesis

1. The slug reader: write `isSlug(value)` that returns `true` for lowercase letters, digits, and hyphens only — `'my-course-101'` yes, `'My Course!'` no.
2. The tag counter: write `countTags(text)` that returns the number of `#tag` occurrences using `matchAll`.
3. The redactor: write `redactCards(text)` that replaces every group of 16 digits (or 4-4-4-4) with `'****'`. State the pattern rule you chose.
4. The initials from a name: write `initials(fullName)` using a regex that captures the first letter of each word, handling `'Ada   Lovelace'` correctly. Compare it with the Day 14 `split` approach.
5. The decision memo: write a comment block explaining, for your future self, (a) when to reach for a regex and when to use `includes`/`startsWith`, and (b) why a regex alone is never a full email validator.

## Finish line

Day 17 is complete when you can do all of these **without notes**:

1. Read a regex piece by piece, including `^`, `$`, `\d`, `\s`, `[A-Z]`, `{2}`, `+`, and the `i`/`g` flags.
2. Use `test` for a yes/no answer.
3. Use `matchAll` with `g` and spread to extract repeated matches.
4. Use `replace` with `\s+` to collapse whitespace.
5. Capture groups and handle the `null` result of `exec`.
6. Choose `includes` over a dynamic regex for literal text.
7. Model extraction as `Type | null` in TypeScript and narrow before use.

If any answer is a guess, revisit the matching section before Day 18.

## Prove it

Write, in your own words, a short answer to each:

1. What changes when `^` and `$` are added to a validation pattern?
2. What is the difference between `test` and `matchAll`?
3. Why must an `exec` result be checked for `null`?
4. When is string `includes` preferable to a dynamic regex?
5. Why does `matchAll` need the `g` flag, and why should validation omit it?
6. What does the type checker know that your tests must still verify about patterns?

Your answers are today's evidence. If you can write them, move to [Day 18: Errors and Recovery — Failing on Purpose](../18_day_error_handling/18_day_error_handling.md).

**Day 17 complete.** Patterns are now readable tools — anchored for validation, global for extraction, captured for reuse — and failure is always handled instead of assumed away.