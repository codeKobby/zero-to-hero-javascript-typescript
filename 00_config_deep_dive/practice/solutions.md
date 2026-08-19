# Worked solutions

Compare these with your own explanations. The goal is to explain the workflow, not memorize the wording.

1. `npm run day1` reads the `scripts.day1` entry in `package.json`, launches the local `tsx` binary, and runs `01_day_setup/starter/ts/main.ts` through Node after transforming TypeScript in memory.
2. Browser lessons use `index.ts.html` because the browser cannot execute TypeScript directly. Vite serves the file, transforms the TypeScript starter, and gives the browser JavaScript instead.
3. `strict: true` improves type checking, `noUncheckedIndexedAccess: true` reminds you array lookups can miss, and `noEmit: true` makes `tsc` check without writing output files.
4. `npm run check` is useful because code can still run and still be wrong. Type checking finds mistakes before you rely on the behavior or ship it to a learner.
