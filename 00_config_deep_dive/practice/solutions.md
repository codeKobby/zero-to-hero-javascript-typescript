# Bonus solution guide: configuration files

Use this guide after attempting the [exercises](exercises.md). Compare your reasoning and evidence rather than copying the wording.

## Review checkpoints

1. The explanation identifies `package.json` as a machine-readable project contract and distinguishes scripts, engines, and development dependencies.
2. The `day1` trace names npm, the local `tsx` executable, the TypeScript entry file, the runtime, and the observed output.
3. Both Day 1 commands were run and their outputs were recorded separately.
4. The temporary configuration failure was reproduced safely and repaired without damaging the repository's real manifest.
5. The explanation of local dependencies connects reproducibility, lockfiles, and avoiding global version drift.
6. The four TypeScript compiler options are explained in terms of checks or emitted files rather than memorized names.
7. The deliberate compiler error was captured and repaired at the source of the mismatch.
8. The browser explanation distinguishes TypeScript source, Vite transformation, and JavaScript received by the browser.
9. The comparison table includes environment, entry file, transformation, command, and output.
10. The configuration-versus-source-versus-test decision is justified by ownership and purpose.
11. The troubleshooting record includes a reproducible directory, command, expected result, observed result, and smallest repair.
12. The fresh-clone review note gives a beginner a complete route from installation to Day 1, browser lessons, and checks without requiring global tools.

A complete answer also states the limitation: configuration checks can prove that the documented local workflow is coherent, but they cannot prove every future machine, browser, dependency release, or production deployment will behave identically.
