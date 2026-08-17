# VS Code Setup Guide

## Essential Extensions (Install These First)

| Extension | What It Does | Why You Need It |
|-----------|--------------|-----------------|
| **Code Runner** | Run code with ▶ button or `Ctrl+Alt+N` | One-click run for Node-based `.js` and `.ts` files |
| **Live Server** | Auto-reloads browser on save | Essential for DOM/HTML projects |
| **Console Ninja** | Shows `console.log` output inline in editor | See results without leaving code |
| **Error Lens** | Shows errors/warnings inline in code | Catch mistakes instantly |

## One-Click Install

Open VS Code Command Palette (`Ctrl+Shift+P`) → **Extensions: Install Extensions** → Search and install each above.

Or paste this in terminal:
```bash
code --install-extension formulahendry.code-runner
code --install-extension ritwickdey.LiveServer
code --install-extension console-ninja.console-ninja
code --install-extension usernamehw.errorlens
```

---

## Required VS Code Settings

This repository already includes these settings in `.vscode/settings.json`. After cloning, open the repository root folder, accept VS Code's workspace trust prompt, and install the recommended extensions. If you opened a subfolder or need to repair your user settings, copy this block into your user `settings.json`.

Open Settings (`Ctrl+,`) → Search "settings.json" → Click "Open Settings (JSON)" → **Add this:**

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
  "code-runner.saveFileBeforeRun": true,
  "console-ninja.showOutputOn": "editor",
  "liveServer.settings.port": 5500,
  "liveServer.settings.root": "/",
  "editor.inlineSuggest.enabled": true,
  "typescript.updateImportsOnFileMove.enabled": "always"
}
```

---

## How to Run Each Day

### Days 1–23, 28, 31–40 (Node.js / Terminal)

| Method | How |
|--------|-----|
| **Easiest** | Open `.ts` file → Click **▶** top-right |
| **Terminal** | `npm run day2` (or day3, day4...) |
| **JS version** | `npm run day2:js` |

### Days 24–27, 29–30, 41–44 (Browser / DOM)

| Method | How |
|--------|-----|
| **Go Live (Easiest)** | Open `index.html` → Click **Go Live** in bottom status bar |
| **Right-click** | Right-click `index.html` → **Open with Live Server** |
| **Manual** | Double-click `index.html` in file explorer (no auto-reload) |

> **Live Server auto-reloads** when you save changes — best for DOM projects!
> The **Go Live** button appears in VS Code's bottom status bar after installing Live Server.

---

## Pro Tip: View 3 Files Side-by-Side

Want to see the lesson (`.md`), JavaScript (`.js`), and TypeScript (`.ts`) at the same time?

**VS Code → View → Editor Layout → Three Columns**

Then open:
- Column 1: `02_day_variables/02_day_variables.md` (lesson)
- Column 2: `02_day_variables/starter/js/main.js` (JavaScript)
- Column 3: `02_day_variables/starter/ts/main.ts` (TypeScript)

**Shortcut:** `Ctrl+1` / `Ctrl+2` / `Ctrl+3` to jump between columns

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `tsx: command not found` | Run `npm install` in project root |
| PowerShell blocks `npm` or `npx` | Use `npm.cmd install` / `npm.cmd run day1`, or switch VS Code terminal to Command Prompt/Git Bash |
| ▶ button runs `ts-node` (not found) | Make sure `.vscode/settings.json` exists and maps TypeScript to `node ./node_modules/tsx/dist/cli.mjs` |
| ▶ button runs wrong command | Check `code-runner.executorMap` in settings.json |
| Live Server won't start | Make sure you're right-clicking `index.html` (not `.ts` file) |
| TypeScript errors not showing | Install **Error Lens** extension |
| Console Ninja not showing output | Run the file first (`npm run day1`), then output appears inline |
| "Cannot find module" errors | Run `npm install` then restart VS Code (`Ctrl+Shift+P` → "Developer: Reload Window") |

---

## Quick Reference Card

```
DAY 1–23, 28, 31–40     →  npm run day<N>      → Runs in terminal
DAY 24–27, 29–30, 41–44 →  Live Server        → Runs in browser
DAY 45                  →  Your project!      → You decide

Click ▶ on Node-day .ts files   → Runs local tsx through node
Open index.html → Click Go Live → Runs in browser (Browser days)
Right-click index.html → Open with Live Server (Also works)
```
