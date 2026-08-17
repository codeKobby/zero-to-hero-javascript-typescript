<div align="center">
  <h1>Day 24: DOM Selection</h1>
</div>

[<< Day 23](../23_day_web_storage/23_day_web_storage.md) | [Day 25 >>](../25_day_dom_manipulation/25_day_dom_manipulation.md)

---

## What You'll Learn

- Find elements with `getElementById`, `querySelector`, `querySelectorAll`
- Handle null safely with optional chaining

---

```js
const header = document.getElementById('header')
const input = document.querySelector('input[type="email"]')
const items = document.querySelectorAll('.item')

// Safe access:
header?.classList.add('active')
```

---

## Exercises

### Level 1

1. Select an element by ID and log its text content.
2. Select all `<p>` elements and log their count.
3. Use a CSS selector to find `input[type="checkbox"]`.

### Level 2

1. Write a typed `$<T>(selector): T` helper.
2. Use optional chaining to safely read nested properties.

### Level 3

1. Create a `waitForElement(selector)` that polls until found.

[<< Day 23](../23_day_web_storage/23_day_web_storage.md) | [Day 25 >>](../25_day_dom_manipulation/25_day_dom_manipulation.md)

🌕 **Day 24 Complete!**
