<div align="center">
  <h1>Day 22: JSON</h1>
</div>

[<< Day 21](../21_day_modules/21_day_modules.md) | [Day 23 >>](../23_day_web_storage/23_day_web_storage.md)

---

## What You'll Learn

- Parse and stringify JSON safely
- Filter sensitive fields
- Type-safe JSON handling

---

```js
const json = '{"name":"Alice","age":25}'
const user = JSON.parse(json)

const text = JSON.stringify(user, null, 2)

// Filter fields:
JSON.stringify(user, ['name', 'age'], 2)
```

---

## Exercises

### Level 1

1. Parse a JSON string and log the `name` property.
2. Stringify an object with 2-space indentation.
3. Filter out `password` before stringifying.

### Level 2

1. Write `safeParse(text, fallback)` that returns fallback on error.
2. Create a TypeScript `ApiResponse<T>` type and parse with it.

### Level 3

1. Add a `toJSON()` method to a class.

[<< Day 21](../21_day_modules/21_day_modules.md) | [Day 23 >>](../23_day_web_storage/23_day_web_storage.md)

🌕 **Day 22 Complete!**
