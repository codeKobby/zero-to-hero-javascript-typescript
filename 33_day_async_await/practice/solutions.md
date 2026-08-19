# Day 33 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. An async function always returns a Promise; a plain return value becomes fulfillment.
2. `await` pauses only that function's continuation; other functions and events keep running.
3. When the second operation needs the first result — the dependency makes them sequential.
4. Independent operations still run sequentially if awaited one after another; `Promise.all` starts them together.

## Level 2

```ts
type User = { id: number; name: string }

function getUser(id: number): Promise<User> {
  return Promise.resolve({ id, name: 'User ' + id })
}

// 1. Promise chain converted to async/await
async function loadUserName(): Promise<string> {
  const user = await getUser(1)
  return user.name
}

// 2. safeLoad returns a value or null on failure
async function safeLoad<T>(operation: Promise<T>): Promise<T | null> {
  try {
    return await operation
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message)
    return null
  }
}

// 3. Sequential vs parallel
const first = await getUser(1)
const second = await getUser(first.id + 1) // depends on first

const parallel = await Promise.all([getUser(2), getUser(3)])
```

`safeLoad` exposes failure in its return type. The caller must handle `null` instead of assuming every operation succeeds.

## Level 3

```ts
// 1. The safe-load generic
const maybeUser = await safeLoad(getUser(1))
if (maybeUser) console.log('Loaded:', maybeUser.name)
// Promise<T | null> tells the caller that failure is a normal return value,
// not a thrown error the caller has to catch separately.

// 2. The sequential-because
async function postsForUser(): Promise<string[]> {
  const user = await getUser(1)
  return user ? [] : []
}
// The posts need the user's id first, so the second await cannot start
// until the first resolves — that dependency forces a sequential policy.

// 3. The parallel-map
const ids = [1, 2, 3]
const users = await Promise.all(ids.map((id) => getUser(id)))
console.log(users.map((user) => user.name))
// Every getUser starts before the first await; the results arrive in input
// order because Promise.all maps by index, not completion order.

// 4. The double-wrap
async function a(): Promise<string> {
  return await Promise.resolve('same')
}
async function b(): Promise<string> {
  return Promise.resolve('same')
}
// Both fulfill with the same string. return await and return differ only
// when the awaited promise rejects before the async function's own try/catch.
```

Async and await is now Promise syntax that reads sequentially — an async function always returns a `Promise<T>`, each `await` unwraps one promise, and independent operations still need `Promise.all` to run in parallel.