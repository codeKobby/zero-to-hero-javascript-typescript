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
    hints: path.join(practice, 'hints.md'),
    solutions: path.join(practice, 'solutions.md'),
  };
}

function hints(day, title) {
  return `# Day ${day} hints: ${title}

Use these hints only after attempting the numbered exercises in [the lesson](../${directories[day - 1]}.md). If your environment is the problem, read the [course README](../../README.md), [VS Code setup](../../VS_CODE_SETUP.md), and [troubleshooting guide](../../TROUBLESHOOTING.md) before changing code.

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

Use this guide only after attempting the numbered exercises in [the lesson](../${directories[day - 1]}.md). It contains review checkpoints rather than a copied submission. A strong answer explains the decision, the runtime behavior, the TypeScript boundary, and the limitation.

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
  const legacyExercises = path.join(root, directory, 'practice', 'exercises.md');
  if (fs.existsSync(legacyExercises)) fs.unlinkSync(legacyExercises);
  fs.writeFileSync(files.hints, hints(day, title));
  fs.writeFileSync(files.solutions, solutions(day, title));

  const lines = lessonText.split('\n');
  const navIndex = lines.findIndex((line) => line.startsWith('[') && line.includes('../'));
  const nav = navigation(day, directory);
  if (navIndex >= 0) lines[navIndex] = nav;
  else lines.splice(1, 0, nav);
  lessonText = lines.join('\n');

  if (!lessonText.includes('## Start here')) {
    const start = `## Start here\n\nRead the [course README](../README.md), complete the [VS Code setup](../VS_CODE_SETUP.md), and use the [day index](../DAY_INDEX.md) to confirm where this lesson fits. Run the paired local starters before attempting the numbered exercises in this lesson, then use [hints](practice/hints.md) and [solutions](practice/solutions.md) only after an honest attempt.\n\n`;
    lessonText = lessonText.replace('## Table of Contents', `${start}## Table of Contents`);
  }
  if (!lessonText.includes('- [Start here](#start-here)')) {
    lessonText = lessonText.replace('## Table of Contents\n', '## Table of Contents\n\n- [Start here](#start-here)\n');
  }
  lessonText = lessonText.replaceAll('the numbered exercises in this lesson', 'the numbered exercises in this lesson');
  lessonText = lessonText.replaceAll('the numbered exercises in this lesson', 'the numbered exercises in this lesson');
  if (!lessonText.includes('practice/hints.md')) {
    lessonText = lessonText.replace('## Practice\n', '## Practice\n\nAttempt the numbered exercises in this lesson first, then use [practice/hints.md](practice/hints.md) and [practice/solutions.md](practice/solutions.md) for support.\n');
  }
  fs.writeFileSync(lessonPath, lessonText);
}

const indexLines = [
  '# 45-day course index',
  '',
  '> **Start here:** read [README.md](README.md), complete [VS_CODE_SETUP.md](VS_CODE_SETUP.md), review [TROUBLESHOOTING.md](TROUBLESHOOTING.md), and then begin with Day 001.',
  '',
  'Each lesson links back to this index, the course README, setup guidance, its own in-lesson exercises, and the hints and solution checkpoints.',
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
