<div align="center">
  <h1>Day 27: Events II — Delegation, Forms, Keyboard</h1>
</div>

[<< Day 26](../26_day_events_i/26_day_events_i.md) | [Day 28 >>](../28_day_functional_programming/28_day_functional_programming.md)

---

## 🌐 This Lesson Runs in the Browser

**Use Live Server:**
1. Right-click `27_day_events_ii/starter/index.html`
2. Select **Open with Live Server**
3. Browser opens at `http://localhost:5500` — auto-reloads on save!

> **Need Live Server?** See [`VS_CODE_SETUP.md`](../VS_CODE_SETUP.md)

---

## What You'll Learn

- Event delegation for dynamic lists
- Form handling with `FormData`
- Keyboard shortcuts
- Custom events

---

```js
// Event delegation:
list.addEventListener('click', (e) => {
  const item = e.target.closest('.todo-item')
  if (!item) return
  // handle item
})

// FormData:
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(form))
})

// Keyboard:
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault()
    save()
  }
})

// Custom event:
el.dispatchEvent(new CustomEvent('item-added', { detail: { id: 1 }, bubbles: true }))
```

---

## Exercises

### Level 1

1. Use delegation to handle clicks on list items.
2. Log form data on submit.
3. Add `Escape` key handler.

### Level 2

1. Build inline-editable list (click to edit, Enter to save, Escape to cancel).
2. In TypeScript, write a typed `FormValidator`.

### Level 3

1. Create a typed `EventEmitter<Events>`.

---

**Stuck?** Check [`TROUBLESHOOTING.md`](../TROUBLESHOOTING.md)

[<< Day 26](../26_day_events_i/26_day_events_i.md) | [Day 28 >>](../28_day_functional_programming/28_day_functional_programming.md)

🌕 **Day 27 Complete!**