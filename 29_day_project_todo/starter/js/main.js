// Day 29 - JavaScript: a small, working todo baseline
const state = { todos: [], filter: 'all' }
const form = document.querySelector('#todo-form')
const input = document.querySelector('#todo-input')
const list = document.querySelector('#todo-list')
const count = document.querySelector('#todo-count')

if (!(form instanceof HTMLFormElement) ||
    !(input instanceof HTMLInputElement) ||
    !(list instanceof HTMLUListElement) ||
    !(count instanceof HTMLElement)) {
  throw new Error('Todo starter HTML is incomplete.')
}

function isTodo(value) {
  return typeof value === 'object' &&
    value !== null &&
    typeof value.id === 'string' &&
    typeof value.text === 'string' &&
    typeof value.completed === 'boolean' &&
    typeof value.createdAt === 'number'
}

function visibleTodos() {
  if (state.filter === 'active') return state.todos.filter((todo) => !todo.completed)
  if (state.filter === 'completed') return state.todos.filter((todo) => todo.completed)
  return state.todos
}

function save() {
  try {
    localStorage.setItem('day29-todos', JSON.stringify(state.todos))
  } catch {
    // The app remains usable when storage is blocked.
  }
}

function load() {
  try {
    const raw = localStorage.getItem('day29-todos')
    if (raw === null) return
    const value = JSON.parse(raw)
    if (Array.isArray(value) && value.every(isTodo)) state.todos = value
  } catch {
    state.todos = []
  }
}

function render() {
  list.replaceChildren()
  for (const todo of visibleTodos()) {
    const item = document.createElement('li')
    item.dataset.id = todo.id
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = todo.completed
    checkbox.setAttribute('aria-label', 'Complete ' + todo.text)
    const label = document.createElement('span')
    label.textContent = todo.text
    const remove = document.createElement('button')
    remove.type = 'button'
    remove.dataset.action = 'delete'
    remove.textContent = 'Delete'
    item.append(checkbox, label, remove)
    list.append(item)
  }
  const remaining = state.todos.filter((todo) => !todo.completed).length
  count.textContent = remaining + ' item' + (remaining === 1 ? '' : 's') + ' left'
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const text = input.value.trim()
  if (text === '') return
  state.todos = [...state.todos, {
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAt: Date.now()
  }]
  input.value = ''
  save()
  render()
  input.focus()
})

list.addEventListener('change', (event) => {
  if (!(event.target instanceof HTMLInputElement)) return
  const item = event.target.closest('li')
  const id = item?.dataset.id
  if (id === undefined) return
  state.todos = state.todos.map((todo) =>
    todo.id === id ? { ...todo, completed: event.target.checked } : todo)
  save()
  render()
})

list.addEventListener('click', (event) => {
  if (!(event.target instanceof HTMLButtonElement)) return
  const item = event.target.closest('li')
  const id = item?.dataset.id
  if (id === undefined) return
  state.todos = state.todos.filter((todo) => todo.id !== id)
  save()
  render()
})

load()
render()
