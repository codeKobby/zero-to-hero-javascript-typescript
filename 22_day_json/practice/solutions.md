# Day 22 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. `value` is an object (JSON text becomes a value once parsed); `typeof '{"a":1}'` is `string`.
2. `typeof null` is `'object'`, so a guard that only checks object would let `null` through.
3. Valid JSON — the text parses. Not valid application data: `completedLessons` is a string, not a number.
4. The `theme: undefined` and the function are omitted.
5. A `Date` is turned into an ISO string by Date serialization — it does not come back as a `Date`.
6. Deleting mutates a shared object and only strips known keys; an allowlist builds exactly the public shape, and the server must still enforce access independently.
7. `day22:js` and `day22` run; `npm run check` passes.

## Level 2

```ts
type Product = {
  name: string
  priceInCents: number
}

function tryParseJson(text: string): { ok: boolean; value: unknown | null } {
  try {
    return { ok: true, value: JSON.parse(text) }
  } catch {
    return { ok: false, value: null }
  }
}

function isProduct(value: unknown): value is Product {
  return typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    'priceInCents' in value &&
    typeof value.name === 'string' &&
    typeof value.priceInCents === 'number'
}

function toPublicProduct(product: Product): Product {
  return { name: product.name, priceInCents: product.priceInCents }
}
```

The type predicate does not validate automatically. It communicates to TypeScript that this specific function has performed the required checks.

## Level 3

```ts
// 1. The array guard
function isLearnerList(value: unknown): value is Learner[] {
  return Array.isArray(value) && value.every(isLearner)
}

const listResult = tryParseJson('[{"name":"Mina","completedLessons":22}]')
if (listResult.ok && isLearnerList(listResult.value)) {
  console.log(listResult.value[0].name) // Mina
}

// 2. The settings boundary
const DEFAULT_SETTINGS = { theme: 'dark' }

function loadSettings(): { ok: boolean; settings: typeof DEFAULT_SETTINGS } {
  const result = tryParseJson(storedSettingsText)

  if (result.ok && isSettings(result.value)) {
    return { ok: true, settings: result.value }
  }

  return { ok: false, settings: DEFAULT_SETTINGS }
}
// The shape guard belongs at the boundary so invalid stored data resolves to
// safe defaults instead of crashing the app with a malformed settings object.

// 3. The redactor
function toPublicUser(user: User): { id: string; name: string } {
  return {
    id: user.id,
    name: user.name
  }
}
// toPublicUser never even touches password/hash fields. Even so, the server
// must independently enforce access: a client-side allowlist cannot replace
// server-side authorization.

// 4. The storage memo
// JSON cannot preserve: functions (dropped), undefined-valued properties
// (dropped), and Date objects (become ISO strings). Represent functions as
// nothing or an explicit name, undefined as a deliberate null or omission, and
// dates as ISO strings that a guard converts back into Date when needed.
```

The full path is now one habit: parse → guard → use, with an allowlist on the way back out.