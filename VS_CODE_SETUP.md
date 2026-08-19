# VS Code Setup

This course should work with VS Code's built-in JavaScript and TypeScript support. Do not install a large extension collection before you have run Day 1.

## 1. Open the correct folder

In VS Code, choose File -> Open Folder and select the repository root:

~~~text
zero-to-hero-javascript-typescript
~~~

Do not open only a single lesson folder. The run commands and TypeScript configuration live in the repository root.

## 2. Open a terminal in VS Code

Choose Terminal -> New Terminal.

Run:

~~~bash
node --version
npm.cmd --version
npm.cmd install
~~~

On macOS, Linux, Git Bash, or Command Prompt, npm install is normally enough. PowerShell can block npm.ps1; npm.cmd avoids that Windows-specific issue.

Installation runs the repository's environment check automatically. The project supports Node 20.19+ or Node 22.12+ and npm 10+. If your version is unsupported, the message tells you exactly what to install; do not work around it by installing tools globally.

## 3. Verify the environment before Day 1

~~~bash
npm.cmd run day1:js
npm.cmd run day1
npm.cmd run check
npm.cmd run doctor
~~~

Expected result:

- the JavaScript starter prints output;
- the TypeScript starter prints corresponding output; and
- the final command finishes with no TypeScript errors.

If one fails, use [TROUBLESHOOTING.md](TROUBLESHOOTING.md) before moving on.

## 4. How to work through a Node lesson

Open three files side by side:

1. the lesson markdown file;
2. starter/js/main.js; and
3. starter/ts/main.ts.

Read the explanation, predict the output, run the JavaScript file, then run the TypeScript version. The two files should demonstrate the same runtime behavior; TypeScript adds compile-time checks.

~~~bash
npm.cmd run day6:js
npm.cmd run day6
~~~

## 5. Browser lessons: the JS and TS pages

DOM and project lessons run in a browser because document and localStorage do not exist in Node.js.

Each lesson ships two entry pages. The JavaScript page is plain, so open `starter/index.html` directly in your browser (double-click the file); no server is needed. The TypeScript page imports a `.ts` starter that Vite transforms, so serve it from the repository root:

~~~bash
npm.cmd run dev
~~~

Vite prints a local address. Open the lesson's TypeScript path, for example `/24_day_dom_selection/starter/index.ts.html`, and keep the terminal running while you work. Each browser lesson documents its own paths.

Use browser developer tools with F12 when you need to inspect the DOM, console, or network errors. The JavaScript page behaves the same on disk or served; only the TypeScript page requires the Vite server, because a browser cannot run a `.ts` file directly.

## Optional extensions

| Extension | Use it when | Why it is optional |
|---|---|---|
| Live Server | You already use it for another project | Vite is the canonical server for this repository |
| Error Lens | You prefer inline error display | VS Code already reports TypeScript errors |
| Code Runner | You understand its command configuration | The npm commands are more reliable for beginners |

The built-in terminal and npm commands are the canonical workflow for this course. If an extension disagrees with the lesson commands, trust the terminal command first.

## Quick reference

~~~text
npm.cmd install       Install project tools once
npm.cmd run dayN:js   Run JavaScript for Day N
npm.cmd run dayN      Run TypeScript for Day N
npm.cmd run check     Type-check every TypeScript starter
npm.cmd run dev       Serve the TypeScript browser pages with Vite
~~~
