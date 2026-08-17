<div align="center">
  <h1>Day 1: Setup & Tooling</h1>
</div>

[<< readMe](../readMe.md) | [Day 2 >>](../02_day_variables/02_day_variables.md)

---

## What You'll Learn Today

- How to install Node.js and TypeScript
- How to run JavaScript files with Node.js
- How to compile and run TypeScript files
- The difference between `.js` and `.ts` files
- How to set up `tsconfig.json`

---

## What Is JavaScript?

JavaScript is a programming language that runs in web browsers and on servers (via Node.js). It powers interactive websites, mobile apps, servers, and even games.

## What Is TypeScript?

TypeScript is JavaScript with **extra features** that help you catch mistakes before running your code. TypeScript files use the `.ts` extension and must be converted to `.js` before running.

> **Think of it this way:** JavaScript is the language the computer understands. TypeScript is a tool that helps you write better JavaScript by catching errors early.

---

## Setting Up

### Step 1: Install Node.js

Download from [nodejs.org](https://nodejs.org) (LTS version). Then check it worked:

```bash
node --version    # Should show something like v18.0.0
npm --version     # Should show something like 9.0.0
```

### Step 2: Install TypeScript

```bash
npm install -g typescript
tsc --version     # Should show the version
```

### Step 3: Run Your First File

Open `starter/js/main.js` and run it:

```bash
node starter/js/main.js
```

Now try the TypeScript file:

```bash
tsc starter/ts/main.ts
node starter/ts/main.js
```

---

## JavaScript vs TypeScript — Side by Side

**JavaScript** (`starter/js/main.js`):
```js
console.log('JavaScript says: Hello, World!')
let age = 25
let userName = 'Alice'
```

**TypeScript** (`starter/ts/main.ts`):
```ts
console.log('TypeScript says: Hello, World!')
let age: number = 25        // Add the type after the variable name
let userName: string = 'Alice'
```

> The `: number` and `: string` are called **type annotations**. They tell TypeScript what type each variable should be. If you accidentally try to put text in `age`, TypeScript will warn you before you run the code.

---

## Your tsconfig.json

This file tells TypeScript how to compile. It's already set up for you:

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "module": "ESNext"
  }
}
```

---

## Exercises

### Level 1

1. Install Node.js and TypeScript. Run `node --version` and `tsc --version`.
2. Open `starter/js/main.js` and change the message to your own name.
3. Run `node starter/js/main.js` and verify the output.

### Level 2

1. Open `starter/ts/main.ts` and add a new variable with a type annotation.
2. Try removing a type annotation — does it still work? (Yes — TypeScript can guess types.)
3. Try assigning a number to a string variable. What happens?

### Level 3

1. Create a new `.ts` file with variables of every primitive type: `string`, `number`, `boolean`, `bigint`, `symbol`.
2. Run `tsc` on your file and fix any errors.

<details>
<summary>🔍 View Solutions</summary>

**Level 1 — verify installation:**
```bash
node --version
tsc --version
```

**Level 2 — type error example:**
```ts
let age: number = 'twenty'  // ❌ Error: Type 'string' is not assignable to type 'number'
```

**Level 3 — all primitive types:**
```ts
const myString: string = 'hello'
const myNumber: number = 42
const myBoolean: boolean = true
const myBigInt: bigint = 100n
const mySymbol: symbol = Symbol('id')
```
</details>

---

[<< readMe](../readMe.md) | [Day 2 >>](../02_day_variables/02_day_variables.md)

🌕 **Day 1 Complete!** You've set up your environment for both JavaScript and TypeScript.
