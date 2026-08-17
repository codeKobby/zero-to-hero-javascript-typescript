<div align="center">
  <h1>Day 14: Strings & Template Literals</h1>
</div>

[<< Day 13](../13_day_hof_ii/13_day_hof_ii.md) | [Day 15 >>](../15_day_numbers/15_day_numbers.md)

---

## What You'll Learn

- Template literals for clean string building
- `slice`, `split`, `at`, `padStart`, `includes`
- TypeScript template literal types

---

## Template Literals

```js
const name = 'Alice'
const age = 25
console.log(`${name} is ${age} years old`)

// Multi-line:
const html = `
  <div>
    <h1>${name}</h1>
  </div>
`
```

## Key Methods

```js
const str = 'Hello, World!'
str.slice(0, 5)      // 'Hello'
str.at(-1)            // '!'
str.split(', ')       // ['Hello', 'World!']
str.includes('World') // true
'5'.padStart(3, '0') // '005'
```

---

## Exercises

### Level 1

1. Create a greeting using template literals: `"Hello, Alice! You are 25."`
2. Extract `"World"` from `"Hello, World!"` using `slice()`.
3. Split `"apple,banana,cherry"` into an array.

### Level 2

1. Write a `truncate(str, maxLength)` function that adds `"..."` if needed.
2. In TypeScript, create a template literal type: `` type Name = `${string} ${string}` ``

### Level 3

1. Write a tagged template function that escapes HTML characters.

<details>
<summary>🔍 View Solutions</summary>

```ts
// Level 2:
function truncate(str: string, max: number): string {
  return str.length <= max ? str : str.slice(0, max - 3) + '...'
}

// Level 3:
function escapeHtml(strings: TemplateStringsArray, ...values: unknown[]): string {
  return strings.reduce((result, str, i) => {
    const val = values[i] !== undefined
      ? String(values[i]).replace(/[&<>"']/g, c => ({
          '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        })[c])
      : ''
    return result + str + val
  }, '')
}
```
</details>

---

[<< Day 13](../13_day_hof_ii/13_day_hof_ii.md) | [Day 15 >>](../15_day_numbers/15_day_numbers.md)

🌕 **Day 14 Complete!**
