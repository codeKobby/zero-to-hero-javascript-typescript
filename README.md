# Zero to Junior: JavaScript and TypeScript

<p align="center">
  <img src="images/banners/course-cover.svg" alt="Zero to Junior course banner" />
</p>

A 45-day, practice-first course for a complete beginner. JavaScript is the runtime language; TypeScript is taught beside it as a typed development layer. You will see what both versions do, why they differ, and when each trade-off matters.

This course is designed to be cloned and run by other learners. The repository is the source of truth for commands, dependencies, examples, and checks.

## Start from a fresh clone

Install Node.js 20.19+ or 22.12+ (the current supported LTS lines), then run these commands from the repository root:

~~~powershell
git clone <repository-url>
cd zero-to-hero-javascript-typescript
npm.cmd install
npm.cmd run day1:js
npm.cmd run day1
npm.cmd run check
~~~

That single install command installs the exact lockfile dependency tree and runs the repository environment check. No global TypeScript, tsx, Vite, or Live Server installation is required.

On macOS, Linux, Git Bash, or Command Prompt, npm usually works without the .cmd suffix. On Windows PowerShell, npm.cmd avoids the common script-policy problem.

If a command fails, read [VS_CODE_SETUP.md](VS_CODE_SETUP.md) and [TROUBLESHOOTING.md](TROUBLESHOOTING.md) before changing the project configuration.

## The daily loop

Each Node-based lesson has:

~~~text
DAY/lesson.md
DAY/starter/js/main.js
DAY/starter/ts/main.ts
DAY/practice/exercises.md
DAY/practice/hints.md
DAY/practice/solutions.md
~~~

Read the **Keywords and terms** table first, then follow the **Topics** in order. Predict the output, run JavaScript, run TypeScript, read the first example line by line, complete the prediction experiment, repair the controlled mistake, and only then attempt `practice/exercises.md` before opening `practice/hints.md` or `practice/solutions.md`. Use [DAY_INDEX.md](DAY_INDEX.md) to recover your place and [COURSE_QUALITY_STANDARD.md](COURSE_QUALITY_STANDARD.md) to understand what completion means.

~~~powershell
npm.cmd run day6:js
npm.cmd run day6
npm.cmd run check
~~~

The paired starters should demonstrate the same runtime idea. TypeScript may add annotations, unions, narrowing, or contracts, but it should not hide JavaScript's behavior.

## Browser lessons

DOM and project lessons run in a browser. Each lesson ships two entry pages with the same starter code:

- **JavaScript** — `starter/index.html` is plain, so open it directly in your browser (double-click the file). No server needed.
- **TypeScript** — `starter/index.ts.html` imports a `.ts` file that Vite transforms, so serve it with the Vite included in this repository. From the repository root:

~~~powershell
npm.cmd run dev
~~~

Then open the path Vite prints, for example `/24_day_dom_selection/starter/index.ts.html`, and keep the Vite terminal running.

A fresh clone needs no globally installed server or VS Code extension; Vite is a local dependency.

## Roadmap

| Days | Focus |
| --- | --- |
| 1–10 | Setup, values, operators, control flow, loops, functions, objects, arrays |
| 11–20 | Destructuring, higher-order functions, text, numbers, dates, regex, errors, classes |
| 21–28 | Modules, JSON, storage, DOM, events, and functional browser patterns |
| 29–35 | Projects, promises, async/await, fetch, and API boundaries |
| 36–40 | TypeScript types, generics, utility types, advanced types, and maintainable practices |
| 41–45 | Portfolio projects, testing, accessibility, deployment, and a capstone |

The roadmap is intentionally progressive. Do not skip the practice because a later project appears more exciting; the projects depend on the earlier mental models.

## Learner guides

- [COURSE_QUALITY_STANDARD.md](COURSE_QUALITY_STANDARD.md): what every lesson must teach and verify.
- [LESSON_TEMPLATE.md](LESSON_TEMPLATE.md): the Keywords-and-Topics page structure, explainer sequence, and practice flow.
- [CURRICULUM_GUIDE.md](CURRICULUM_GUIDE.md): the full day-by-day map.
- [DAY_INDEX.md](DAY_INDEX.md): the canonical linked index for all 45 lessons.
- [LEETCODE_GUIDE.md](LEETCODE_GUIDE.md): optional problem-solving track that teaches how LeetCode works and maps each day's skills to a problem.
- [PORTFOLIO_TRACK.md](PORTFOLIO_TRACK.md): project quality and evidence checklist.
- [VS_CODE_SETUP.md](VS_CODE_SETUP.md): clone, Node, TypeScript, Vite, and browser workflow.
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md): diagnosis-first fixes.

## What completion means

Finishing a reading is not the same as being job-ready. A learner should be able to explain the code, modify it, handle invalid input, write tests, use Git, debug a browser or Node failure, and present a small project with a clear README. The later project and portfolio guides make those expectations explicit.

## Official references

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript configuration reference](https://www.typescriptlang.org/tsconfig/)
