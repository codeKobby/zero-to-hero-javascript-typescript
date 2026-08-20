# Bonus practice: configuration files

Read the [configuration deep dive](../CONFIG_DEEP_DIVE.md) first. Use the [course README](../../README.md), [VS Code setup](../../VS_CODE_SETUP.md), and [DAY_INDEX.md](../../DAY_INDEX.md) when you need to recover the project workflow. Work only with this repository's local configuration.

## Exercises

1. Define `package.json` in ordinary language and identify the `scripts`, `engines`, and `devDependencies` fields.
2. Trace `npm run day1` from the command line to the TypeScript starter. Name each tool that participates.
3. Run `npm run day1:js` and `npm run day1`. Record the expected and observed output for both.
4. Change one script path in a temporary copy of `package.json`. Predict the error before running the command, then repair it.
5. Explain why the course uses project-local binaries instead of requiring global TypeScript, tsx, or Vite installations.
6. Open `tsconfig.json` and explain `strict`, `noUncheckedIndexedAccess`, `isolatedModules`, and `noEmit` in your own words.
7. Add a deliberate TypeScript error to a temporary starter. Run the type check, capture the first diagnostic, and repair the smallest cause.
8. Explain why a browser cannot execute a `.ts` file directly and how Vite transforms the TypeScript browser lesson.
9. Compare a Node lesson, a TypeScript Node lesson, a plain JavaScript browser lesson, and a Vite-served TypeScript browser lesson in a table.
10. Add a safe check to a local script and explain whether it belongs in `package.json`, `tsconfig.json`, source code, or a test.
11. Write a troubleshooting record for one failed command: directory, command, expected result, observed result, and repair.
12. Prepare a review note explaining how a fresh learner can clone the course, install dependencies, run Day 1, run a browser lesson, and run the checks without global tools.
