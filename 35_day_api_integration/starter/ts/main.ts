export {}

// Day 35 — API Integration — TypeScript Starter

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`)
    if (!response.ok) throw new Error(`API Error: ${response.status}`)
    return response.json() as Promise<T>
  }

  async post<T>(endpoint: string, body: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    return response.json() as Promise<T>
  }
}

interface Todo {
  id: number
  title: string
  completed: boolean
}

const api = new ApiClient('https://jsonplaceholder.typicode.com')
api.get<Todo[]>('/todos').then(todos => console.log(`Loaded ${todos.length} todos`))
