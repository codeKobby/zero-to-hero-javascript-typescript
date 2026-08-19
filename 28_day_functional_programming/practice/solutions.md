# Day 28 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. A pure function gives the same output for the same input and does not change outside state.
2. Several parts of an app can read the same value safely; a change produces a new value while the old one stays available for comparison or undo.
3. `'  Hello  '` → `'Hello'` (trimmed) → `'hello'` (lowercased).
4. Side effects are the parts of a page that change over time; keeping them at clear boundaries means the data transformations stay predictable and testable.
5. The result of `map`, `filter`, and `reduce` depends on the callback; a callback that mutates state makes the pipeline depend on call history.

## Level 2

```ts
function withoutId<T extends { id: number }>(items: T[], id: number): T[] {
  return items.filter((item) => item.id !== id)
}

function updateUser<T extends object>(user: T, changes: Partial<T>): T {
  return { ...user, ...changes }
}

function pipe<T>(...functions: Array<(value: T) => T>): (input: T) => T {
  return (input) => functions.reduce((value, fn) => fn(value), input)
}

const label = pipe(
  (value: string) => value.trim(),
  (value: string) => value.toLowerCase(),
  (value: string) => 'tag:' + value
)
```

These helpers return new values. They do not make nested data immutable automatically; copy nested objects only when the update actually changes them.

## Level 3

```ts
// 1. The identity pipe
function pipe<T>(...functions: Array<(value: T) => T>): (input: T) => T {
  return (input) => functions.reduce((value, fn) => fn(value), input)
}
const identity = pipe()
// reduce over an empty array returns the initial value unchanged, so the
// identity base case keeps the helper correct for zero functions.

// 2. The selective merge
type Profile = {
  name: string
  preferences: { theme: 'light' | 'dark' }
}

function updateProfile(profile: Profile, changes: Partial<Profile>): Profile {
  return {
    ...profile,
    ...changes,
    preferences: changes.preferences
      ? { ...profile.preferences, ...changes.preferences }
      : profile.preferences,
  }
}
// Shallow spread copies the object but not its nested preferences object;
// copying it only when changes.preferences exists avoids an unnecessary copy.

// 3. The audited state
function toReadingList(items: string[]): string[] {
  return [...items].sort()
}
// Sorting in place would mutate the caller's array, so the copy is sorted
// instead. Other consumers of the original array stay unaffected.

// 4. The boundary memo
// DOM updates: render the result of a pure computation.
// Storage: read once, write at a boundary, never inside a pure step.
// Network: fetch at a boundary, parse, then feed pure transformations.
// Each effect has one place, so the pipeline stays predictable.
```

Transformations now return new values and compose one step at a time, with side effects pushed to clear boundaries.