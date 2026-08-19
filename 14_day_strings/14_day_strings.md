# Day 14: Strings — Text as a Value

[Day 13 <<](../13_day_hof_ii/13_day_hof_ii.md) | [Day 15 >>](../15_day_numbers/15_day_numbers.md)

## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [A string is ordered, indexed, and immutable](#a-string-is-ordered-indexed-and-immutable)
  - [Build readable messages with template literals](#build-readable-messages-with-template-literals)
  - [The everyday text toolkit](#the-everyday-text-toolkit)
  - [Exact comparison needs a decision](#exact-comparison-needs-a-decision)
  - [Searching, slicing, and missing values](#searching-slicing-and-missing-values)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [Type the parameter, keep the checks](#type-the-parameter-keep-the-checks)
  - [Narrowing unknown before the methods](#narrowing-unknown-before-the-methods)
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

Almost everything a program touches as text arrives already as a string: a name from a form, a search query, a URL, a message, or a response from an API. Programs rarely leave text exactly as they received it — they trim it, change its case, search it, split it, and assemble new messages from it.

This lesson turns strings from "text I type" into a value with known methods. You will learn the everyday toolkit, the rule that string methods **never change the original**, and the one decision that comparisons demand of you: what counts as "the same" text.

## Prerequisites

- Day 1: variables, `const`, strings.
- Day 9: objects (reference rules reappear).
- Day 10: arrays, `length`, indexing.
- Day 12: `map`.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- read a string's length, a character by index, and the last character with `at`;
- build messages with template literals;
- trim, change case, check, slice, split, join, and replace text;
- pipe text operations: `split(',')` then `map(trim + toLowerCase)`;
- write a case-insensitive comparison that trims first;
- run this course's Day 14 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- why a string method never changes the original string;
- how `slice` counts its start and end positions;
- when *not* to normalize text to lowercase;
- why TypeScript must narrow `unknown` before calling string methods;
- the difference between checking the type and choosing the comparison rule.

## The problem this solves

A form receives this:

```js
const rawTags = ' JavaScript, TypeScript, testing '
```

Your app needs clean tags for a filter menu:

```js
const tags = rawTags
  .split(',')
  .map(tag => tag.trim().toLowerCase())

console.log(tags)    // ['javascript', 'typescript', 'testing']
console.log(rawTags) // ' JavaScript, TypeScript, testing '
```

Trace the pipeline: `split` turns one string into an array of three strings; `map` visits each item; `trim` removes the outer spaces; `toLowerCase` standardizes comparison text. The original stays untouched.

That last point is the core lesson of the day: strings are **immutable**. Every method returns a new string; none of them edit the old one. Code that forgets this silently drops its result:

```js
const greeting = 'HELLO'
greeting.toLowerCase()          // returns a new string, discarded
console.log(greeting)           // 'HELLO' — unchanged
```

If you need the cleaned text later, you must **store the returned value**. This is the same discipline as `[...array]` copying from Day 11: operations produce values; capturing them is your job.

## JS runtime deep dive

### A string is ordered, indexed, and immutable

Just like an array, a string has positions:

```js
const courseName = 'JavaScript'

console.log(courseName.length) // 10
console.log(courseName[0])     // J
console.log(courseName.at(-1)) // t
```

Unlike an array, a string cannot be changed in place:

```js
const original = ' hello '
const cleaned = original.trim().toUpperCase()

console.log(original) // ' hello '
console.log(cleaned)  // 'HELLO'
```

### Build readable messages with template literals

Concatenation with `+` works, but template literals keep text and inserted values in natural order:

```js
const learner = 'Mina'
const completed = 14

const message = learner + ' has completed ' + completed + ' lessons.'
const clearerMessage = `${learner} has completed ${completed} lessons.`
```

Both have the same value. Use a template literal when it genuinely improves readability; a short fixed string does not need one.

### The everyday text toolkit

Start with the question you are trying to answer:

| You need to... | Method | Example result |
| --- | --- | --- |
| remove accidental outer spaces | `trim` | `' Mina '` → `'Mina'` |
| change case for comparison | `toLowerCase` | `'YES'` → `'yes'` |
| check whether text contains text | `includes` | `'frontend'.includes('end')` → `true` |
| take a section | `slice` | `'JavaScript'.slice(0, 4)` → `'Java'` |
| split at a separator | `split` | `'red,green'.split(',')` → `['red', 'green']` |
| join array pieces | `join` | `['red', 'green'].join(', ')` → `'red, green'` |
| replace one known section | `replace` | `'draft.txt'.replace('.txt', '.md')` → `'draft.md'` |

Every method returns a **new** string (or, for `split` and `join`, a new array or string). The source string stays unchanged.

### Exact comparison needs a decision

Human input differs in capitalization and outer spaces. Decide the comparison rule **before** writing the condition:

```js
function isYes(answer) {
  return answer.trim().toLowerCase() === 'yes'
}

console.log(isYes(' YES ')) // true
```

Do **not** automatically lowercase values where case matters — passwords, tokens, and IDs. Normalization is a product rule, not a universal cleanup step.

### Searching, slicing, and missing values

String positions begin at zero. `slice(start, end)` includes the start position and **excludes** the end position:

```js
const filename = 'lesson-notes.md'

console.log(filename.slice(0, 6))   // lesson
console.log(filename.slice(-3))     // .md
console.log(filename.includes('.')) // true
```

`at` is useful when the final character matters. It returns `undefined` for a position that does not exist, so do not assume text is non-empty unless you checked it:

```js
const empty = ''
console.log(empty.at(0)) // undefined
```

### Common mistakes table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Calling a method and ignoring its return | Strings are immutable; methods return new values | Store or return the result |
| Comparing mixed-case input directly | `'Yes' !== 'yes'` | Trim and lowercase a copy first |
| Lowercasing data where case matters | Normalization is a product rule, not cleanup | Keep passwords, tokens, IDs as-is |
| Misreading `slice` bounds | The end index is exclusive | `slice(0, 4)` is 4 characters, not up to index 4 |
| Assuming `at(0)` is always a character | Empty strings have no characters | Check `length` or handle `undefined` |
| Using `+` for a message with several variables | The order of text and values gets hard to scan | Use a template literal |

## The TypeScript layer

### Type the parameter, keep the checks

At runtime, strings behave the same in both languages. TypeScript stops you from calling a string method on a value whose type is not known to be a string:

```ts
function normalizeSearchQuery(query: string): string {
  return query.trim().toLowerCase()
}

normalizeSearchQuery('  TypeScript  ') // valid
// normalizeSearchQuery(42)             // TypeScript error before runtime
```

The parameter's type is the contract: only strings may call this function. A number is rejected before the program runs.

### Narrowing unknown before the methods

For external data, start with `unknown` and narrow it:

```ts
function displayLabel(value: unknown): string {
  if (typeof value !== 'string') {
    return 'No label'
  }

  return value.trim() || 'No label'
}
```

This is not TypeScript making JavaScript safer by magic. The `if` statement is the **runtime** check; TypeScript verifies that the string methods happen only after that check has run.

### What TypeScript cannot decide

Types tell you a value *is* a string; they cannot tell you whether two strings *mean* the same thing. `'Yes'`, `'yes'`, and `' YES '` are all `string`, and comparing them directly returns `false`. The comparison rule — trim first, case-insensitive, or case-sensitive — is a product decision you make in code, and only your tests can prove it. TypeScript also cannot know which characters are "accidental spaces"; that is a business rule too.

### One compiler error, walked through

Open `14_day_strings/starter/ts/main.ts`. The last section is commented out and deliberately broken:

```ts
function brokenLabel(value: unknown): string {
  return value.trim()
}
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the reason:

```
'value' is of type 'unknown'.
```

Read it as: *"You called a string method on a value whose type is unknown — first prove at runtime that it is a string."* The fix is the narrowing `if (typeof value === 'string')` that `displayLabel` already shows. Comment the broken section back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

Strings are ordered, indexed, and immutable text: every method returns a new string and never edits the original, comparisons are a product rule you choose, and TypeScript narrows unknown input before any string method may run.

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact output before running.

1. `'JavaScript'.length` — what is the result?
2. `'JavaScript'.at(-1)` — what is the result?
3. `' hello '.trim().toUpperCase()` — what is the result?
4. `'JavaScript'.slice(0, 4)` — what is the result?
5. `'JavaScript'.slice(-3)` — what is the result?
6. `'red,green'.split(',')` — what is the result?
7. `['red', 'green'].join(', ')` — what is the result?
8. `const name = 'MINA'; name.toLowerCase(); console.log(name)` — what is logged, and why?
9. `''.at(0)` — what is the result?
10. Run `npm.cmd run day14:js` and `npm.cmd run day14`; then `npm.cmd run check` and confirm it passes.

**LeetCode:** 125 Valid Palindrome — https://leetcode.com/problems/valid-palindrome/ (hint: https://neetcode.io/problems/is-palindrome/question)

### Level 2 — Applied mini-projects

1. Write `initials(fullName)` that receives a name such as `'Ada Lovelace'` and returns `'AL'`. Assume exactly two names for this first version.
2. Turn `'  RED, green, Blue  '` into `['red', 'green', 'blue']`.
3. Write `hasFileExtension(filename, extension)` that treats `'.MD'` and `'.md'` as equivalent.
4. Write `isYes(answer)` that accepts `' YES '`, `'yes'`, and `'Yes'` but rejects anything else.
5. TypeScript: write `asDisplayName(value: unknown)` that returns a trimmed non-empty string or `'Anonymous'` for every other case.
6. Build `'lesson'` from `'lesson-notes.md'` using `slice`, without hard-coding the number `6` — use `indexOf('-')`.

### Level 3 — Creative synthesis

1. The tag cleaner: write `cleanTags(raw)` that turns `'  JS , TS, testing '` into `['js', 'ts', 'testing']` in one pipeline, and explain which method does what at each stage.
2. The username: write `usernameFrom(email)` that takes `'mina@example.com'` and returns `'mina'`. Decide and state what happens with the `@` part.
3. The anagram check: write `sameLetters(a, b)` that returns `true` when two words use the same letters regardless of case and order. Hint: split, sort, join.
4. The summary: write `summarize(text, max)` that returns the first `max` characters plus `'...'` when the text was cut, and the full text otherwise.
5. The title case: write `titleCase(phrase)` that returns `'zero to hero'` as `'Zero To Hero'`. State the rule you chose for small words like `'to'`.

## Finish line

Day 14 is complete when you can do all of these **without notes**:

1. Explain why a string method never changes the original string.
2. Read a character by index and the last character with `at`.
3. Build a message with a template literal.
4. Use `trim`, `toLowerCase`, `includes`, `slice`, `split`, `join`, and `replace` from memory.
5. Write a case-insensitive, trimmed comparison.
6. Narrow `unknown` before calling a string method.
7. Say when *not* to normalize text to lowercase.

If any answer is a guess, revisit the matching section before Day 15.

## Prove it

Write, in your own words, a short answer to each:

1. Why does `original.trim()` not change `original`?
2. What is the difference between `slice(0, 4)` and `slice(0, 5)`?
3. When should you *not* normalize text to lowercase?
4. What does `split` return, and how does `join` reverse the idea?
5. Why must TypeScript narrow `unknown` before calling `trim`?
6. What does the type checker know that your tests must still verify about text?

Your answers are today's evidence. If you can write them, move to [Day 15: Numbers and Math — Parsing, Precision, and Calculation](../15_day_numbers/15_day_numbers.md).

**Day 14 complete.** Text is now a value you can inspect and transform — every method returns a new string, comparisons follow a rule you choose, and TypeScript narrows unknown input before any string method runs.