# Day 44: Project — Country Explorer

[← Previous lesson](../43_day_project_ecommerce/43_day_project_ecommerce.md) · [README](../README.md) · [Setup](../VS_CODE_SETUP.md) · [Day index](../DAY_INDEX.md) · [Next lesson →](../45_day_capstone/45_day_capstone.md)



## Start here

Read the [course README](../README.md), complete the [VS Code setup](../VS_CODE_SETUP.md), and use the [day index](../DAY_INDEX.md) to confirm where this lesson fits. Run the paired local starters before attempting the numbered exercises in this lesson, then use [hints](practice/hints.md) and [solutions](practice/solutions.md) only after an honest attempt.

## Table of Contents

- [Start here](#start-here)

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [Keywords and terms](#keywords-and-terms)
- [Topics](#topics)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [The runnable baseline](#the-runnable-baseline)
  - [The pipeline: validated, filtered, sorted, rendered](#the-pipeline-validated-filtered-sorted-rendered)
  - [Statistics from the filtered set](#statistics-from-the-filtered-set)
  - [Pitfalls table](#pitfalls-table)
- [The TypeScript layer](#the-typescript-layer)
  - [The Country model](#the-country-model)
  - [One boundary, walked through](#one-boundary-walked-through)
  - [What TypeScript cannot decide](#what-typescript-cannot-decide)
- [One-sentence mental model](#one-sentence-mental-model)
- [Learn more on MDN](#learn-more-on-mdn)
  - [TypeScript docs](#typescript-docs)
- [Read the first example line by line](#read-the-first-example-line-by-line)
- [Prediction experiment](#prediction-experiment)
- [Broken example and repair](#broken-example-and-repair)
- [Guided practice before independent work](#guided-practice-before-independent-work)
- [Practice](#practice)
  - [Level 1 — Mechanical (10-15 min)](#level-1-mechanical-10-15-min)
  - [Level 2 — Applied mini-projects](#level-2-applied-mini-projects)
  - [Level 3 — Creative synthesis](#level-3-creative-synthesis)
- [Finish line](#finish-line)
- [Prove it](#prove-it)

## Why this lesson exists

Day 44 is a data-processing project. You will filter, search, sort, aggregate, and render a local country dataset without depending on an API key or network availability. The JS and TS starters use the same eight-country fixture so a clone is deterministic; replace it with a larger validated dataset only after the pipeline works.

## Prerequisites

- Day 12-13: higher-order functions.
- Day 22-23: JSON-shaped data and storage.
- Day 43: derived views from a single source of truth.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- treat imported JSON-like data as `unknown` until its shape is checked;
- compose pure search and region filters, then derive statistics with `Map`/`reduce`;
- keep the source array unchanged and render data safely;
- share a `Country` model in TypeScript while keeping runtime validation at the boundary.

And you will be able to **explain**:

- why a TypeScript type cannot prove that an imported JSON-like value is valid;
- why sorting the source array in place can change later views;
- why search and statistics should use the current filtered set, not stale global totals;
- why country and language text is data that must be rendered with safe DOM APIs.

## The problem this solves

A country explorer processes a local dataset offline: search covers name, capital, and language; region and sort controls compose; statistics are computed from the currently filtered set; favorites survive refresh only after validated storage hydration; and the TypeScript version adds a `Country` model plus a runtime guard so you can compare compile-time help with runtime validation.

## Keywords and terms

| Keyword or term | Plain-English meaning |
| --- | --- |
| **The runnable baseline** | The lesson explains the runnable baseline through runnable examples and practice. |
| **The pipeline: validated, filtered, sorted, rendered** | The lesson explains the pipeline: validated, filtered, sorted, rendered through runnable examples and practice. |
| **Statistics from the filtered set** | The lesson explains statistics from the filtered set through runnable examples and practice. |
| **Pitfalls table** | The lesson explains pitfalls table through runnable examples and practice. |

## Topics

Read the topics in order: first understand the idea, then study the syntax, then compare a normal case with a boundary case, and finally complete the practice.

The existing deep-dive sections are the main topic sequence for this lesson:

- [The runnable baseline](#the-runnable-baseline)
- [The pipeline: validated, filtered, sorted, rendered](#the-pipeline-validated-filtered-sorted-rendered)
- [Statistics from the filtered set](#statistics-from-the-filtered-set)
- [Pitfalls table](#pitfalls-table)

## JS runtime deep dive

### The runnable baseline

Run the starter. The JavaScript page opens directly — double-click `44_day_project_countries/starter/index.html` (no server needed). The TypeScript page is served with Vite from the repository root:

```powershell
npm.cmd run dev
```

Then open `/44_day_project_countries/starter/index.ts.html`.

The baseline imports the local fixture and uses runtime checks:

```js
import { countries } from './data/countries.js'

const searchCountries = (items, query, region) => {
  const q = query.trim().toLowerCase()
  return items.filter(country =>
    (region === 'all' || country.region === region) &&
    (!q || [country.name, country.capital, ...country.languages]
      .some(value => value.toLowerCase().includes(q))))
}
```

Search covers name, capital, and every language of a country, case-insensitively. The matching itself is `some` and `includes`; [MDN documents Array.prototype.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) including the empty-array result and the `thisArg` you can ignore.

### The pipeline: validated, filtered, sorted, rendered

The core pipeline is `validated -> filtered -> sorted -> rendered`. Keep the original country array unchanged. A language statistic can be built with a `Map`, then converted with `[...counts.entries()].sort(...)` so the source data and the sorted view never share an array. `flatMap` flattens every country's languages into one list first, and [MDN documents Array.prototype.flatMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap) showing how the mapping and flattening happen in one pass.

### Statistics from the filtered set

```js
const languageStats = items =>
  [...items.flatMap(country => country.languages)
    .reduce((counts, language) => counts.set(language, (counts.get(language) ?? 0) + 1), new Map())]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
```

`languageStats` takes the currently visible countries, so the common-languages readout updates as the search narrows instead of reflecting stale global totals. Counting with a `Map` relies on `get` returning `undefined` for a new key; [MDN documents Map.prototype.set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) and the `get` behavior the `?? 0` fallback depends on.

### Pitfalls table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Trusting a type as a runtime validator | Types are erased | Check shape at the boundary |
| Sorting the source array in place | Forgetting mutation | Derive a copied sorted list |
| Computing statistics once from all data | Convenience | Compute from the filtered set |
| Building country text into `innerHTML` | Convenience | Use `textContent` |
| Hydrating favorites without validation | Parsing succeeds | Validate stored data first |

## The TypeScript layer

### The Country model

```ts
import { countries, type Country } from './data/countries.ts'
export {}
```

The TypeScript starter imports the same data shape through a `Country` type, but the type is not a runtime validator. Add a guard before accepting a larger external dataset; the app should feel identical while you compare what each language catches.

### One boundary, walked through

Open `44_day_project_countries/starter/ts/main.ts`. Every DOM lookup proves its element type before use, then reads through a small `ui` object:

```ts
const root = document.querySelector('#app')
if (!(root instanceof HTMLElement)) throw new Error('Missing #app')
```

Read it as: *"`querySelector` returns `Element | null`, so a failed lookup is a real failure and must be named, not silently ignored."* The `Country` type describes the fixture; the element checks describe the page.

### What TypeScript cannot decide

The `Country` type describes the fixture's shape, but it cannot prove that a JSON-like value from a larger dataset is valid, and it cannot decide whether a DOM lookup will succeed. Runtime guards at the data boundary and at each element lookup remain the real checks.

## One-sentence mental model

A country explorer treats imported data as untrusted, runs it through a validated-to-filtered-to-sorted-to-rendered pipeline that never mutates the source, computes statistics from the filtered set, and shares a `Country` model in TypeScript while keeping runtime validation at the boundary.

## Learn more on MDN

The country explorer is one data pipeline of filters, flattens, counts, and sorts — each with a reference page worth returning to:

- [Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) — composing region and query into the visible set
- [Array.prototype.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) — matching name, capital, or any single language
- [String.prototype.toLowerCase](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase) — the case-insensitive normalization behind search
- [Array.prototype.flatMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap) — flattening each country's languages into one list in a pass
- [Array.prototype.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) — building the language-count map from the flattened list
- [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) — the counts accumulator and its `get`/`set` behavior
- [Array.prototype.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) — the copy-first sorted view that never touches source order
- [Array.prototype.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) — taking the top three languages from the sorted counts

### TypeScript docs

- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — the `Country` model and its array-shaped fields
- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) — how `instanceof HTMLElement` proves each DOM lookup
- [Using Type Predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) — what an `isCountry` guard tells the compiler about imported data

## Read the first example line by line

The first runnable example introduces **Project — Country Explorer**. Run it unchanged before editing it. Then read it line by line and write down what value exists after each declaration, which condition is tested, and what appears in the console.

| Line | Code | What the runtime is doing |
| ---: | --- | --- |
| 1 | `import { countries } from './data/countries.js'` | Expression or data declaration: identify the values, operators, and names before running it. |
| 2 | `` | Blank line: it separates ideas for the reader. |
| 3 | `const searchCountries = (items, query, region) => {` | Declaration or assignment: the runtime creates or updates a named value. |
| 4 | `  const q = query.trim().toLowerCase()` | Declaration or assignment: the runtime creates or updates a named value. |
| 5 | `  return items.filter(country =>` | Function syntax: this line defines reusable behavior or an arrow function. |
| 6 | `    (region === 'all' \|\| country.region === region) &&` | Function call: the runtime evaluates the arguments and invokes the operation. |
| 7 | `    (!q \|\| [country.name, country.capital, ...country.languages]` | Expression or data declaration: identify the values, operators, and names before running it. |
| 8 | `      .some(value => value.toLowerCase().includes(q))))` | Function syntax: this line defines reusable behavior or an arrow function. |
| 9 | `}` | Expression or data declaration: identify the values, operators, and names before running it. |

The table is a starting point, not a substitute for running the example. Change one value only, predict the output, run it, and explain the difference.

## Prediction experiment

Before changing the example, write a prediction. Test one normal input, one empty or missing input, and one boundary input relevant to **Project — Country Explorer**. Record the input, your prediction, the observed output or error, and the rule you learned. Keep the failed prediction; it shows which mental model needs repair.

## Broken example and repair

Make one controlled mistake related to **Project — Country Explorer**: misspell a name, use the wrong type, omit a return, call a function too early, or change one condition. Run it and capture the useful error or incorrect output. Explain the assumption that failed, then make the smallest repair and rerun the normal and boundary cases. Do not hide the error with a broad catch or delete the failing experiment.

## Guided practice before independent work

Start with the nearest worked example. Change one value, predict the result, and run it. Next, change one rule while keeping the input the same. Finally, write a small variation from a blank file and compare it with the example. Only after these three checkpoints should you begin the numbered or level-based practice below.

## Practice

Use the numbered exercises in this lesson first, then [practice/hints.md](practice/hints.md), and finally [practice/solutions.md](practice/solutions.md).

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).\n- When the project meets the Definition of done checklist, log it in [PORTFOLIO_TRACK.md](../PORTFOLIO_TRACK.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. Why can't a TypeScript type prove that an imported JSON-like value is valid?
2. Why does sorting the source array in place change later views?
3. Why should statistics use the current filtered set, not stale global totals?
4. Run `npm.cmd run check` and `npm.cmd run links`; then open the JavaScript starter directly (`starter/index.html`) and serve the TypeScript page (`npm.cmd run dev`, then `starter/index.ts.html`).

### Level 2 — Applied mini-projects

Build the project in order, recording evidence for each milestone in your project README:

1. Trace `searchCountries` and `languageStats` using three countries on paper.
2. Add sort, population/area statistics, a detail view, and favorites.
3. Add a two-country comparison and an empty/error state.
4. Port each feature to TypeScript and add a type guard for the dataset.
5. **MDN lookup:** Open the [Array.prototype.find reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find), find how it returns `undefined` when nothing matches, and add a detail view that shows the first country matching a clicked name. Comment on when `find` is the right tool compared with `filter`.

### Level 3 — Creative synthesis

1. The validated boundary: write a `isCountry` guard that checks the required fields before accepting a larger external dataset; comment on why the `Country` type alone is not enough.
2. The composed search: write `searchCountries(countries, filters)` where search, region, and sort compose as data; comment on why statistics follow the filtered set.
3. The copied sort: derive sorted views from copies and confirm the source array order never changes; comment on why that matters for later views.
4. The acceptance audit: confirm search covers name, capital, and language; confirm region and sort compose; confirm favorites survive refresh only after validated hydration; confirm JS and TS behave the same with a clean `npm.cmd run check`.

## Finish line

Day 44 is complete when you can do all of these **without notes**:

1. Treat imported JSON-like data as `unknown` until its shape is checked.
2. Compose pure search and region filters, then derive statistics with `Map`/`reduce`.
3. Keep the source array unchanged and render data safely.
4. Share a `Country` model in TypeScript while keeping runtime validation at the boundary.
5. Meet every acceptance criterion with JS and TS pages that behave the same.

If any answer is a guess, revisit the matching section before Day 45.

## Prove it

Write, in your own words, a short answer to each:

1. Why can't a TypeScript type prove that an imported JSON-like value is valid?
2. Why does sorting the source array in place change later views?
3. Why should search and statistics use the current filtered set, not stale global totals?
4. Why is country and language text rendered with safe DOM APIs rather than `innerHTML`?
5. Which acceptance criteria did you meet, and where is the evidence?

Your answers are today's evidence. If you can write them, move to [Day 45: Capstone — Build and Defend Your Own Application](../45_day_capstone/45_day_capstone.md).

**Day 44 complete.** A country explorer treats imported data as untrusted, runs it through a validated-to-filtered-to-sorted-to-rendered pipeline that never mutates the source, computes statistics from the filtered set, and shares a `Country` model in TypeScript while keeping runtime validation at the boundary.