<div align="center">
  <h1>Day 40: TypeScript Best Practices & Project Setup</h1>
</div>

[<< Day 39](../39_day_ts_advanced_types/39_day_ts_advanced_types.md) | [Day 41 >>](41_day_project_recipe/41_day_project_recipe.md)

---

## 🎯 Learning Objectives

- Configure `tsconfig.json` for different environments
- Apply TypeScript best practices in real projects
- Debug TypeScript effectively
- Structure a TypeScript project for maintainability

---

## tsconfig.json Best Practices

```json
{
  "compilerOptions": {
    // Strict mode — enable ALL:
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,

    // Output:
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "outDir": "./dist",
    "rootDir": "./src",

    // Types:
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,

    // Paths:
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },

    // Libs:
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

## Project Structure

```
project/
├── src/
│   ├── index.ts          # Entry point
│   ├── types/
│   │   ├── user.ts       # User-related types
│   │   └── index.ts      # Barrel file
│   ├── utils/
│   │   ├── storage.ts    # Utility functions
│   │   └── index.ts
│   └── services/
│       ├── api.ts        # API client
│       └── index.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Debugging TypeScript

1. **Source maps** — enable `sourceMap: true` to debug `.ts` in browser
2. **VS Code debugging** — use `launch.json` with `node` or `chrome`
3. **TypeScript errors** — read them top-down; the first error is usually the root cause
4. **`tsc --noEmit`** — check types without emitting files

```json
// VS Code launch.json:
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Run TypeScript",
      "type": "node",
      "request": "launch",
      "preLaunchTask": "tsc: build",
      "program": "${workspaceFolder}/dist/index.js"
    }
  ]
}
```

## Anti-patterns to Avoid

```ts
// ❌ Using `any`:
function processData(data: any): any { ... }

// ✅ Use `unknown` or specific types:
function processData(data: Record<string, unknown>): ProcessedData { ... }

// ❌ Type assertions when you don't need them:
const el = document.getElementById('x') as HTMLInputElement

// ✅ Use generic querySelector:
const el = document.querySelector<HTMLInputElement>('#x')

// ❌ Non-null assertion (!) without check:
const name = user!.name

// ✅ Null check first:
if (user) { console.log(user.name) }

// ❌ Enum (prefer union types):
enum Direction { Up, Down, Left, Right }

// ✅ Union type:
type Direction = 'up' | 'down' | 'left' | 'right'
```

---

## Exercises

### Level 1

1. Set up a TypeScript project with `tsconfig.json`, `package.json`, and a `src/` folder.
2. Enable strict mode and fix all resulting errors.
3. Create a barrel file (`index.ts`) that re-exports all modules.

### Level 2

1. Configure path aliases for `@utils`, `@types`, and `@services`.
2. Add source maps and verify debugging works in VS Code.
3. Write a function that intentionally triggers a type error and explain the error message.

### Level 3

1. Set up a full project structure with types, utils, services, and config directories.
2. Create a TypeScript `Logger` class that can be used across the project.
3. Write a pre-commit hook that runs `tsc --noEmit` to catch type errors.

---

🎉 **Day 40 Complete!** Certificate: TypeScript Master unlocked!

🎉 **Progress**: 40/45 days complete | Certificate: TypeScript Master 🟣

[<< Day 39](../39_day_ts_advanced_types/39_day_ts_advanced_types.md) | [Day 41 >>](41_day_project_recipe/41_day_project_recipe.md)
