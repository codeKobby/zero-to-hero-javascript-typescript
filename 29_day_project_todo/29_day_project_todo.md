<div align="center">
  <h1>Day 29: Project — Todo App</h1>
</div>

[<< Day 28](../28_day_functional_programming/28_day_functional_programming.md) | [Day 30 >>](30_day_project_weather/30_day_project_weather.md)

---

## 🎯 Project Goal

Build a fully functional **Todo application** using everything from Days 1-28. This project integrates: variables, functions, objects, arrays, DOM manipulation, events, closures, localStorage, and TypeScript.

---

## Requirements

### Core Features

1. Add new todos (with text input)
2. Toggle todo completion (checkbox)
3. Delete todos
4. Filter todos: All / Active / Completed
5. Persist todos in `localStorage`
6. Show item count ("3 items left")

### Architecture

```
starter/
├── js/
│   ├── main.js        # Your implementation
│   └── storage.js      # localStorage helper
├── ts/
│   ├── main.ts         # TypeScript implementation
│   └── storage.ts
├── index.html
└── style.css
```

### Data Model

```ts
// TypeScript types for your todo app:
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
```

### Starter HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todo App</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="app">
    <h1>Todos</h1>
    <form id="todo-form">
      <input type="text" id="todo-input" placeholder="What needs to be done?" autofocus>
      <button type="submit">Add</button>
    </form>

    <div class="filters">
      <button data-filter="all" class="active">All</button>
      <button data-filter="active">Active</button>
      <button data-filter="completed">Completed</button>
    </div>

    <ul id="todo-list"></ul>
    <p id="todo-count">0 items left</p>
  </div>

  <script type="module" src="starter/js/main.js"></script>
</body>
</html>
```

### Starter CSS

```css
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: system-ui; background: #f5f5f5; padding: 2rem; }
.app { max-width: 500px; margin: 0 auto; }
h1 { text-align: center; margin-bottom: 1rem; }
#todo-form { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
#todo-input { flex: 1; padding: 0.75rem; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; }
button { padding: 0.5rem 1rem; cursor: pointer; border: 1px solid #ddd; border-radius: 6px; background: white; }
.filters { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.filters button.active { background: #333; color: white; border-color: #333; }
#todo-list { list-style: none; }
#todo-list li { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-bottom: 1px solid #eee; }
#todo-list li.completed span { text-decoration: line-through; opacity: 0.5; }
#todo-count { color: #888; font-size: 0.9rem; margin-top: 1rem; }
```

---

## Suggested Implementation Steps

1. **HTML structure** — set up the form, list, filters
2. **State management** — `AppState` object with `todos` array
3. **Render function** — re-renders the entire list from state
4. **Add todo** — form submit → create todo → update state → re-render
5. **Toggle todo** — click checkbox → flip completed → save → re-render
6. **Delete todo** — click delete → remove from array → save → re-render
7. **Filter** — filter buttons change `filter` state → re-render filtered list
8. **localStorage** — save/load state on every change

---

## Exercises

### Level 1 — Minimum Viable App

Build a todo app that can add and display todos. Use `localStorage` to persist.

### Level 2 — Full Features

Add toggle, delete, filter, and item count. Use TypeScript with proper types.

### Level 3 — Advanced

Add: edit-on-double-click, drag-to-reorder, "clear completed" button, export/import JSON.

---

[<< Day 28](../28_day_functional_programming/28_day_functional_programming.md) | [Day 30 >>](30_day_project_weather/30_day_project_weather.md)

🎉 **Day 29 Complete!** You've built a real application integrating all previous concepts!

🎉 **Progress**: 29/45 days complete | Certificate: Full-Stack Ready — 1 day away!
