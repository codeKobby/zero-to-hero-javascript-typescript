# Bonus hints: configuration files

Use these hints after attempting the the numbered exercises in this lesson. Start with the [configuration deep dive](../CONFIG_DEEP_DIVE.md) and the [course README](../../README.md).

## Progressive hint route

1. Treat `package.json` as data consumed by tools; describe what each field allows another tool to do.
2. Follow the command literally: npm script, local binary, source path, transformation step, runtime, output.
3. Do not compare only the final text. Record which runtime produced it and which source file it read.
4. Make the temporary copy obvious and never damage the repository's working configuration.
5. A local dependency gives the course a reproducible version and avoids global installation drift.
6. Read one compiler option at a time and connect it to a small observable consequence.
7. Keep the error in a temporary file or restore it immediately after capturing the first useful diagnostic.
8. The browser receives JavaScript. Vite is the development transformation step for the TypeScript browser starter.
9. Compare environment, entry file, transformation, command, and output rather than describing only “Node” or “the browser.”
10. Put project-wide tool behavior in configuration, runtime behavior in source, and claims about behavior in tests.
11. A useful troubleshooting record is reproducible by another learner without seeing your terminal.
12. Read the root README's fresh-clone section and follow the commands in order; do not invent a global install step.
