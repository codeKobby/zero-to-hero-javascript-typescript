export {}

// Day 35 - TypeScript: a small API client with an offline transport
type Todo = { id: number; title: string; completed: boolean }
const payload = encodeURIComponent(JSON.stringify([
  { id: 1, title: 'Practice API boundaries', completed: false },
  { id: 2, title: 'Validate response data', completed: true }
]))

class ApiClient {
  private readonly cache = new Map<string, unknown>()

  constructor(private readonly baseUrl: string) {}

  async get(endpoint: string): Promise<unknown> {
    const cached = this.cache.get(endpoint)
    if (cached !== undefined) return cached
    const response = await fetch(this.baseUrl + endpoint)
    if (!response.ok) throw new Error('HTTP ' + response.status)
    const data: unknown = await response.json()
    this.cache.set(endpoint, data)
    return data
  }
}

function isTodo(value: unknown): value is Todo {
  return typeof value === 'object' &&
    value !== null &&
    'id' in value && typeof value.id === 'number' &&
    'title' in value && typeof value.title === 'string' &&
    'completed' in value && typeof value.completed === 'boolean'
}

async function run(): Promise<void> {
  const api = new ApiClient('data:application/json,' + payload)
  const value = await api.get('')
  if (!Array.isArray(value) || !value.every(isTodo)) {
    throw new Error('Response did not match Todo[]')
  }
  console.log('Loaded records:', value.length)
  console.log('First title:', value[0]?.title)
}

run().catch((error: unknown) => {
  if (error instanceof Error) console.error('API failure:', error.message)
})

// Try this, read the error, then restore the comment:
// const state: RequestState<Todo[]> = { status: 'loading' }
// console.log(state.data)
