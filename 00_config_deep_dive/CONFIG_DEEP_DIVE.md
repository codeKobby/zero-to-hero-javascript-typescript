# Bonus: Configuration Files Deep Dive

[<< Day 1](../01_day_setup/01_day_setup.md) | [Day 2 >>](../02_day_variables/02_day_variables.md)

---

## Why this exists

You have already been running `npm run day1`, clicking the play button, and opening browser lessons through the local server. This guide explains what those commands are actually doing.

Read it when you want the course tools to make sense, not just work by luck.

## What you should be able to explain

By the end of this guide, you should be able to explain:

- why `package.json` exists;
- how `npm run` finds the local tools in this project;
- what `tsconfig.json` changes for TypeScript;
- why browser lessons load JavaScript pages instead of opening `.ts` files directly; and
- why configuration helps the course run consistently on another machine.

## The problem first

When a learner clones this repository, three questions matter immediately:

1. What command should I run?
2. Which tools does that command use?
3. How does TypeScript get checked before code reaches the browser or Node.js?

The configuration files answer those questions.

## `package.json` is the project map

Open the root `package.json` file. The important pieces are:

```json
{
  "type": "module",
  "engines": {
    "node": "^20.19.0 || >=22.12.0",
    "npm": ">=10"
  },
  "scripts": {
    "day1": "tsx 01_day_setup/starter/ts/main.ts",
    "day1:js": "node 01_day_setup/starter/js/main.js",
    "day24": "echo 'Day 24 is DOM-based - open 24_day_dom_selection/starter/index.html in browser'",
    "dev": "vite",
    "check": "tsc --noEmit"
  },
  "devDependencies": {
    "tsx": "^4.23.12",
    "typescript": "^5.0.0",
    "vite": "^8.2.1"
  }
}
```

What each part means:

- `type: module` tells Node to use modern ESM `import` and `export`.
- `engines` records the supported Node and npm versions.
- `scripts` are reusable commands you run with `npm run ...`.
- `devDependencies` are tools the course needs while developing, not libraries the lessons ship to users.

### Why `npm run day1` works

Trace it step by step:

1. `npm run day1` reads the `scripts.day1` entry.
2. npm looks for the local `tsx` binary in `node_modules/.bin`.
3. `tsx` reads `01_day_setup/starter/ts/main.ts`.
4. TypeScript syntax is transformed in memory.
5. Node runs the resulting JavaScript and prints the output.

The key idea is that the command uses project-local tools, not global installs.

## `tsconfig.json` is the TypeScript rulebook

Open `tsconfig.json` next:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "isolatedModules": true,
    "noEmit": true,
    "allowImportingTsExtensions": true
  },
  "include": ["*/starter/ts/**/*.ts"]
}
```

What matters most for this course:

- `strict: true` turns on the strongest beginner-friendly checks.
- `noUncheckedIndexedAccess: true` reminds you that array lookups can miss.
- `isolatedModules: true` keeps each file compatible with single-file transforms such as `tsx`.
- `noEmit: true` means `tsc` checks types but does not write output files.
- `allowImportingTsExtensions: true` lets the TypeScript starters import files in the way this repo expects.

### What `npm run check` really does

Trace it like this:

1. `npm run check` reads the `scripts.check` entry.
2. npm runs `tsc --noEmit`.
3. TypeScript reads `tsconfig.json`.
4. TypeScript checks the included `.ts` starter files.
5. If a type error exists, the command fails before the lesson is treated as ready.

Important: `tsconfig.json` does not validate runtime data. It checks code shape at compile time only.

## Browser lessons need JavaScript

DOM, storage, and project lessons run in a browser, but browsers do not execute TypeScript directly.

That is why the lesson folders use two entry pages:

- `index.html` loads the JavaScript starter.
- `index.ts.html` loads the TypeScript starter through Vite.

The browser workflow looks like this:

1. The JavaScript page opens directly from disk and loads `js/main.js` — no server involved.
2. For the TypeScript page you run `npm run dev`; Vite starts a local server.
3. The browser opens the lesson page from that server.
4. The TypeScript page imports `ts/main.ts`, and Vite transforms it for the browser.
5. The browser receives JavaScript either way.

Only module-based and TypeScript browser pages need the server; the plain JavaScript pages behave the same on disk or served.

## Why not global installs?

Global installs create avoidable drift:

- one machine gets a newer tool version than another;
- one lesson works on one machine and fails on another; and
- a learner has to guess which tool came from where.

Project-local tools keep the course reproducible.

## Common mistakes

- Running a browser lesson with `node` instead of using the browser and Vite.
- Installing `tsx`, `typescript`, or `vite` globally instead of using the project copy.
- Treating `noEmit` as if it disables checking. It does not.
- Assuming TypeScript can prove external JSON, storage, or form input is valid without a runtime guard.
- Opening a TypeScript (or module-based) browser page directly from disk instead of through the Vite server.

## Practice before you move on

Try these in your own words first:

1. Trace what happens when you run `npm run day1`.
2. Explain why browser lessons use `index.ts.html` instead of loading `.ts` directly.
3. Name one `tsconfig.json` option that improves safety and say what it protects.
4. Explain why `npm run check` is useful even when the lesson already runs.

- [Hints](practice/hints.md)
- [Worked solutions](practice/solutions.md)

## Check yourself

You should be able to explain:

1. What `package.json` tells npm to do.
2. Why `tsconfig.json` affects checking but not runtime values.
3. Why browser lessons use Vite instead of opening files directly.
4. Why local tooling is more reliable than global installs in a shared course.

[<< Day 1](../01_day_setup/01_day_setup.md) | [Day 2 >>](../02_day_variables/02_day_variables.md)

Configuration files do not run your code. They tell the tools how to run, check, and serve it.
