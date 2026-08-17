<div align="center">
  <h1>Day 35: API Integration — REST Patterns</h1>
</div>

[<< Day 34](../34_day_fetch_api/34_day_fetch_api.md) | [Day 36 >>](36_day_ts_types/36_day_ts_types.md)

---

## 🎯 Learning Objectives

- Build complete API integration patterns
- Handle loading states, pagination, and caching
- Use TypeScript with full API response typing
- Build an offline-capable data layer

---

## REST API Patterns

```ts
// Typed API client:
interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  perPage: number
  hasMore: boolean
}

class ApiClient {
  private baseUrl: string
  private token: string | null = null

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  setToken(token: string): void {
    this.token = token
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {})
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return response.json() as Promise<T>
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint)
  }

  async post<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body)
    })
  }
}

// Usage:
const api = new ApiClient('https://jsonplaceholder.typicode.com')
const users = await api.get<User[]>('/users')
```

---

## Local Data for Offline Use

This curriculum includes `data/countries_data.js` for offline exercises. Use local JSON files instead of remote APIs when possible:

```js
// Load local data instead of fetching:
import countries from '../data/countries_data.js'

// Or fetch local file:
const response = await fetch('./data/weather.json')
const data = await response.json()
```

---

## Exercises

### Level 1

1. Create an `ApiClient` class with typed `get` and `post` methods.
2. Load data from `https://jsonplaceholder.typicode.com/posts` and display it.
3. Add error handling for network failures.

### Level 2

1. Implement pagination for a list of posts.
2. Add a simple in-memory cache for repeated requests.
3. Create a TypeScript interface for the JSONPlaceholder API.

### Level 3

1. Build an offline-first data layer with localStorage fallback.
2. Implement request queuing for when the network is unavailable.
3. Create a mock API server using local JSON files.

---

[<< Day 34](../34_day_fetch_api/34_day_fetch_api.md) | [Day 36 >>](36_day_ts_types/36_day_ts_types.md)

🎉 **Day 35 Complete!**

🎉 **Progress**: 35/45 days complete
