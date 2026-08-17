<div align="center">
  <h1>Day 23: Web Storage</h1>
</div>

[<< Day 22](../22_day_json/22_day_json.md) | [Day 24 >>](../24_day_dom_selection/24_day_dom_selection.md)

---

## What You'll Learn

- Store data with `localStorage` and `sessionStorage`
- Serialize objects with JSON
- Handle storage errors

---

```js
localStorage.setItem('user', JSON.stringify({ name: 'Alice' }))
const user = JSON.parse(localStorage.getItem('user'))
localStorage.removeItem('user')
localStorage.clear()
```

---

## Exercises

### Level 1

1. Store and retrieve a user object.
2. Create a wrapper `storageSet(key, value)` and `storageGet(key, fallback)`.

### Level 2

1. Add TTL support: `setWithExpiry(key, value, ms)`.
2. In TypeScript, create a `TypedStorage<T>` class.

### Level 3

1. Build a preferences manager that persists UI state.

[<< Day 22](../22_day_json/22_day_json.md) | [Day 24 >>](../24_day_dom_selection/24_day_dom_selection.md)

🌕 **Day 23 Complete!**
