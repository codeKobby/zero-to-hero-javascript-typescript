# Day 41 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. `JSON.parse` returns a plain object that only looks like a recipe; `isRecipe` checks each field at runtime before state accepts it.
2. A stored filtered list creates a second source of truth; deriving search from source state keeps one list authoritative.
3. A delete button needs an accessible name so assistive tech announces it, and a handler must not trust arbitrary dataset values — it should verify before acting.

## Level 2

The starter is a runnable create/read/search baseline. Add edit/delete/persistence milestones one at a time and record the evidence in your project README.

```ts
function loadRecipes(storage: Storage, key: string): Recipe[] {
  const raw: unknown = JSON.parse(storage.getItem(key) ?? '[]')
  if (Array.isArray(raw) && raw.every(isRecipe)) return raw
  return []
}
```

Persistence validates before returning. Delegated delete:

```ts
list.addEventListener('click', (event) => {
  const button = (event.target as HTMLElement).closest('button')
  if (!button || button.dataset.action !== 'delete') return
  const id = button.dataset.id
  if (typeof id !== 'string') return
  const index = recipes.findIndex((recipe) => recipe.id === id)
  if (index === -1) return
  recipes.splice(index, 1)
  render()
})
```

Search stays derived:

```ts
function render(): void {
  const query = searchInput.value.trim().toLowerCase()
  const visible = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(query) ||
    recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(query)))
  // ...render `visible` with textContent
}
```

## Level 3

1. `loadRecipes` returns `Recipe[]` only after every item passes `isRecipe`; malformed items are dropped so bad storage cannot poison state.
2. One delegated listener reads `dataset.action` and `dataset.id`, verifies them with guards, and dispatches to the right path.
3. The stored list stays the single source of truth; a debounced input handler just re-reads it.
4. Pure parse/filter/sort functions are testable with real values; a test proves behavior, while the compiler only proves declared structure.

A recipe app is a small domain model with DOM, storage, and form effects at the edges — validate at every boundary, derive search from source state, and render with `textContent` so the app stays testable and safe.