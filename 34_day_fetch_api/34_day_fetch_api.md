<div align="center">
  <h1>Day 34: Fetch API</h1>
</div>

[<< Day 33](../33_day_async_await/33_day_async_await.md) | [Day 35 >>](35_day_api_integration/35_day_api_integration.md)

---

## 🎯 Learning Objectives

- Make HTTP requests with `fetch()`
- Handle different HTTP methods, headers, and bodies
- Parse JSON responses and handle errors
- Use TypeScript with typed API responses

---

## Fetch Basics

```js
// GET request:
const response = await fetch('https://jsonplaceholder.typicode.com/users')
const users = await response.json()
console.log(users)

// POST request:
const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ title: 'New Post', body: 'Content', userId: 1 })
})

const newPost = await response.json()
```

### Response handling

```js
const response = await fetch('/api/data')

// Check status:
if (!response.ok) {
  throw new Error(`HTTP error: ${response.status}`)
}

// Response types:
const text = await response.text()     // Plain text
const json = await response.json()     // JSON
const blob = await response.blob()     // Binary data
const formData = await response.formData()  // FormData
```

### Headers and options

```js
const response = await fetch('/api/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123',
    'X-Custom-Header': 'value'
  },
  body: JSON.stringify({ key: 'value' }),
  mode: 'cors',
  cache: 'no-cache'
})

// Read response headers:
const contentType = response.headers.get('Content-Type')
```

---

## TypeScript: Typed Fetch

```ts
// Generic typed fetch wrapper:
async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }
  return response.json() as Promise<T>
}

// Usage with interfaces:
interface User {
  id: number
  name: string
  email: string
}

const users = await apiFetch<User[]>('https://jsonplaceholder.typicode.com/users')
const firstUser = users[0]
console.log(firstUser.name)  // Fully typed!
```

---

## Exercises

### Level 1

1. Fetch data from `https://jsonplaceholder.typicode.com/todos` and log the first 5.
2. POST data to the same API with `title`, `body`, and `userId`.
3. Handle a 404 error gracefully.

### Level 2

1. Create a typed `ApiClient` class with `get<T>`, `post<T>`, `put<T>`, `delete<T>` methods.
2. Add request/response interceptors (logging, auth headers).
3. Implement retry logic for failed requests.

### Level 3

1. Create a caching fetch wrapper that caches responses in memory.
2. Build an offline-first fetch that falls back to localStorage.
3. Implement abort-on-unmount pattern (prepare for React).

---

[<< Day 33](../33_day_async_await/33_day_async_await.md) | [Day 35 >>](35_day_api_integration/35_day_api_integration.md)

🎉 **Day 34 Complete!**

🎉 **Progress**: 34/45 days complete
