# Day 30 — Guided Builder's Guide: **WordForge** (Vocabulary Builder with a Persisted Study Deck)

> **How this guide works:** the agent writes the guide, *you* do the work. You will type every line of code, run every check, screenshot the states, commit, and deploy. There is one small working milestone per section — finish it, verify its CHECK, commit, then start the next. Never start a new milestone before the previous one is committed and green.

> **Portfolio Definition of Done (recap):** README · pure-logic-separate-from-DOM architecture · JS/TS parity passing `npm.cmd run check` · deliberate loading/empty/error/success/disabled states with keyboard/focus behavior · validated external/stored data + safe DOM APIs · git history with small working commits incl. one bug fix.

---

## 0. The project

**What you will build.** A vocabulary tool. The user types an English word; the app fetches its pronunciation and the top meaning from a free dictionary API, and offers it for **saving to a personal "Study Deck"** that survives a refresh. From the deck the user can mark words as well-known or remove them. It is deliberately **not** a todo list, weather dashboard, recipe manager, store, forum, or country app.

```text
type WordEntry = { text: string; phonetic: string; definition: string; mastered: boolean; addedAt: number }
type Status    = 'idle' | 'loading' | 'success' | 'error'
type State = {
  currentWord: WordEntry | null
  deck: WordEntry[]         // the single source of truth for your saved words
  status: Status
  error: string | null
}
```

**The shape you will keep for the whole build.** One source of truth (`state`), one `render()` that re-renders the whole UI from it, and three explicit boundaries the DOM code never reaches into:

```text
view events ──► update(state) ──► state ──► render()
                    │                          ▲
                    ▼                          │
              storage.js (localStorage)        │  (read via loadDeck on boot)
                    │                          │
              api.js (fetch dictionary)        │  (async; sets status)
```

**Why this shape.** After Day 29 you know that when the DOM and the data are allowed to drift, the app lies to the user. Day 30's weather project showed the async version of the same idea: an async boundary, a state machine, and guarded rendering. WordForge reuses both, but with a **real** network call (dictionaryapi.dev — free, no key).

**Setup before Milestone 1 (do this once).**

1. Create a new folder and repository:
   ```
   mkdir wordforge && cd wordforge && git init
   ```
2. Start a Node project and install the two tools (Vite to serve; TypeScript to check):
   ```
   npm init -y
   npm install --save-dev vite typescript
   ```
3. Add these scripts to `package.json`:
   ```json
   "scripts": {
     "dev":   "vite",
     "check": "tsc --noEmit",
     "build": "tsc"
   }
   ```