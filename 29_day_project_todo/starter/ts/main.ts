export {}

// Day 29 — Project: Todo App — TypeScript Starter
// Build a Todo application using everything from Days 1-28

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

type FilterMode = 'all' | 'active' | 'completed'

interface AppState {
  todos: Todo[]
  filter: FilterMode
}

const state: AppState = {
  todos: [],
  filter: 'all'
}

function renderTodos(): void {
  console.log('Current todos:', state.todos)
}

function addTodo(text: string): void {
  // TODO
}

function toggleTodo(id: string): void {
  // TODO
}

function deleteTodo(id: string): void {
  // TODO
}

function saveToStorage(): void {
  localStorage.setItem('todos', JSON.stringify(state.todos))
}

function loadFromStorage(): void {
  const saved = localStorage.getItem('todos')
  if (saved) state.todos = JSON.parse(saved) as Todo[]
}

loadFromStorage()
renderTodos()
