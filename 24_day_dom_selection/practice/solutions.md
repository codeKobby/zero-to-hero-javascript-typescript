# Day 24 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. `getElementById` and `querySelector` can return `null`. `querySelectorAll` cannot.
2. `querySelectorAll` — it returns a `NodeList` that may be empty but is never `null`.
3. Optional chaining on a required element turns a miss into silent `undefined` — a wrongly spelled required selector fails without any signal.
4. A `NodeList` is a collection, not an array, but it supports `for...of` and `forEach`, so no conversion is needed.
5. An `HTMLInputElement` check is a runtime `instanceof` test that gives TypeScript evidence; an assertion only tells TypeScript to trust you.
6. An `instanceof` narrow is a runtime check plus type evidence; `as HTMLInputElement` asserts without proving anything and lies silently if the HTML changes.
7. Both starter pages render the output line; `npm run check` passes.

## Level 2

```ts
function requireElement(selector: string): Element {
  const element = document.querySelector(selector)
  if (element === null) {
    throw new Error('Required element not found: ' + selector)
  }
  return element
}

const title = requireElement('#page-title')
console.log(title.textContent)

const cards = document.querySelectorAll('.lesson-card')
console.log(cards.length)

const email = document.querySelector('input[type="email"]')
if (email instanceof HTMLInputElement) {
  console.log(email.value)
}
```

The required helper is intentionally strict. A page that needs a title cannot function correctly if the title selector is wrong, so an early clear error is better than a hidden failure.

## Level 3

```ts
// 1. The batch helper
function requireElements(selector: string): NodeListOf<Element> {
  const elements = document.querySelectorAll(selector)
  if (elements.length === 0) {
    throw new Error('Required elements not found: ' + selector)
  }
  return elements
}
// Throw when an empty group means the page is broken (e.g. a checkout list);
// log and continue when the group is legitimately optional (e.g. notifications).

// 2. The all-or-nothing loader
function requireAll(selectors: string[]): Element[] {
  const missing = selectors.filter(
    (selector) => document.querySelector(selector) === null
  )

  if (missing.length > 0) {
    throw new Error('Required elements not found: ' + missing.join(', '))
  }

  return selectors.map((selector) => document.querySelector(selector)!)
}
// One pass, one error naming every missing selector, so a page with three
// broken selectors fails with one clear message instead of the first crash.

// 3. The data-attribute contract
const actions = document.querySelectorAll('[data-action]')
for (const action of actions) {
  console.log(action.getAttribute('data-action'))
}
// [data-action] survives class renames and CSS refactors, because it names the
// element's role, not its appearance or position in the tree.

// 4. The DOM memo
// getElementById   -> Element | null   (one element or a miss)
// querySelector    -> Element | null   (first match or a miss)
// querySelectorAll -> NodeList         (a possibly-empty collection, never null)
```

Selecting is now one deliberate decision: which question, and what happens on a miss.