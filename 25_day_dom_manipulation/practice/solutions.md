# Day 25 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. A created element is invisible until it is appended to a node already in the document.
2. `textContent` treats a value as text; `innerHTML` parses it as markup, so user input could become executable HTML (XSS).
3. `input.value` is the live, JavaScript-facing value; `getAttribute('value')` is the original markup attribute and misses what the user has typed.
4. `classList` operates on the class set; `toggle` adds or removes one class while the others stay.
5. It returns an unattached `HTMLLIElement` that is invisible until appended.
6. Both starter pages render the output line; `npm run check` passes.

## Level 2

```ts
function addPriorityTask(list: HTMLUListElement, label: string): HTMLLIElement {
  const item = document.createElement('li')
  item.textContent = label
  item.dataset.priority = 'high'
  item.classList.add('task', 'priority-high')
  list.append(item)
  return item
}

const task = addPriorityTask(list, 'Submit practice work')
task.classList.toggle('is-complete')
task.remove()
```

The task text is assigned with `textContent`, so it remains text even if the label contains characters that HTML would otherwise parse.

## Level 3

```ts
// 1. The builder
function createTaskItem(label: string, status: string): HTMLLIElement {
  const item = document.createElement('li')
  item.textContent = label
  item.dataset.status = status
  return item
}

function appendTask(list: HTMLUListElement, item: HTMLLIElement): void {
  list.append(item)
}
// Build and attach are separate, so the configured element can be inspected
// and tested before it ever touches the document.

// 2. The status badge
function setBadge(item: HTMLLIElement, status: 'open' | 'done'): void {
  item.classList.toggle('is-open', status === 'open')
  item.classList.toggle('is-done', status === 'done')
  item.dataset.status = status
}
// The visible class and the data marker change together; the label text is
// never part of the swap.

// 3. The safe text audit
// User text (input.value), stored text (localStorage), and API responses are
// untrusted. They must always be assigned via textContent, never innerHTML:
//   - list labels, messages, and titles
//   - anything echoed back from form input
//   - cached or fetched descriptions
// innerHTML is only acceptable for trusted, reviewed markup, and even then a
// sanitization strategy is required before it is rendered.

// 4. The counter
let clickCount = 0

function incrementCounter(output: HTMLElement, by: number): void {
  clickCount += by
  output.textContent = String(clickCount)
}
// The memory value is the source of truth; the DOM text is a rendering of it.
// Re-reading the text would invite parsing and stale-value bugs.
```

The mutation path is now one habit: build in memory, safe text, configured classes and data, attach, remove only what you own — and create the element type that actually owns the properties you need.