<div align="center">
  <h1>Day 33: Async/Await</h1>
</div>

[<< Day 32](../32_day_promises_ii/32_day_promises_ii.md) | [Day 34 >>](34_day_fetch_api/34_day_fetch_api.md)

---

## 🎯 Learning Objectives

- Write async functions with `async/await`
- Handle errors with try/catch in async functions
- Use `await` with Promises, arrays, and timing
- Apply top-level await and patterns

---

## JavaScript: async/await Basics

```js
// async function always returns a Promise:
async function greet() {
  return 'Hello'  // Automatically wraps in Promise.resolve()
}

greet().then(msg => console.log(msg))  // 'Hello'

// await pauses until a Promise resolves:
async function loadUser() {
  try {
    const response = await fetch('/api/user')
    const user = await response.json()
    console.log(user)
    return user
  } catch (error) {
    console.error('Failed:', error)
  }
}
```

### Sequential vs Parallel

```js
// ❌ Sequential — slow (3 seconds total):
async function loadSequential() {
  const users = await fetch('/api/users')      // 1 second
  const posts = await fetch('/api/posts')      // 1 second
  const comments = await fetch('/api/comments') // 1 second
}

// ✅ Parallel — fast (1 second total):
async function loadParallel() {
  const [users, posts, comments] = await Promise.all([
    fetch('/api/users'),
    fetch('/api/posts'),
    fetch('/api/comments')
  ])
}
```

### Top-level await (ES2022)

```js
// In ES modules, you can use await at the top level:
const response = await fetch('/api/config')
const config = await response.json()
export default config
```

### For...of with await

```js
// Sequential iteration with await:
async function processItems(urls) {
  for (const url of urls) {
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
  }
}

// If order doesn't matter, use Promise.all:
async function processAllItems(urls) {
  const results = await Promise.all(
    urls.map(async (url) => {
      const response = await fetch(url)
      return response.json()
    })
  )
  return results
}
```

---

## TypeScript: Typed async/await

```ts
// Typed async functions:
async function getUser(id: number): Promise<{ id: number; name: string }> {
  const response = await fetch(`/api/user/${id}`)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }
  return response.json() as Promise<{ id: number; name: string }>
}

// Error handling in TypeScript async:
async function safeGetUser(id: number): Promise<{ id: number; name: string } | null> {
  try {
    return await getUser(id)
  } catch (error) {
    console.error(error)
    return null
  }
}
```

---

## Exercises

### Level 1

1. Convert a Promise chain to `async/await`.
2. Use `async/await` with `try/catch` to handle a failed fetch.
3. Create an `async` function that waits 2 seconds then returns `"done"`.

### Level 2

1. Fetch data sequentially, then refactor to parallel.
2. Create a `sequentialFetch(urls)` function that processes URLs one by one.
3. Use top-level await to load a JSON file.

### Level 3

1. Create an `AsyncQueue` class with `enqueue(task)` and `process()`.
2. Implement `asyncMap(array, fn)` where `fn` is async.
3. Build a rate limiter: max N requests per second.

---

[<< Day 32](../32_day_promises_ii/32_day_promises_ii.md) | [Day 34 >>](34_day_fetch_api/34_day_fetch_api.md)

🎉 **Day 33 Complete!**

🎉 **Progress**: 33/45 days complete
