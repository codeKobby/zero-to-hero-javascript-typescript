<div align="center">
  <h1>Day 41: Project — Recipe Book</h1>
</div>

[<< Day 40](../40_day_ts_best_practices/40_day_ts_best_practices.md) | [Day 42 >>](42_day_project_forum/42_day_project_forum.md)

---

## 🎯 Project Goal

Build a **Recipe Book** — a full CRUD application with localStorage persistence and TypeScript types. This project integrates everything from Days 1-40.

---

## Features

1. **Browse** — View all recipes with images
2. **Add** — Create new recipes with form validation
3. **Edit** — Modify existing recipes
4. **Delete** — Remove recipes with confirmation
5. **Search** — Filter recipes by name or ingredient
6. **Persist** — Save to localStorage, load on startup

---

## Data Model

```ts
interface Recipe {
  id: string
  title: string
  description: string
  ingredients: string[]
  steps: string[]
  prepTime: number      // minutes
  cookTime: number      // minutes
  servings: number
  category: 'breakfast' | 'lunch' | 'dinner' | 'dessert'
  isFavorite: boolean
  createdAt: number     // timestamp
}

interface RecipeBookState {
  recipes: Recipe[]
  searchQuery: string
  filterCategory: string | null
  sortField: 'title' | 'createdAt' | 'prepTime'
  sortDirection: 'asc' | 'desc'
}
```

---

## Offline Resources

📁 Use `data/` folder for sample recipes JSON.

---

## Exercises

### Level 1 — Core CRUD

Build add, browse, edit, and delete with localStorage.

### Level 2 — Full Features

Add search, filter, sort, favorites, and TypeScript types.

### Level 3 — Advanced

Add recipe scaling (adjust servings), print view, import/export JSON, keyboard shortcuts.

---

🎉 **Day 41 Complete!**

🎉 **Progress**: 41/45 days complete
