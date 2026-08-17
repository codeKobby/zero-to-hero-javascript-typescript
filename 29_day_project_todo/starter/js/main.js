// Day 29 — Project: Todo App — Starter
// Build a Todo application using everything from Days 1-28
// Requirements: Add, toggle, delete, filter, localStorage persistence

var todoState = {
  todos: [],
  filter: 'all'
}

function renderTodos() {
  // TODO: Implement rendering logic
  console.log('Current todos:', todoState.todos)
}

function addTodo(text) {
  // TODO: Create a todo object and add to state
}

function toggleTodo(id) {
  // TODO: Toggle completed status
}

function deleteTodo(id) {
  // TODO: Remove from array
}

function setFilter(filter) {
  // TODO: Update filter and re-render
}

function saveToStorage() {
  localStorage.setItem('todos', JSON.stringify(todoState.todos))
}

function loadFromStorage() {
  var saved = localStorage.getItem('todos')
  if (saved) todoState.todos = JSON.parse(saved)
}

// Start
loadFromStorage()
renderTodos()
