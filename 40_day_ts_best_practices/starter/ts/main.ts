export {}

// Day 40 — TypeScript Best Practices — Starter
// Demonstrates project structure and best practices

// ✅ Type your API responses
interface ApiResponse<T> {
  data: T
  status: number
}

// ✅ Use discriminated unions for state
type LoadingState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: string }
  | { status: 'error'; message: string }

// ✅ Use type guards
function isSuccess(state: LoadingState): state is { status: 'success'; data: string } {
  return state.status === 'success'
}

// ✅ Use unknown over any
function safeProcess(value: unknown): string {
  if (typeof value === 'string') return value.toUpperCase()
  return String(value)
}

// ✅ Use readonly for immutable data
interface Config {
  readonly apiUrl: string
  readonly timeout: number
}

const config: Config = { apiUrl: 'https://api.example.com', timeout: 5000 }
// config.apiUrl = 'new'  // ❌ readonly

console.log(safeProcess('hello'))
console.log(config)
