# Day 45: Capstone — Build and Defend Your Own Application

[Day 44 <<](../44_day_project_countries/44_day_project_countries.md) | [Back to course](../readMe.md)

## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [The runnable baseline](#the-runnable-baseline)
  - [One vertical slice: input, state, render, persist](#one-vertical-slice-input-state-render-persist)
  - [Pitfalls table](#pitfalls-table)
- [The TypeScript layer](#the-typescript-layer)
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

Day 45 is an assessment, not a lecture that declares you finished. You choose a small problem, explain the design, implement it in JavaScript first, and then carry the same design into TypeScript. The starter is a capstone planner; it is deliberately small so your product is the work being assessed.

## Prerequisites

- Every lesson from Days 1-44. The capstone draws on DOM events, pure data transformations, async/error states, persistence, and strict TypeScript together.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- turn an ambiguous idea into a shipped, explainable browser application;
- implement one real application in JavaScript and port the same design to TypeScript;
- write a README first, then build, test, deploy, and defend the result.

And you will be able to **explain**:

- why JavaScript proves the runtime design and TypeScript layers on contracts without replacing the implementation or the tests;
- why a strict `npm.cmd run check` and runtime validation at boundaries are different jobs;
- why a capstone is judged on judgment, not syntax trivia.

## The problem this solves

The capstone expects the same real application in both languages. JavaScript proves the runtime design; TypeScript layers on interfaces, generics, and runtime validation where they improve the boundary, but it does not replace the implementation or the tests. That keeps the assessment focused on judgment instead of syntax trivia.

## JS runtime deep dive

### The runnable baseline

Run the planner with:

```powershell
npm.cmd run dev
```

Then open `/45_day_capstone/starter/index.html` for JavaScript or `/45_day_capstone/starter/index.ts.html` for TypeScript. The planner stores `{ title, milestones }` in localStorage:

```js
const STORAGE_KEY = 'day45-capstone-plan'
const state = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{"title":"My capstone","milestones":[]}')
```

### One vertical slice: input, state, render, persist

The planner is a single vertical slice: the form reads input, `save` writes the whole state object, and `render` rebuilds the view from state. One source of truth, one save path, one render path:

```js
function save() { state.title = title.value.trim() || 'My capstone'; localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) }
function render() { heading.textContent = state.title; list.replaceChildren(...state.milestones.map(item => { const li = document.createElement('li'); li.textContent = item; return li })) }
```

### Pitfalls table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Writing the README last | Impatience | Write it first |
| Shipping one language only | Missing the point | Same design in JS and TS |
| Treating `check` as the only safety | Types are erased | Validate data at boundaries |
| Trusting untested code | Confidence | Test pure logic, then let a person break it |
| Rendering data into `innerHTML` | Convenience | Use safe DOM APIs and accessible states |

## The TypeScript layer

The capstone expects the same real application in both languages. JavaScript proves the runtime design; TypeScript layers on interfaces, generics, and runtime validation where they improve the boundary, but it does not replace the implementation or the tests.

### One boundary, walked through

Open `45_day_capstone/starter/ts/main.ts`. The planner reads localStorage through `readPlan`, which parses `unknown` and checks the shape before trusting it:

```ts
const readPlan = (): Plan => {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
    if (typeof value === 'object' && value !== null &&
        'title' in value && 'milestones' in value &&
        typeof value.title === 'string' &&
        Array.isArray(value.milestones) &&
        value.milestones.every(item => typeof item === 'string')) return value as Plan
  } catch { /* use default */ }
  return { title: 'My capstone', milestones: [] }
}
```

Read it as: *"`localStorage` returns strings, `JSON.parse` returns `unknown`, and only a shape-checked value may become the `Plan` that the rest of the app trusts."* The `Plan` type describes the state; `readPlan` decides what actually qualifies at runtime.

### What TypeScript cannot decide

Strict `npm.cmd run check` proves the types line up; it cannot prove the app works, that a real person can complete the primary task, or that a stored value is valid. Tests and a human breaking the app are the other half of the evidence.

## One-sentence mental model

A capstone is an assessment: write the README first, build one vertical slice in JavaScript, carry the same design into TypeScript with contracts at the boundaries, test the pure logic, deploy, and let another person break it so you can record the fixes.

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. Why does JavaScript prove the runtime design while TypeScript layers on contracts?
2. Why does strict `npm.cmd run check` not replace runtime validation at boundaries?
3. Why is the README written before the code, not after?
4. Run `npm.cmd run check` and `npm.cmd run links`; then `npm.cmd run dev` and open both planner pages.

### Level 2 — Applied mini-projects

Build the capstone in order, recording evidence for each milestone in your project README:

1. Write `README.md` first: user, problem, non-goals, acceptance criteria, data model, and run/deploy commands.
2. Build one vertical slice in `starter/js`: input -> state -> render -> error/empty state.
3. Port the slice to `starter/ts` with interfaces, generics or utility types where they improve the design, and runtime validation for external data.
4. Add tests for pure functions and manually test keyboard, mobile, refresh, empty, and failure states.
5. Deploy and ask another person to break it. Record fixes and trade-offs in the README.

### Level 3 — Creative synthesis

1. The defending author: open the [review rubric](practice/solutions.md) as a checklist and write a short defense of each criterion for your app; comment on which criteria were hardest to meet.
2. The same-design port: keep JS and TS acceptance criteria identical; comment on what changed in the port and what stayed the same.
3. The vertical slice: explain why one slice beats a wide but shallow scaffold; comment on how features attach only once the slice is reliable.
4. The evidence audit: confirm the evidence checklist end-to-end — a user completes the primary task, `check` passes strict, both languages match criteria, rendering is safe and accessible, state has one source of truth with validated persistence, and the README has a live link, screenshots, setup, known limits, and next steps.

## Finish line

Day 45 is complete when you can do all of these **without notes**:

1. Turn an ambiguous idea into a shipped, explainable browser application.
2. Implement one real application in JavaScript and port the same design to TypeScript.
3. Write a README first, then build, test, deploy, and defend the result.
4. Defend every criterion on the evidence checklist with concrete evidence.

If any answer is a guess, revisit the matching section before you call the course done.

## Prove it

Write, in your own words, a short answer to each:

1. Why does JavaScript prove the runtime design while TypeScript layers on contracts?
2. Why does strict `npm.cmd run check` not replace runtime validation at boundaries?
3. Why is the README written before the code, not after?
4. Which evidence checklist items did you meet, and where is the evidence for each?
5. What trade-offs did another person's attempt to break your app reveal?

Your answers are today's evidence. When you can write them, you are done — return to the [course home](../readMe.md) and review the portfolio and quality guides for what comes next.

**Day 45 complete.** A capstone is an assessment: write the README first, build one vertical slice in JavaScript, carry the same design into TypeScript with contracts at the boundaries, test the pure logic, deploy, and let another person break it so you can record the fixes.