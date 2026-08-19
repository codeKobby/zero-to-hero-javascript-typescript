# Day 22: JSON and External Data — Shaping Untrusted Input

[Day 21 <<](../21_day_modules/21_day_modules.md) | [Day 23 >>](../23_day_web_storage/23_day_web_storage.md)

## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [JSON is a transport format](#json-is-a-transport-format)
  - [Parse is not validate](#parse-is-not-validate)
  - [Handle syntax errors at the boundary](#handle-syntax-errors-at-the-boundary)
  - [Stringify creates text](#stringify-creates-text)
  - [Allowlist public data](#allowlist-public-data)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [Type predicates earn the trust](#type-predicates-earn-the-trust)
  - [What TypeScript cannot decide](#what-typescript-cannot-decide)
  - [One compiler error, walked through](#one-compiler-error-walked-through)
- [One-sentence mental model](#one-sentence-mental-model)
- [Learn more on MDN](#learn-more-on-mdn)
- [Practice](#practice)
  - [Level 1 — Mechanical (10-15 min)](#level-1--mechanical-10-15-min)
  - [Level 2 — Applied mini-projects](#level-2--applied-mini-projects)
  - [Level 3 — Creative synthesis](#level-3--creative-synthesis)
- [Finish line](#finish-line)
- [Prove it](#prove-it)

## Why this lesson exists

Your program will receive text from users, storage, and APIs. That text must be parsed, checked, and shaped before it is trusted. A crash on bad input, or worse, acting on unexpected data, starts here.

This lesson teaches the full external-data path: parse text safely, validate its shape, and send back only the public fields you intend.

## Prerequisites

- Day 18: throwing and catching errors.
- Day 21: modules and file boundaries.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- parse JSON text safely with a success/failure result;
- write a shape guard like `isLearner` and use it before trusting data;
- stringify values with intent, including readable indentation;
- create a public shape with an allowlist instead of deleting fields;
- write a type predicate `value is Product` in TypeScript;
- run this course's Day 22 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- the difference between valid JSON and valid application data;
- why a `typeof object` check must also exclude `null`;
- which values JSON does not faithfully preserve;
- why an allowlist beats deleting a password field.

## The problem this solves

External JSON is text until you parse it, and parsed until you validate it. One guard controls the moment data becomes trusted:

```js
function isLearner(value) {
  return typeof value === 'object' &&
    value !== null &&
    typeof value.name === 'string' &&
    typeof value.completedLessons === 'number'
}
```

Only after that check passes do you use the value as a learner.

## JS runtime deep dive

### JSON is a transport format

JSON is text used to exchange structured values between programs. It resembles JavaScript object syntax, but it is not an object until `JSON.parse` reads it:

```js
const text = '{"name":"Mina","completedLessons":22}'
const value = JSON.parse(text)

console.log(typeof text)  // string
console.log(typeof value) // object
```

JSON supports objects, arrays, strings, numbers, booleans, and `null`. It does not preserve functions, `undefined`, `Map`, `Set`, or `Date` objects as their original JavaScript values. The [MDN JSON reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) is the full picture of what the format can and cannot carry, and the [Working with JSON guide](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON) shows JSON in the wild on a real API response.

### Parse is not validate

`JSON.parse` answers only one question: **is this valid JSON text?** It does not prove that the value has the shape your application needs:

```js
const parsed = JSON.parse('{"completedLessons":"twenty-two"}')
// The text is valid JSON, but completedLessons is a string.
```

Treat external JSON as unknown. Check the parts you use. The object check comes first because `null` is also reported as an object by `typeof`. The [MDN JSON.parse reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) documents the throw path on malformed text and the optional `reviver` function, which can transform values during parsing but is no substitute for a shape guard.

### Handle syntax errors at the boundary

```js
function tryParseJson(text) {
  try {
    return { ok: true, value: JSON.parse(text) }
  } catch {
    return { ok: false, value: null }
  }
}
```

Syntax failure and shape failure are separate paths. A caller should handle both before trusting data.

### Stringify creates text

```js
const learner = { name: 'Mina', completedLessons: 22 }
const storedText = JSON.stringify(learner)
const readableText = JSON.stringify(learner, null, 2)
```

The final argument requests indentation for people. Do not rely on property order in JSON as a business rule.

`JSON.stringify` omits object properties whose values are `undefined` or functions. It turns `Date` values into ISO strings through Date serialization. Decide deliberately how your data should be represented before storing or sending it. The [MDN JSON.stringify reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) documents the `replacer` parameter and the exact rules for which values are omitted — worth reading before you rely on what survives a round trip.

### Allowlist public data

Do not serialize an entire object merely because it is convenient. Create the public shape you intend to send:

```js
function toPublicProfile(user) {
  return {
    id: user.id,
    name: user.name
  }
}
```

This is safer and clearer than trying to delete sensitive fields from a full object. It also does not replace server-side authorization; the server must independently enforce what a caller may access.

### Common mistakes table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Trusting parsed JSON immediately | Forgetting parse ≠ validate | Guard the shape before use |
| Forgetting `null` passes `typeof object` | Relying on a JS quirk | Check `value !== null` first |
| Sending the whole user object | Convenience | Build an allowlisted public shape |
| Relying on property order | Assuming JSON keeps order as a rule | Treat order as unspecified |
| One try/catch for both syntax and shape | Merging two failure kinds | Handle each path separately |

## The TypeScript layer

### Type predicates earn the trust

TypeScript cannot make `JSON.parse` return a trusted `Learner` just by writing an assertion. The guard performs the runtime work:

```ts
type Learner = {
  name: string
  completedLessons: number
}

function isLearner(value: unknown): value is Learner {
  return typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    'completedLessons' in value &&
    typeof value.name === 'string' &&
    typeof value.completedLessons === 'number'
}
```

After `isLearner(value)` returns `true`, TypeScript knows the value is a `Learner`. Before it returns `true`, it remains `unknown`.

### What TypeScript cannot decide

TypeScript cannot decide which fields are sensitive or which shapes your API promises — those are product decisions. It cannot validate data at runtime; the guard is real JavaScript that your tests must prove. A type predicate only communicates to TypeScript that the check happened.

### One compiler error, walked through

Open `22_day_json/starter/ts/main.ts`. The last section is commented out and deliberately broken:

```ts
const value: unknown = JSON.parse('{"name":"Mina","completedLessons":22}')
console.log(value.name)
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the reason:

```
Property 'name' does not exist on type 'unknown'.
```

Read it as: *"`JSON.parse` returns `any`, but once we treat the parsed value as `unknown`, TypeScript refuses to read `.name` until a guard proves the shape."* The fix is the `isLearner` type predicate from the starter:

```ts
if (result.ok && isLearner(result.value)) {
  console.log(result.value.name)
}
```

Comment the broken section back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

JSON is text, not trusted data — parse it safely, prove its shape with a guard before use, and send back only the allowlisted public fields.

## Learn more on MDN

JSON has more surface than `parse` and `stringify` — bookmark the pages that match the boundary you just hardened:

- [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) — the global object with `parse` and `stringify`
- [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) — the throw path, the reviver, and what counts as valid JSON text
- [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) — the replacer and space parameters and which values are omitted
- [Working with JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON) — JSON in a real request and response cycle
- [typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) — why `null` reports as `object` and must be excluded
- [SyntaxError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError) — what `JSON.parse` throws on malformed text
- [Date.prototype.toJSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON) — how `Date` objects serialize into ISO strings

### TypeScript docs

- [Type Guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) — `value is Learner` predicates, the core of this lesson's trust boundary
- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) — the checks that turn `unknown` into a usable shape

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. `JSON.parse('{"a":1}')` — what type is the result? And `typeof '{"a":1}'`?
2. Why must a `typeof object` check also exclude `null`?
3. `JSON.parse('{"completedLessons":"twenty-two"}')` — valid JSON or valid application data?
4. `JSON.stringify({ name: 'Mina', theme: undefined, role() {} })` — what is omitted?
5. What happens to a `Date` value during `JSON.stringify`?
6. Why is `delete user.password` before `stringify` worse than building an allowlist?
7. Run `npm.cmd run day22:js` and `npm.cmd run day22`; then `npm.cmd run check` and confirm it passes.

### Level 2 — Applied mini-projects

1. Write `tryParseJson(text)`, returning a success/failure object.
2. Write `isProduct(value)` for `{ name: string, priceInCents: number }`.
3. Write `toPublicProduct(product)` that returns only `name` and `priceInCents`.
4. TypeScript: express `isProduct` as a type predicate, not as a type assertion.
5. **MDN lookup:** Open the [JSON.stringify reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify), find the `replacer` parameter, and use it to build `toPublicProfile` so it picks only `id` and `name` out of a full user object without a hand-written allowlist. Comment on whether the `replacer` approach is clearer or worse than the explicit function from the lesson.

### Level 3 — Creative synthesis

1. The array guard: write `isLearnerList(value)` that returns `true` only for an array whose every element passes `isLearner`. Use it after `tryParseJson`.
2. The settings boundary: write `loadSettings()` that parses stored text, validates shape, and returns `{ ok: true, settings }` or `{ ok: false, settings: defaults }`. State why a shape guard belongs at this boundary.
3. The redactor: write `toPublicUser(user)` returning only `id` and `name`, then a comment explaining why the server must still enforce access independently.
4. The storage memo: write a comment block listing three JavaScript values JSON cannot preserve and how you would represent each in JSON instead.

## Finish line

Day 22 is complete when you can do all of these **without notes**:

1. Parse JSON text safely with a success/failure result.
2. Write a shape guard like `isLearner` and use it before trusting data.
3. Stringify values with intent, including readable indentation.
4. Create a public shape with an allowlist instead of deleting fields.
5. Write a type predicate `value is Product` in TypeScript.

If any answer is a guess, revisit the matching section before Day 23.

## Prove it

Write, in your own words, a short answer to each:

1. What is the difference between valid JSON and valid application data?
2. Why must a `typeof object` check also exclude `null`?
3. What values are not faithfully preserved by JSON?
4. Why is an allowlist better than deleting a password field?
5. Why does a type predicate not validate at runtime by itself?
6. What does the type checker know that your tests must still verify about external data?

Your answers are today's evidence. If you can write them, move to [Day 23: Web Storage — Keeping Data Between Visits](../23_day_web_storage/23_day_web_storage.md).

**Day 22 complete.** External data now flows through one trusted path: parse safely, prove the shape with a guard, and send back only the public fields — with type predicates telling TypeScript exactly where the trust was earned.