<div align="center">
  <h1>Day 32: Promises II — Promise.all, Promise.race</h1>
</div>

[<< Day 31](../31_day_promises_i/31_day_promises_i.md) | [Day 33 >>](33_day_async_await/33_day_async_await.md)

---

## 🎯 Learning Objectives

- Run Promises in parallel with `Promise.all`, `Promise.allSettled`
- Race Promises with `Promise.race`, `Promise.any`
- Use `AbortController` to cancel operations
- Handle errors in parallel operations

---

## Parallel Execution

```js
// Promise.all — all must succeed:
const promise1 = fetch('/api/users')
const promise2 = fetch('/api/posts')
const promise3 = fetch('/api/comments')

Promise.all([promise1, promise2, promise3])
  .then(([users, posts, comments]) => {
    console.log('All loaded:', users, posts, comments)
  })
  .catch(error => {
    // Fails if ANY one fails
    console.error('One failed:', error)
  })

// Promise.allSettled — never rejects, shows all results:
Promise.allSettled([promise1, promise2, promise3])
  .then(results => {
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`Promise ${index} succeeded:`, result.value)
      } else {
        console.log(`Promise ${index} failed:`, result.reason)
      }
    })
  })
```

## Racing Promises

```js
// Promise.race — first to resolve/reject wins:
const timeout = new Promise((_, reject) => {
  setTimeout(() => reject(new Error('Timeout!')), 3000)
})

const data = fetch('/api/slow-endpoint')

Promise.race([data, timeout])
  .then(response => console.log('Got data!'))
  .catch(error => console.error(error))  // 'Timeout!' if slow

// Promise.any — first to resolve wins (ignores rejections):
Promise.any([
  Promise.reject('fail1'),
  Promise.resolve('fast'),
  Promise.resolve('slow')
]).then(value => {
  console.log(value)  // 'fast'
})

// Promise.any with AggregateError if all reject:
Promise.any([
  Promise.reject('fail1'),
  Promise.reject('fail2')
]).catch(error => {
  console.log(error instanceof AggregateError)  // true
})
```

## AbortController

```js
// Cancel a fetch:
const controller = new AbortController()

fetch('/api/data', { signal: controller.signal })
  .then(res => res.json())
  .catch(err => {
    if (err.name === 'AbortError') {
      console.log('Request cancelled')
    }
  })

// Cancel after 5 seconds:
setTimeout(() => controller.abort(), 5000)
```

---

## TypeScript: Parallel Patterns

```ts
interface User { id: number; name: string }
interface Post { id: number; title: string; userId: number }

async function loadDashboard(userId: number) {
  // TypeScript knows each result type:
  const [user, posts, comments] = await Promise.all([
    fetchUser(userId),
    fetchPosts(userId),
    fetchComments(userId)
  ])  // [User, Post[], Comment[]] — tuple!

  return { user, posts, comments }
}

// Race with timeout:
async function fetchWithTimeout<T>(
  promise: Promise<T>,
  ms: number
): Promise<T> {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
  })
  return Promise.race([promise, timeout])
}
```

---

## Exercises

### Level 1

1. Use `Promise.all` to fetch two pieces of data simultaneously.
2. Use `Promise.race` with a 3-second timeout.
3. Use `Promise.allSettled` and log which succeeded/failed.

### Level 2

1. Create a `fetchMultiple(urls: string[])` function that fetches all URLs in parallel.
2. Implement a timeout wrapper for any Promise.
3. Use `AbortController` to cancel a fetch after 5 seconds.

### Level 3

1. Create a `fetchWithRetry(urls, retries)` that fetches in parallel and retries failed ones.
2. Build a priority queue where higher-priority fetches run first.
3. Implement `Promise.pool(promises, concurrency)` for limiting parallel operations.

---

[<< Day 31](../31_day_promises_i/31_day_promises_i.md) | [Day 33 >>](33_day_async_await/33_day_async_await.md)

🎉 **Day 32 Complete!**

🎉 **Progress**: 32/45 days complete
