# Day 29 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. The stored value must be trusted only after every property passes a runtime check; a partially shaped object would crash the render.
2. `textContent` assigns plain text; `innerHTML` parses markup, so user text can inject elements.
3. Filters describe the current view of one source of truth; storing a second array duplicates state and lets the two drift apart.
4. `JSON.parse` throws on malformed text and can return the wrong shape; the catch covers the throw, the shape check covers the value.
5. Persistence is a promise only if the app restores correctly after a reload; the refresh test proves it.
6. Both pages add, toggle, delete, and persist; refresh restores state; `npm run check` passes.

## Level 2

```ts
// 1. Edit action routed through the delegated click handler
list.addEventListener('click', (event: MouseEvent) => {
  if (!(event.target instanceof HTMLButtonElement)) return
  const item = event.target.closest('li')
  const id = item?.dataset.id
  if (id === undefined) return

  const action = event.target.dataset.action
  if (action === 'delete') {
    state.todos = state.todos.filter((todo) => todo.id !== id)
  } else if (action === 'edit') {
    state.todos = state.todos.map((todo) =>
      todo.id === id ? { ...todo, text: prompt('Edit task', todo.text) ?? todo.text } : todo)
  }
  save()
  render(list, count)
})
// <button type="button" data-action="edit">Edit</button>
// One listener handles both actions; the action marker names the role in markup.

// 2. Filter row without duplicating todo data
function setFilter(filter: Filter): void {
  state.filter = filter
  render(list, count)
}

function visibleTodos(): Todo[] {
  if (state.filter === 'active') return state.todos.filter((todo) => !todo.completed)
  if (state.filter === 'completed') return state.todos.filter((todo) => todo.completed)
  return state.todos
}

// 3. Versioned storage with migration
const STORAGE_KEY = 'day29-todos-v2'

function load(): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) {
      migrateFromV1()
      return
    }
    const value: unknown = JSON.parse(raw)
    if (Array.isArray(value) && value.every(isTodo)) state.todos = value
  } catch {
    state.todos = []
  }
}
// The key version lets an old array be migrated once instead of being read forever.

// 4. Optional note field, honest predicate
type Todo = { id: string; text: string; completed: boolean; createdAt: number; note?: string }

function isTodo(value: unknown): value is Todo {
  return typeof value === 'object' &&
    value !== null &&
    'id' in value && typeof value.id === 'string' &&
    'text' in value && typeof value.text === 'string' &&
    'completed' in value && typeof value.completed === 'boolean' &&
    'createdAt' in value && typeof value.createdAt === 'number' &&
    (!('note' in value) || typeof value.note === 'string')
}
```

## Level 3

```ts
// 1. The undo trail
const history: Todo[][] = []

function commit(state: { todos: Todo[] }): void {
  history.push([...state.todos]) // copies, so the snapshot cannot change with state
  if (history.length > 3) history.shift()
}

function undo(): void {
  const previous = history.pop()
  if (previous) {
    state.todos = previous
    save()
    render(list, count)
  }
}
// Snapshots must be copies: storing the array reference would show future changes.

// 2. The testable core
function addTodo(state: { todos: Todo[] }, text: string): Todo[] {
  const trimmed = text.trim()
  if (trimmed === '') return state.todos
  return [...state.todos, { id: crypto.randomUUID(), text: trimmed, completed: false, createdAt: Date.now() }]
}

function toggleTodo(state: { todos: Todo[] }, id: string): Todo[] {
  return state.todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
}

function deleteTodo(state: { todos: Todo[] }, id: string): Todo[] {
  return state.todos.filter((todo) => todo.id !== id)
}
// Each function takes state and returns new state, so the same logic drives
// the DOM page and any Node test without touching the browser.

// 3. The empty state
function render(list: HTMLUListElement, count: HTMLElement): void {
  list.replaceChildren()
  const visible = visibleTodos()
  if (visible.length === 0) {
    const empty = document.createElement('li')
    const heading = document.createElement('h2')
    heading.textContent = 'Nothing here yet'
    const message = document.createElement('p')
    message.textContent = 'Add a task above to get started.'
    empty.append(heading, message)
    list.append(empty)
    return
  }
  // ...existing item rendering...
}
// The empty state is data-driven: it appears whenever the derived view is empty.

// 4. The health check
// - Injection: todo text is assigned with textContent, never innerHTML.
// - Duplicated filter state: visibleTodos derives from state.todos.
// - Unvalidated JSON: load() catches and runs every(isTodo) before accepting.
// - Refresh: persistence is only trusted after a reload restores the same todos.
```

The todo loop now holds together — validated input into typed todos, one source of truth, derived views, `textContent` rendering, and a guarded persistence boundary.