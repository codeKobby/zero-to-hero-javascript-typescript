# Day 44: Project — Country Explorer

[Day 43 <<](../43_day_project_ecommerce/43_day_project_ecommerce.md) | [Day 45 >>](../45_day_capstone/45_day_capstone.md)

## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
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
- [Practice](#practice)
  - [Level 1 — Mechanical (10-15 min)](#level-1--mechanical-10-15-min)
  - [Level 2 — Applied mini-projects](#level-2--applied-mini-projects)
  - [Level 3 — Creative synthesis](#level-3--creative-synthesis)
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

Search covers name, capital, and every language of a country, case-insensitively.

### The pipeline: validated, filtered, sorted, rendered

The core pipeline is `validated -> filtered -> sorted -> rendered`. Keep the original country array unchanged. A language statistic can be built with a `Map`, then converted with `[...counts.entries()].sort(...)` so the source data and the sorted view never share an array.

### Statistics from the filtered set

```js
const languageStats = items =>
  [...items.flatMap(country => country.languages)
    .reduce((counts, language) => counts.set(language, (counts.get(language) ?? 0) + 1), new Map())]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
```

`languageStats` takes the currently visible countries, so the common-languages readout updates as the search narrows instead of reflecting stale global totals.

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

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

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