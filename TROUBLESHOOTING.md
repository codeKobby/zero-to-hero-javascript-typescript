# Troubleshooting Guide

## Before You Start

**Run this once after cloning:**
```bash
npm install
```

This installs TypeScript and `tsx` locally. No global installs needed.

---

## Common Issues

### "tsx: command not found" or "npm run day1 fails"

**Cause:** Dependencies not installed.
```bash
npm install
```

### PowerShell says `npm.ps1` or `npx.ps1` "cannot be loaded"

**Cause:** Windows PowerShell is blocking script shims. You do not need to change the project.

Use the `.cmd` version of the command:
```bat
npm.cmd install
npm.cmd run day1
```

Or switch VS Code's terminal profile to **Command Prompt** or **Git Bash**.

### "Cannot find module" / Red squiggly lines in imports

**Cause:** TypeScript needs to re-scan.
1. `Ctrl+Shift+P` → **TypeScript: Restart TS Server**
2. Or restart VS Code

### ▶ Button runs wrong command / nothing happens

**Fix:** This repository includes the correct settings in `.vscode/settings.json`. Make sure you opened the repository root folder in VS Code. If the setting is missing or you need to repair your user settings, add this to VS Code `settings.json`:
```json
{
  "code-runner.executorMap": {
    "typescript": "node ./node_modules/tsx/dist/cli.mjs",
    "javascript": "node"
  },
  "code-runner.executorMapByFileExtension": {
    ".ts": "node ./node_modules/tsx/dist/cli.mjs",
    ".js": "node"
  },
  "code-runner.cwd": "$workspaceRoot",
  "code-runner.fileDirectoryAsCwd": false,
  "code-runner.runInTerminal": true,
  "code-runner.saveFileBeforeRun": true
}
```

If the terminal says `ts-node` is not recognized, Code Runner is ignoring the workspace settings or using old user settings. Reload VS Code with `Ctrl+Shift+P` → **Developer: Reload Window**, then try again.

### Live Server won't start / "Port already in use"

**Fix:** 
- Kill other Live Server instances
- Or change port in settings: `"liveServer.settings.port": 5501`

### TypeScript errors not showing inline

**Install:** **Error Lens** extension
- Shows errors as red text on the line
- No need to hover

### Console Ninja not showing logs

1. Run the file first: `npm run day1`
2. Output appears inline next to `console.log`
3. If not: `Ctrl+Shift+P` → **Console Ninja: Toggle Output**

### "export {}" at top of files?

**Why:** Makes file a module (prevents global scope leaks). Required for `"type": "module"` in package.json. Keep it!

---

## Project-Specific Issues

### Days 24–27, 29–30, 41–44: "document is not defined"

**Cause:** Running browser code in Node.js.
**Fix:** Use **Live Server** on `index.html`, not `npm run day24`.

### Day 29/30/41-44: localStorage not working

**Cause:** Opening `index.html` directly (`file://` protocol).
**Fix:** Use **Live Server** (`http://localhost:5500`)

### `npm run check` shows errors

**This is GOOD!** It means TypeScript is catching bugs.
- Fix the red squiggly lines in VS Code
- Run `npm run check` again until clean

---

## Still Stuck?

1. **Check the terminal output** — errors usually tell you exactly what's wrong
2. **Read the error message** — TypeScript errors are very descriptive
3. **Compare with starter code** — Check `starter/ts/main.ts` for the day
4. **Open GitHub Issue** — Include:
   - Day number
   - Error message (full text)
   - Your code snippet
   - OS / Node version (`node --version`)

---

## Quick Commands Reference

```bash
# Install deps (run once)
npm install
# If PowerShell blocks npm.ps1 on Windows:
npm.cmd install

# Run TypeScript day
npm run day1
npm.cmd run day1
npm run day2
# ... up to day45

# Run JavaScript version
npm run day1:js

# Type-check entire project
npm run check

# Start Live Server for browser days
# Right-click index.html → "Open with Live Server"
```
