<div align="center">
  <h1>Day 18: Error Handling</h1>
</div>

[<< Day 17](../17_day_regex/17_day_regex.md) | [Day 19 >>](../19_day_classes_i/19_day_classes_i.md)

---

## What You'll Learn

- `try`/`catch`/`finally` for error handling
- Custom error classes
- Safe patterns for risky operations

---

```js
try {
  const data = JSON.parse('invalid json')
} catch (error) {
  console.error(error.message)
} finally {
  console.log('Always runs')
}

// Custom error:
class ValidationError extends Error {
  constructor(message, field) {
    super(message)
    this.field = field
  }
}
```

---

## Exercises

### Level 1

1. Wrap `JSON.parse('{bad}')` in try/catch.
2. Create a `tryParseInt(str)` that returns `null` on failure.
3. Write a `validateAge(age)` that throws on invalid input.

### Level 2

1. Create a `ValidationError` class with a `field` property.
2. In TypeScript, write a `safeParse<T>(json: string): T | null` function.

### Level 3

1. Implement a `retry(fn, retries)` that retries failed operations.

<details>
<summary>🔍 View Solutions</summary>

```ts
async function retry<T>(fn: () => Promise<T>, retries: number): Promise<T> {
  try {
    return await fn()
  } catch (e) {
    if (retries <= 0) throw e
    return retry(fn, retries - 1)
  }
}
```
</details>

---

[<< Day 17](../17_day_regex/17_day_regex.md) | [Day 19 >>](../19_day_classes_i/19_day_classes_i.md)

🌕 **Day 18 Complete!**
