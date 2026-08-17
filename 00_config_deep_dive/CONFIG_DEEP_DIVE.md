<div align="center">
  <h1>Bonus: Configuration Files Deep Dive</h1>
  <p><em>Understanding package.json, tsconfig.json, and how your code runs</em></p>
</div>

[<< Day 1](../01_day_setup/01_day_setup.md) | [Day 2 >>](../02_day_variables/02_day_variables.md)

---

## Why This Exists

You've been running `npm run day1`, clicking ▶, and using Live Server. This lesson explains **what's happening under the hood**. Read this when you're curious — not required to continue!

---

## `package.json` — Project Settings

Open `package.json` in the root folder:

```json
{
  "name": "zero-to-hero-js-ts",
  "type": "module",
  "scripts": {
    "day1": "tsx 01_day_setup/starter/ts/main.ts",
    "day1:js": "node 01_day_setup/starter/js/main.js",
    "check": "tsc --noEmit"
  },
  "devDependencies": {
    "tsx": "^4.23.12",
    "typescript": "^5.0.0"
  }
}
```

| Field | What It Does |
|-------|--------------|
| `"type": "module"` | Use modern `import`/`export` (not old `require`) |
| `"scripts"` | Shortcuts — `npm run day1` runs the command |
| `"devDependencies"` | Tools only needed while coding (not in production) |

### What `npm install` Did

```
node_modules/
├── .bin/
│   ├── tsx      → runs TypeScript directly
│   ├── tsc      → TypeScript compiler
│   └── ...
├── tsx/
└── typescript/
```

**No global installs** — everything lives in `node_modules/.bin/`

---

## `tsconfig.json` — TypeScript Rules

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noEmit": true,
    "isolatedModules": true
  },
  "include": ["*/starter/ts/**/*.ts"]
}
```

| Option | Meaning |
|--------|---------|
| `"strict": true` | Catch ALL type errors (recommended!) |
| `"target": "ES2022"` | Output modern JS features |
| `"noEmit": true` | Only type-check, don't create `.js` files |
| `"isolatedModules": true` | Each file stands alone (needed for `tsx`) |

Run `npm run check` to type-check everything without running.

---

## How `npm run day1` Works

```
npm run day1
     │
     ▼
Reads package.json "scripts" → finds "day1": "tsx 01_day_setup/starter/ts/main.ts"
     │
     ▼
Runs: npx tsx 01_day_setup/starter/ts/main.ts
     │
     ▼
tsx (in node_modules/.bin/) reads your .ts file
     │
     ▼
Compiles to JS in memory (using esbuild - super fast)
     │
     ▼
Runs with Node.js → shows output
```

---

## The ▶ Button in VS Code

When you click ▶ on a `.ts` file:

1. VS Code reads `package.json` scripts
2. Runs: `npx tsx path/to/your/file.ts`
3. Output appears in terminal

**Why `npx`?** Means "use the `tsx` from THIS project's `node_modules/.bin/`"

---

## Browser Days (24-27, 29-30, 41-44)

HTML files use `<script type="module" src="js/main.js">`

**Why `.js` not `.ts`?** Browsers don't understand TypeScript!

The JS files are pre-written for you. In real projects, you'd:
1. Write TypeScript
2. Run `tsc` to compile to `.js`
3. Browser loads the `.js`

---

## Why Not Global Installs?

| Problem with Global | Project-Local Fix |
|---------------------|-------------------|
| Version conflicts between projects | Each project has its own `node_modules/` |
| "Works on my machine" | `npm install` gives everyone exact same tools |
| Hard to update one project | Update `package.json`, run `npm install` |

---

## Quick Commands Reference

```bash
# Install deps (run once after clone)
npm install

# Run any day
npm run day1
npm run day2
# ...

# Run JavaScript version
npm run day1:js

# Type-check everything
npm run check

# Browser days: open index.html → Click "Go Live" in status bar
```

---

## When to Come Back Here

- You want to add a new npm package
- You're getting weird TypeScript errors
- You're setting up your own project
- You're curious how it all fits together

---

[<< Day 1](../01_day_setup/01_day_setup.md) | [Day 2 >>](../02_day_variables/02_day_variables.md)

🔧 **Configuration Deep Dive Complete!** Now you know what's happening behind the scenes.