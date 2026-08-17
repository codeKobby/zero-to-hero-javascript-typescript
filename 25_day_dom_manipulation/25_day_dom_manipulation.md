<div align="center">
  <h1>Day 25: DOM Manipulation</h1>
</div>

[<< Day 24](../24_day_dom_selection/24_day_dom_selection.md) | [Day 26 >>](../26_day_events_i/26_day_events_i.md)

---

## What You'll Learn

- Create, append, and remove elements
- Set attributes, classes, styles
- Work safely with `textContent` vs `innerHTML`

---

```js
const div = document.createElement('div')
div.textContent = 'Hello'
div.classList.add('card')
document.body.appendChild(div)

div.remove()  // remove from DOM
```

---

## Exercises

### Level 1

1. Create a `<p>` element and append it to `document.body`.
2. Toggle class `active` on a button.
3. Set a `data-id` attribute on an element.

### Level 2

1. Write `escapeHtml(str)` to safely set user content.
2. In TypeScript, write `createElement<K>(tag, attrs?, text?): HTMLElementTagNameMap[K]`.

### Level 3

1. Create a `DOMBuilder` class with a fluent API.

[<< Day 24](../24_day_dom_selection/24_day_dom_selection.md) | [Day 26 >>](../26_day_events_i/26_day_events_i.md)

🌕 **Day 25 Complete!**
