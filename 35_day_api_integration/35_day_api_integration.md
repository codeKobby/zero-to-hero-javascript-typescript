# Day 35: API Integration — One Boundary Owns HTTP Details

[Day 34 <<](../34_day_fetch_api/34_day_fetch_api.md) | [Day 36 >>](../36_day_ts_types/36_day_ts_types.md)

## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [One boundary should own HTTP details](#one-boundary-should-own-http-details)
  - [The client returns unknown at the trust boundary](#the-client-returns-unknown-at-the-trust-boundary)
  - [Loading, success, and error are state](#loading-success-and-error-are-state)
  - [Cache only with a policy](#cache-only-with-a-policy)
  - [Pagination is a contract, not an inference](#pagination-is-a-contract-not-an-inference)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [RequestState is a discriminated union](#requeststate-is-a-discriminated-union)
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

Day 34 gave you `fetch`. Day 35 turns it into a data layer: one module owns transport rules, and feature code asks for domain data. Without that boundary, fetch calls, headers, status checks, caches, and error messages scatter through the UI and make every change expensive.

## Prerequisites

- Day 34: `fetch`, `response.ok`, `response.json`, `AbortController`, runtime guards.
- Day 28: composing small functions.
- Day 19-20: classes and instance state.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- build an `ApiClient` whose methods return data, not `Response`s;
- return `unknown` at the trust boundary and guard into domain types;
- model loading, success, and error as an explicit state union;
- cache responses with a deliberate key and policy;
- represent pagination as a contract with page and total fields;
- run this course's Day 35 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- why the API boundary should return `unknown` before validation;
- what loading state prevents a user from misunderstanding;
- what cache policy would make stale data unacceptable;
- why API credentials should never be committed to a frontend repository.

## The problem this solves

```ts
class ApiClient {
  constructor(private readonly baseUrl: string) {}

  async get(endpoint: string): Promise<unknown> {
    const response = await fetch(this.baseUrl + endpoint)
    if (!response.ok) throw new Error('HTTP ' + response.status)
    return response.json()
  }
}
```

Feature code calls `api.get('/todos')` and receives a value to validate; it never repeats transport logic.

## JS runtime deep dive

### One boundary should own HTTP details

Scattering fetch, headers, status checks, JSON parsing, caching, and error messages throughout a UI makes changes expensive. An API client centralizes transport rules; feature code asks for domain data.

The client wraps the rules you met yesterday — [MDN's Using the Fetch API guide](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) describes the transport it centralizes.

### The client returns unknown at the trust boundary

```ts
async get(endpoint: string): Promise<unknown> {
  const response = await fetch(this.baseUrl + endpoint)
  if (!response.ok) throw new Error('HTTP ' + response.status)
  return response.json()
}
```

The client returns `unknown` at the trust boundary. A feature-specific guard turns `unknown` into a useful domain type. Do not make a generic `get<T>` assertion pretend that untrusted JSON was validated.

`response.json()` parses the body through [the `JSON.parse` algorithm](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse), which is why the boundary hands back `unknown` — nothing about the wire format is trusted yet.

### Loading, success, and error are state

Every UI that waits for data needs an explicit state model:

```ts
type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string }
```

This prevents stale success data from being displayed as if a newer request succeeded.

### Cache only with a policy

An in-memory cache can avoid duplicate requests during one session. Decide its key, invalidation rule, and whether stale data is acceptable. A cache is not automatically correct simply because it is faster.

[MDN's `Map` reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) documents the structure behind a keyed in-memory cache — insertion order and the `has`/`get`/`set` trio.

### Pagination is a contract, not an inference

Pagination is also a contract: page number, page size, total, and next-page behavior must come from the API. Do not infer that an array's length means there are no more records.

### Common mistakes table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Scattering `fetch` across the UI | Speed | Route requests through one client |
| `get<T>` pretending JSON was validated | Convenience | Return `unknown`, guard per feature |
| Hiding loading state | Simplicity | Model idle/loading/success/error |
| Showing stale success during a new load | Forgetfulness | Keep state per request |
| Caching without an invalidation rule | Performance habit | Decide the key and staleness policy |
| Treating array length as the end of pagination | Assuming | Read page/total from the API |

## The TypeScript layer

### RequestState is a discriminated union

`status` is the discriminator. In the `success` arm, `data` exists; in the `error` arm, `message` exists; in `loading` and `idle`, neither does. A `switch (state.status)` narrows each arm so the fields you read always exist.

### What TypeScript cannot decide

TypeScript cannot decide what the server sends, when a request times out, or whether a cached entry is stale. The types describe the contract and the state transitions; the runtime guard and the cache policy are separate decisions that no type can enforce.

### One compiler error, walked through

Open `35_day_api_integration/starter/ts/main.ts`. The last section is commented out and deliberately broken:

```ts
const state: RequestState<Todo[]> = { status: 'loading' }
console.log(state.data)
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the reason:

```
Property 'data' does not exist on type 'RequestState<Todo[]>'.
```

Read it as: *"`RequestState` is a union, and only the `success` arm carries `data` — reading `data` without narrowing by `status` assumes the one arm that a `loading` state does not have."* The fix is to narrow through the discriminator:

```ts
const state: RequestState<Todo[]> = { status: 'success', data: [] }
if (state.status === 'success') {
  console.log(state.data)
}
```

Comment the broken section back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

An API data layer is one boundary that owns transport, returns `unknown` at the trust boundary, models loading/success/error as state, caches by policy, and treats pagination as a contract — with the UI asking for domain data, never raw HTTP.

## Learn more on MDN

An API layer composes the fetch rules you already know. Bookmark these pages and return as you grow:

- [Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) — the transport rules the client wraps
- [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) — the object `fetch` resolves with
- [Response.ok](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok) — the status check every client method performs
- [Response.json()](https://developer.mozilla.org/en-US/docs/Web/API/Response/json) — reading the body at the trust boundary
- [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) — the parser behind `response.json()`
- [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) — the structure for a keyed response cache
- [Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache) — the browser's HTTP cache for longer-lived policies
- [HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching) — the protocol-level caching rules
- [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) — the base type for the client's thrown failures

### TypeScript docs

- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) — the discriminated-union narrowing behind `RequestState`
- [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) — the `T` in `RequestState<T>` and `Promise<T>`

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. Why should the API boundary return `unknown` before validation?
2. What does loading state prevent a user from misunderstanding?
3. What cache policy would make stale data unacceptable?
4. Why should API credentials never be committed to a frontend repository?
5. Run `npm.cmd run day35:js` and `npm.cmd run day35`; then `npm.cmd run check` and confirm it passes.

**LeetCode:** 2621 Sleep — https://leetcode.com/problems/sleep/ (hint: NeetCode roadmap) See [LEETCODE_GUIDE.md](../LEETCODE_GUIDE.md) for how to approach it.

### Level 2 — Applied mini-projects

1. Add a cache `Map` keyed by endpoint.
2. Add a request-state helper and represent loading/success/error.
3. Add a page parameter and a `hasMore` field to the returned contract.
4. Type and validate a `Todo` response at runtime.
5. **MDN lookup:** Open the [Map reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), find the `Map.prototype.get` and `Map.prototype.set` methods, and add a `clearCache()` method to your `ApiClient` that empties the in-memory cache. Comment on when clearing the cache matters.

### Level 3 — Creative synthesis

1. The one-boundary refactor: move a hand-written `fetch` call into `ApiClient.get` and comment on what feature code gains.
2. The stale-cache risk: add a cache with a freshness window, and comment on what happens when data changes before the window expires.
3. The request-state gallery: render each of the four states for one endpoint, and comment on what each arm shows the user.
4. The pagination contract: model a page response with page, size, total, and `hasMore`, and comment on why the array length alone is not enough.

## Finish line

Day 35 is complete when you can do all of these **without notes**:

1. Build an `ApiClient` whose methods return data, not `Response`s.
2. Return `unknown` at the trust boundary and guard into domain types.
3. Model loading, success, and error as an explicit state union.
4. Cache responses with a deliberate key and policy.
5. Represent pagination as a contract with page and total fields.

If any answer is a guess, revisit the matching section before Day 36.

## Prove it

Write, in your own words, a short answer to each:

1. Why should the API boundary return `unknown` before validation?
2. What does loading state prevent a user from misunderstanding?
3. What cache policy would make stale data unacceptable?
4. Why should API credentials never be committed to a frontend repository?
5. Why does `state.data` fail against `RequestState<Todo[]>`, and what does the fix require?

Your answers are today's evidence. If you can write them, move to [Day 36: TypeScript Types and Interfaces — Designing the Data Contract](../36_day_ts_types/36_day_ts_types.md).

**Day 35 complete.** API integration is now one boundary that owns transport, returns `unknown` at the trust boundary, models loading/success/error as state, caches by policy, and treats pagination as a contract.