# Day 31 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. The executor function runs immediately; `resolve` and `reject` are the settlement callbacks it can call later.
2. A `then` callback receives the fulfillment value; a `catch` callback receives the rejection reason.
3. The next `then` receives `undefined`, because the chain continues with whatever the previous callback returned.
4. The callback is scheduled after the current synchronous code, so the event loop keeps running while the promise is pending.
5. Once fulfilled or rejected, the promise is settled and cannot change to the other outcome.

## Level 2

```ts
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

type User = { id: number; nextLesson: string }

function getUser(id: number): Promise<User> {
  return Promise.resolve({ id, nextLesson: 'Promises' })
}

getUser(1)
  .then((user) => user.nextLesson)
  .then((lesson) => console.log(lesson))
  .catch((error: unknown) => {
    if (error instanceof Error) console.error(error.message)
  })
```

Each `then` creates a new Promise. Returning the lesson string fulfills that next Promise with a string.

## Level 3

```ts
// 1. The always-finally
const ok = Promise.resolve('done')
const fail = Promise.reject(new Error('boom'))

ok.finally(() => console.log('cleanup ran for ok'))
fail.finally(() => console.log('cleanup ran for fail'))
// finally runs on either outcome and receives no value.

// 2. The string-to-number
const counter: Promise<number> = new Promise((resolve) => resolve(3))
// The runtime value must match Promise<number>: resolving '3' as text
// breaks the contract, so the number is resolved as a number.

// 3. The forgotten return
getUser(1)
  .then((user) => {
    getUser(user.id + 1) // not returned
  })
  .then((value) => console.log('Next step received:', value))
// The chain still compiles because the second then accepts anything;
// only runtime reveals the missing return passes undefined.

// 4. The settle-once
const once = new Promise((resolve) => {
  resolve('first')
  resolve('second')
})
once.then((value) => console.log(value)) // 'first'
// Only the first settlement wins; later calls are ignored.
```

One future result is now a settled promise — consumed with `then`/`catch`/`finally`, chained by returning the next operation, and typed with `Promise<T>`.