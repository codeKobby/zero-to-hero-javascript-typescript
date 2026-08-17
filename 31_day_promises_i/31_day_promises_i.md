<div align="center">
  <h1>Day 31: Promises I — Creating & Chaining</h1>
</div>

[<< Day 30](../30_day_project_weather/30_day_project_weather.md) | [Day 32 >>](32_day_promises_ii/32_day_promises_ii.md)

---

## 🎯 Learning Objectives

- Understand the three Promise states: pending, fulfilled, rejected
- Create Promises with `new Promise()`
- Chain `.then()` and `.catch()` calls
- Handle Promise errors properly

---

## JavaScript: Promises

### Promise states

```
         ┌──────────┐
         │ Pending  │  (initial state)
         └────┬─────┘
              │
     ┌────────┴────────┐
     ↓                 ↓
┌──────────┐     ┌──────────┐
│Fulfilled │     │ Rejected │
│ (.then)  │     │ (.catch) │
└──────────┘     └──────────┘
```

### Creating a Promise

```js
const myPromise = new Promise((resolve, reject) => {
  const success = Math.random() > 0.5

  setTimeout(() => {
    if (success) {
      resolve('Data loaded!')
    } else {
      reject(new Error('Failed to load'))
    }
  }, 1000)
})

// Consuming a Promise:
myPromise
  .then(data => console.log(data))
  .catch(error => console.error(error))
  .finally(() => console.log('Done'))
```

### Promise chaining

```js
// Each .then() returns a new Promise:
fetch('/api/user/1')
  .then(response => response.json())       // returns new Promise<user>
  .then(user => fetch(`/api/posts/${user.id}`)) // returns new Promise<posts>
  .then(response => response.json())
  .then(posts => console.log(posts))
  .catch(err => console.error('Error in chain:', err))
```

### Real-world example: sequential async operations

```js
function getUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: 'Alice', email: 'alice@test.com' })
    }, 500)
  })
}

function getPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'First post', userId },
        { id: 2, title: 'Second post', userId }
      ])
    }, 500)
  })
}

// Sequential — one after another:
getUser(1)
  .then(user => {
    console.log('User:', user.name)
    return getPosts(user.id)   // Chain the next async call
  })
  .then(posts => {
    console.log('Posts:', posts.length)
  })
  .catch(err => console.error(err))
```

---

## TypeScript: Typed Promises

```ts
// Promise<T> — T is the resolved type:
function getUser(id: number): Promise<{ id: number; name: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: 'Alice' })
    }, 500)
  })
}

// Chain with types:
getUser(1)
  .then(user => {
    console.log(user.name)  // TypeScript knows user is { id: number; name: string }
    return getPosts(user.id)
  })
  .then(posts => {
    posts.forEach(post => console.log(post.title))
  })
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.error(error.message)
    }
  })
```

---

## Exercises

### Level 1

1. Create a Promise that resolves with `"Hello"` after 1 second.
2. Create a Promise that rejects with an error.
3. Chain two `.then()` calls on a Promise.

### Level 2

1. Create a `delay(ms)` utility that returns a Promise resolving after `ms` milliseconds.
2. Chain sequential operations: `getUser → getPosts → getComments`.
3. Handle errors in a chain with a single `.catch()`.

### Level 3

1. Implement a `retryPromise(promiseFn, retries)` that retries failed Promises.
2. Create a `PromiseQueue` that runs Promises sequentially (one at a time).
3. Type a `pipe` function that chains Promises.

---

[<< Day 30](../30_day_project_weather/30_day_project_weather.md) | [Day 32 >>](32_day_promises_ii/32_day_promises_ii.md)

🎉 **Day 31 Complete!**

🎉 **Progress**: 31/45 days complete
