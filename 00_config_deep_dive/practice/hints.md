# Hints

Use these only after you have tried to explain each answer yourself.

1. Start with the `scripts.day1` entry in `package.json`. Follow the command from `npm run` into the local `tsx` binary and then into the TypeScript starter file.
2. Remember that browsers do not understand TypeScript syntax. The `.ts` page works because Vite serves the file and transforms the import before the browser sees it.
3. Pick one option from `tsconfig.json` and say what it changes: `strict`, `noEmit`, or `noUncheckedIndexedAccess` are the easiest to explain.
4. `npm run check` catches type problems before runtime. That is useful even when the code already runs because it spots mistakes earlier.
