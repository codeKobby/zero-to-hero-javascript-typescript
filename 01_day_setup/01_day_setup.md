<div align="center">
  <h1>Day 1: Setup & Tooling</h1>
</div>

[<< readMe](../readMe.md) | [Day 2 >>](../02_day_variables/02_day_variables.md)

---

## What You'll Learn Today

- Install Node.js (the JavaScript runtime)
- Run your first JavaScript and TypeScript code
- **One command to run any day's code** — no configuration needed

---

## What Is JavaScript?

JavaScript is a programming language that runs in web browsers and on servers (via Node.js). It powers interactive websites, mobile apps, servers, and even games.

## What Is TypeScript?

TypeScript is JavaScript with **extra features** that help you catch mistakes before running your code. TypeScript files use the `.ts` extension.

> **Think of it this way:** JavaScript is the language the computer understands. TypeScript is a tool that helps you write better JavaScript by catching errors early.

---

## Step-by-Step Setup (Do This Once)

### 1. Install Node.js

Go to **[nodejs.org](https://nodejs.org)** → Download the **LTS** version → Install it (keep all defaults).

Verify it works:
```bash
node --version
# Should show something like v20.0.0
```

### 2. Open This Folder in VS Code

1. Open VS Code
2. `File` → `Open Folder` → Select this `zero-to-hero-javascript-typescript` folder
3. VS Code will prompt: "Do you trust the authors?" → Click **Yes, I trust the authors**

### 3. Install Project Dependencies (One Click)

Open the terminal in VS Code (`Terminal` → `New Terminal` or `Ctrl+\``) and run:

```bash
npm install
```

This installs TypeScript and `tsx` (a tool that runs TypeScript instantly) **inside this project only** — no global installs needed.

> On Windows, if PowerShell says `npm.ps1 cannot be loaded`, run `npm.cmd install` instead, or switch the VS Code terminal to Command Prompt/Git Bash.

---

## Run Your First Code

### Option A: Terminal (Copy-Paste These)

**JavaScript:**
```bash
npm run day1:js
```

**TypeScript:**
```bash
npm run day1
```

You'll see:
```
TypeScript says: Hello, World!
User: Alice, Age: 25, Active: true
```

### Option B: VS Code Button (Easiest!)

1. Open a Node-based lesson `.ts` file (e.g., `01_day_setup/starter/ts/main.ts`)
2. Click the **▶ Run** button in the top-right corner of the editor
3. Output appears in the terminal below

> The project is already configured so the ▶ button runs the local `tsx` tool automatically. If you do not see the button, install the **Code Runner** extension from VS Code's recommendations.

---

## How to Run Any Day

| Day | Command |
|-----|---------|
| Day 1 | `npm run day1` |
| Day 2 | `npm run day2` |
| Day 3 | `npm run day3` |
| ... | ... |
| Day 45 | `npm run day45` |

**Or click ▶ on any Node-based lesson `.ts` file.** Browser/DOM lessons use Live Server with `index.html`.

---

## JavaScript vs TypeScript — Side by Side

**JavaScript** (`01_day_setup/starter/js/main.js`):
```js
console.log('JavaScript says: Hello, World!')
let age = 25
let userName = 'Alice'
```

**TypeScript** (`01_day_setup/starter/ts/main.ts`):
```ts
console.log('TypeScript says: Hello, World!')
let age: number = 25        // Type annotation: this must be a number
let userName: string = 'Alice'  // Type annotation: this must be text
```

> The `: number` and `: string` are **type annotations**. They tell TypeScript what type each variable should be. If you accidentally try to put text in `age`, TypeScript warns you **before** you run the code.

---

## Exercises

### Level 1 — Run It

1. Run `npm run day1` and verify you see "Hello, World!"
2. Open `01_day_setup/starter/ts/main.ts`
3. Change `'Alice'` to your name
4. Click ▶ or run `npm run day1` again

### Level 2 — Break It (See TypeScript Catch Errors)

1. In `main.ts`, change `let age: number = 25` to `let age: number = 'twenty-five'`
2. Click ▶ — you'll see a red error **before** the code runs!
3. Fix it back to `25`

### Level 3 — Write Your Own

1. Create a new file: `my-first-ts.ts` in the `01_day_setup/starter/ts/` folder
2. Add this code:
```ts
const myName: string = 'Your Name'
const myAge: number = 25
const isLearning: boolean = true

console.log(`${myName} is ${myAge} and learning: ${isLearning}`)
```
3. Click ▶ on your new file

---

## What Just Happened?

- `npm install` → downloaded TypeScript + `tsx` into this project's `node_modules/`
- `npm run day1` → runs `tsx 01_day_setup/starter/ts/main.ts`
- `tsx` → runs TypeScript **instantly** without a separate compile step
- The ▶ button in VS Code → uses Code Runner plus `.vscode/settings.json` to run the same local TypeScript tool

**No global installs. No config files to edit. Just code and run.**

---

## 🔧 Under the Hood: How `npm run day1` Works (Optional Deep Dive)

> **This section is optional!** Read it when you're curious about what's happening behind the scenes.

### The `package.json` File

Open `package.json` in the project root. You'll see a `"scripts"` section:

```json
{
  "scripts": {
    "day1": "tsx 01_day_setup/starter/ts/main.ts",
    "day2": "tsx 02_day_variables/starter/ts/main.ts"
    // ... up to day45
  }
}
```

When you run `npm run day1`, npm:
1. Looks in `package.json` under `"scripts"`
2. Finds `"day1": "tsx 01_day_setup/starter/ts/main.ts"`
3. Runs that exact command in the terminal

### What Is `tsx`?

`tsx` (TypeScript Execute) is a tool that:
1. Reads your `.ts` file
2. Compiles it to JavaScript **in memory** (using esbuild — extremely fast)
3. Runs the resulting JavaScript with Node.js
4. Shows you the output

All in one step — no separate `tsc` compile command needed!

### Where Are These Tools Installed?

Run this to see:
```bash
ls node_modules/.bin/
```

You'll see `tsx`, `tsc`, and other tools. They're **local to this project** (in `node_modules/`), not installed globally on your computer.

### The ▶ Button in VS Code

The ▶ button comes from the **Code Runner** extension. This repository's `.vscode/settings.json` tells Code Runner how to run TypeScript files. When you click ▶ on a Node-based lesson `.ts` file, it essentially runs:
```bash
node ./node_modules/tsx/dist/cli.mjs path/to/your/file.ts
```

That command uses the `tsx` package installed by `npm install`. It does not require a global `ts-node` or `tsx` install.

### Why Not Global Installs?

- **Project-specific versions** — each project can use different TypeScript versions
- **No conflicts** — one project's tools don't affect another's
- **Reproducible** — anyone cloning this repo gets the exact same tools via `npm install`

---

## 📚 Helpful References

| File | What's Inside |
|------|---------------|
| [`VS_CODE_SETUP.md`](../VS_CODE_SETUP.md) | One-click extension installs, settings.json config, how to run each day |
| [`TROUBLESHOOTING.md`](../TROUBLESHOOTING.md) | Common errors and fixes, quick command reference |

---

[<< readMe](../readMe.md) | [Day 2 >>](../02_day_variables/02_day_variables.md)

🌕 **Day 1 Complete!** You're set up and running TypeScript code.
