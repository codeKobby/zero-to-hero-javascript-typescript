# Day 44 practice reference

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. A type describes shape at compile time and is erased at runtime; `JSON.parse` can return anything, so a value must be checked where it enters the app.
2. `sort` mutates in place, so a later view of the same array sees the reordered data; a copy preserves the original order for other views.
3. Statistics computed once from all data go stale as the search narrows; deriving them from the current filtered set keeps the readout consistent with the list.

## Level 2

The core pipeline is `validated -> filtered -> sorted -> rendered`. Keep the original country array unchanged. A language statistic can be built with a `Map`, then converted with `[...counts.entries()].sort(...)`. Port each feature to TypeScript, share the `Country` type with the data module, and make every DOM lookup prove its element type before use.

## Level 3

1. A guard checks the required fields on real values, so a malformed record is rejected at the boundary; the `Country` type only describes what a valid record is supposed to look like.
2. Filters as data compose because each control contributes one predicate; statistics follow the same filtered array so the language readout matches the visible list.
3. `[...items].sort(...)` (or `.toSorted`) leaves the source order untouched, so later views and totals stay consistent no matter how many times the list is re-sorted.
4. The acceptance audit confirms search covers name, capital, and language; region and sort compose; favorites survive refresh only after validated hydration; and the JS and TS pages behave the same with a clean `npm.cmd run check`.

A country explorer treats imported data as untrusted, runs it through a validated-to-filtered-to-sorted-to-rendered pipeline that never mutates the source, computes statistics from the filtered set, and shares a `Country` model in TypeScript while keeping runtime validation at the boundary.