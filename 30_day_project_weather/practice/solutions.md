# Day 30 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. During loading the previous success text would still claim a current result; the status line must override it until the new result settles.
2. The latest search reassigns `state` before rendering, so the newest query owns the UI even if an older Promise settles later.
3. A parsed value can be any shape; only an array of strings is accepted as favorites.
4. A key in browser source or a committed `.env` file is publicly readable and can be used by anyone.
5. Mock data exercises the happy path only; the failure and empty states are real UI paths that must be shown to work.
6. Both pages show loading, a known city, an unknown-city error, favorites, and refresh restoration; `npm run check` passes.

## Level 2

```ts
let lastQuery = ''

async function search(city: string): Promise<void> {
  const query = city.trim()
  if (query === '') return
  lastQuery = query
  state.status = 'loading'
  render(ui.status, ui.result, ui.favorites)
  try {
    state.current = await getWeather(query)
    state.status = 'success'
  } catch {
    state.current = null
    state.status = 'error'
  }
  render(ui.status, ui.result, ui.favorites)
}

// 1. Retry button re-runs the last failed query
function retry(): void {
  if (lastQuery !== '') void search(lastQuery)
}
// <button type="button" id="retry">Retry</button>

// 2. Alphabetical favorites without mutating the stored array
function sortedFavorites(): string[] {
  return [...state.favorites].sort()
}
// render() iterates sortedFavorites() while state.favorites stays in insertion order.

// 3. Async helper with the same boundary
async function getWeather(city: string): Promise<Weather> {
  const match = records.find((record) => record.city.toLowerCase() === city.toLowerCase())
  if (match === undefined) throw new Error('City not found in the offline demo.')
  return match
}
// Swapping the body for fetch keeps the signature; only the parse-and-guard
// step would change, and the render would not move.

// 4. Last-successful-search persistence
function saveLast(query: string): void {
  try { localStorage.setItem('day30-last', query) } catch {}
}

function restoreLast(): void {
  const saved = localStorage.getItem('day30-last')
  if (saved !== null) void search(saved)
}
```

## Level 3

```ts
// 1. The stale-result guard
let searchId = 0

async function search(city: string): Promise<void> {
  const query = city.trim()
  if (query === '') return
  const id = ++searchId
  state.status = 'loading'
  render(ui.status, ui.result, ui.favorites)
  try {
    const weather = await getWeather(query)
    if (id !== searchId) return // a newer search owns the UI
    state.current = weather
    state.status = 'success'
  } catch {
    if (id !== searchId) return
    state.current = null
    state.status = 'error'
  }
  render(ui.status, ui.result, ui.favorites)
}
// Whether the first or the last Promise wins is a runtime timing decision;
// TypeScript cannot decide it, so the guard lives in the async flow.

// 2. The validated fetch
function isWeather(value: unknown): value is Weather {
  return typeof value === 'object' &&
    value !== null &&
    'city' in value && typeof value.city === 'string' &&
    'temperature' in value && typeof value.temperature === 'number' &&
    'humidity' in value && typeof value.humidity === 'number' &&
    'condition' in value && typeof value.condition === 'string'
}
// With a real fetch: const data: unknown = await response.json();
// then assign only after isWeather(data). The guard replaces the mock's trust.

// 3. The idle empty state
function render(ui: { status: HTMLElement; result: HTMLElement; favorites: HTMLElement }): void {
  ui.status.textContent =
    state.status === 'loading' ? 'Loading...' :
    state.status === 'error' ? 'Could not load that city.' :
    state.status === 'idle' ? 'Search for a city to see the weather.' : ''
  ui.result.replaceChildren()
  // ...existing result rendering...
}
// The hint comes from status === 'idle', so the empty state is driven by
// state, not by a separate markup branch that could drift.

// 4. The failure log
type DashboardState = {
  current: Weather | null
  favorites: string[]
  status: 'idle' | 'loading' | 'success' | 'error'
  errorMessage: string
}
// catch (error) { state.current = null; state.status = 'error';
//   state.errorMessage = error instanceof Error ? error.message : 'Unknown error' }
// The render shows errorMessage distinctly. A server-supplied message must
// be treated as untrusted text and assigned with textContent.
```

The weather dashboard now holds its boundary: a Promise feeds a state machine, the render guards `current`, and favorites survive refresh with validation.