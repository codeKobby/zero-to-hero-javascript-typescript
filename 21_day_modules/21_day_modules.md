<div align="center">
  <h1>Day 21: Modules</h1>
</div>

[<< Day 20](../20_day_classes_ii/20_day_classes_ii.md) | [Day 22 >>](../22_day_json/22_day_json.md)

---

## What You'll Learn

- `import` and `export` for organizing code
- Default vs named exports
- Dynamic imports

---

```js
// math.js — export
export const PI = 3.14159
export function add(a, b) { return a + b }
export default class Calculator { ... }

// main.js — import
import Calculator, { PI, add } from './math.js'
import * as Math from './math.js'
```

---

## Exercises

### Level 1

1. Create a module that exports `add`, `subtract`, `multiply`.
2. Import and use them in another file.
3. Create a barrel file (`index.js`) that re-exports from multiple modules.

### Level 2

1. In TypeScript, create typed modules for `User`, `Product`, `Order`.
2. Use dynamic `import()` to lazily load a module.

### Level 3

1. Build a plugin system using dynamic imports.

[<< Day 20](../20_day_classes_ii/20_day_classes_ii.md) | [Day 22 >>](../22_day_json/22_day_json.md)

🌕 **Day 21 Complete!**
