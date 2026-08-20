import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const directories = fs
  .readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && /^\d+_day_/.test(entry.name))
  .sort((a, b) => Number(a.name.split('_', 1)[0]) - Number(b.name.split('_', 1)[0]))
  .map((entry) => entry.name);

function titleOf(lessonText, directory) {
  return lessonText.match(/^# (.+)$/m)?.[1] ?? directory.replace(/^\d+_/, '');
}

function practiceFiles(directory) {
  const practice = path.join(root, directory, 'practice');
  fs.mkdirSync(practice, { recursive: true });
  return {
    exercises: path.join(practice, 'exercises.md'),
    hints: path.join(practice, 'hints.md'),
    solutions: path.join(practice, 'solutions.md'),
  };
}

function exercises(day, title) {
  return `# Day ${day} exercises: ${title}

Read the [lesson](../${directories[day - 1]}.md) first. Before coding, open the [course README](../../README.md), confirm the [setup guide](../../VS_CODE_SETUP.md), and choose the correct Node, TypeScript, or browser workflow. Work locally with synthetic data.

## Evidence rule

For every task, write your prediction before running code, record the observed result, and explain the difference. Use JavaScript and TypeScript starters when the lesson provides both. Do not open the hints or solution route until you have attempted the exercise.

## Exercises

1. Define the main idea in **${title}** in two sentences for a complete beginner and point to the first example that demonstrates it.
2. Run the JavaScript starter unchanged. Record the exact command, expected output, and observed output.
3. Run the matching TypeScript starter or compiler check. Identify one type annotation, inference decision, or compiler message.
4. Write a line-by-line trace naming the input, operation, output, and owner of each important value.
5. Change exactly one input or state value. Predict the result before running the program.
6. Add a boundary case such as an empty value, duplicate item, missing DOM node, rejected Promise, or invalid type. State the acceptance criterion.
7. Reproduce the deliberate mistake from the lesson. Capture the error or incorrect behavior and name the violated assumption.
8. Repair the smallest possible line. Explain why the repair fixes the cause instead of hiding the symptom.
9. Add a focused assertion or test that fails when the key behavior disappears and passes after the repair.
10. Translate the JavaScript behavior into TypeScript without changing the runtime idea. State what TypeScript catches and what it cannot catch.
11. Apply the lesson to a small local feature using invented data. Name the component, function, browser, or module boundary before implementing it.
12. Write a review note with changed files, commands, evidence, one limitation, one accessibility or reliability concern, and the next lesson to study.
`;
}

function hints(day, title) {
  return `# Day ${day} hints: ${title}

Use these hints after attempting the [exercises](exercises.md). If your environment is the problem, read the [course README](../../README.md), [VS Code setup](../../VS_CODE_SETUP.md), and [troubleshooting guide](../../TROUBLESHOOTING.md) before changing code.

## Progressive hint route

1. Start in the repository root and verify Node and npm versions.
2. Run the unchanged starter before editing it; an unexplained setup failure is a different problem from a lesson failure.
3. Say the input and expected output aloud. If you cannot name them, return to the worked example.
4. Trace one value at a time. Write down who creates it, who reads it, and who is allowed to change it.
5. Change only one input or rule so the cause of a different result remains visible.
6. For boundary cases, choose the contract first: accept, reject, render an empty state, show loading, or show an error.
7. In browser work, distinguish the DOM, event handler, JavaScript runtime, and Vite transformation step.
8. In TypeScript work, read the first compiler error and repair the type or the value; do not weaken the compiler merely to make the red text disappear.
9. A test should observe behavior or a public contract, not only a private implementation detail.
10. Keep JavaScript and TypeScript examples behaviorally equivalent so the type layer does not hide the runtime idea.
11. Use accessible labels, semantic elements, keyboard behavior, and visible failure states when the lesson touches UI.
12. If you are stuck, compare your artifact with the expected behavior in the lesson and read only the matching solution checkpoint.

The goal is to understand **${title}**, not to copy a finished file.
`;
}

function solutions(day, title) {
  return `# Day ${day} solution guide: ${title}

Use this guide after attempting [the exercises](exercises.md). It contains review checkpoints rather than a copied submission. A strong answer explains the decision, the runtime behavior, the TypeScript boundary, and the limitation.

## Review checkpoints

1. The definition uses ordinary language and connects the concept to a concrete example.
2. The unchanged JavaScript starter ran from the correct directory and its output was recorded.
3. The TypeScript starter or compiler check ran, and the learner identified a useful type boundary.
4. The trace names values in execution order rather than saying only that the framework “handles it.”
5. The normal change preserves the lesson's main rule and matches the prediction or explains the mismatch.
6. The boundary case has deliberate visible behavior rather than a stray value, blank page, or swallowed rejection.
7. The deliberate failure was reproduced and the violated assumption was named accurately.
8. The repair is the smallest meaningful change and does not disable type checking or hide an error.
9. The focused assertion would fail if the important behavior disappeared.
10. The TypeScript version keeps the JavaScript runtime behavior while documenting a check or contract; it does not claim types validate external data.
11. The local feature has a named boundary, synthetic fixture, accessible behavior where relevant, and a failure or empty state.
12. The review note records evidence, limitation, risk, and the next learning step.

If a checkpoint is missing, return to the lesson's execution trace and guided practice before moving on.
`;
}

function navigation(day, directory) {
  const index = day - 1;
  const previous = index === 0 ? '../README.md' : `../${directories[index - 1]}/${directories[index - 1]}.md`;
  const next = index === directories.length - 1 ? '../DAY_INDEX.md' : `../${directories[index + 1]}/${directories[index + 1]}.md`;
  const previousLabel = index === 0 ? '← Course overview' : '← Previous lesson';
  const nextLabel = index === directories.length - 1 ? 'Course index →' : 'Next lesson →';
  return `[${previousLabel}](${previous}) · [README](../README.md) · [Setup](../VS_CODE_SETUP.md) · [Day index](../DAY_INDEX.md) · [${nextLabel}](${next})`;
}

for (let index = 0; index < directories.length; index += 1) {
  const day = index + 1;
  const directory = directories[index];
  const lessonPath = path.join(root, directory, `${directory}.md`);
  let lessonText = fs.readFileSync(lessonPath, 'utf8');
  const title = titleOf(lessonText, directory);
  const files = practiceFiles(directory);
  fs.writeFileSync(files.exercises, exercises(day, title));
  fs.writeFileSync(files.hints, hints(day, title));
  fs.writeFileSync(files.solutions, solutions(day, title));

  const lines = lessonText.split('\n');
  const navIndex = lines.findIndex((line) => line.startsWith('[') && line.includes('../'));
  const nav = navigation(day, directory);
  if (navIndex >= 0) lines[navIndex] = nav;
  else lines.splice(1, 0, nav);
  lessonText = lines.join('\n');

  if (!lessonText.includes('## Start here')) {
    const start = `## Start here\n\nRead the [course README](../README.md), complete the [VS Code setup](../VS_CODE_SETUP.md), and use the [day index](../DAY_INDEX.md) to confirm where this lesson fits. Run the paired local starters before attempting [exercises](practice/exercises.md), then use [hints](practice/hints.md) and [solutions](practice/solutions.md) only after an honest attempt.\n\n`;
    lessonText = lessonText.replace('## Table of Contents', `${start}## Table of Contents`);
  }
  if (!lessonText.includes('- [Start here](#start-here)')) {
    lessonText = lessonText.replace('## Table of Contents\n', '## Table of Contents\n\n- [Start here](#start-here)\n');
  }
  const practiceLine = 'Use [practice/exercises.md](practice/exercises.md) first, then [practice/hints.md](practice/hints.md), and finally [practice/solutions.md](practice/solutions.md).';
  if (!lessonText.includes(practiceLine)) {
    lessonText = lessonText.replace('## Practice\n', `## Practice\n\n${practiceLine}\n`);
  }
  fs.writeFileSync(lessonPath, lessonText);
}

const indexLines = [
  '# 45-day course index',
  '',
  '> **Start here:** read [README.md](README.md), complete [VS_CODE_SETUP.md](VS_CODE_SETUP.md), review [TROUBLESHOOTING.md](TROUBLESHOOTING.md), and then begin with Day 001.',
  '',
  'Each lesson links back to this index, the course README, setup guidance, and its own exercises, hints, and solutions.',
  '',
  '| Day | Lesson |',
  '| ---: | --- |',
];
for (let index = 0; index < directories.length; index += 1) {
  const directory = directories[index];
  const lesson = fs.readFileSync(path.join(root, directory, `${directory}.md`), 'utf8');
  const title = titleOf(lesson, directory).replace(/^Day \d+:\s*/i, '');
  indexLines.push(`| ${String(index + 1).padStart(2, '0')} | [${title}](${directory}/${directory}.md) |`);
}
fs.writeFileSync(path.join(root, 'DAY_INDEX.md'), `${indexLines.join('\n')}\n`);
console.log(`Repaired ${directories.length} JavaScript/TypeScript lessons and built DAY_INDEX.md.`);
