# Troubleshooting

Work through this list in order. Copy the complete error message before changing settings.

## PowerShell blocks npm

**Symptom**

~~~text
npm.ps1 cannot be loaded because running scripts is disabled
~~~

**Fix**

Use the Windows command shim:

~~~bash
npm.cmd install
npm.cmd run day1
~~~

You do not need to change Windows execution policy for this course.

## node or npm is not recognised

**Cause:** Node.js is not installed, or the terminal needs to be restarted after installation.

**Fix**

1. Install the current LTS release from nodejs.org.
2. Close and reopen VS Code.
3. Run node --version and npm.cmd --version again.

## tsx command not found or module not found

**Cause:** Project dependencies are missing.

**Fix**

From the repository root:

~~~bash
npm.cmd install
~~~

Then run the intended day command again.

## A TypeScript error appears

This is useful feedback, not a signal to ignore TypeScript.

1. Read the first error from top to bottom.
2. Open the file and line mentioned in the message.
3. Compare the value you supplied with the type the message expected.
4. Make the smallest correction.
5. Re-run:

~~~bash
npm.cmd run check
~~~

Do not “fix” a type error by adding any or a type assertion until the lesson has explained the trade-off.

## document or localStorage is not defined

**Cause:** A browser lesson was run in Node.js.

**Fix:** Open starter/index.html with Live Server. Do not use an npm day command for browser-only lessons.

## The page does not refresh or localStorage does not persist

**Cause:** index.html was opened directly with the file protocol.

**Fix:** Use Live Server so the page runs on http://localhost.

## A command runs the wrong file

**Fix**

1. Confirm the terminal is in the repository root.
2. Run npm.cmd run dayN rather than using a generic editor run button.
3. Open package.json and confirm the matching dayN script.

## Still stuck

Record:

- the day number;
- the exact command you ran;
- the complete error message;
- your operating system; and
- node --version.

Then compare your starter with the day's separate hints and worked solutions. If your output differs, describe the difference rather than only saying “it does not work.”
