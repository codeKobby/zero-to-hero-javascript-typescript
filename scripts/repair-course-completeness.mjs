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

1. Open the folder named in the lesson and check that Node is available.
2. Run the starter without changing it. Write down what appears.
3. Write the input and expected output before writing code.
4. Follow one value from where it starts to where it appears.
5. Change one input. Keep the other lines the same.
6. Try one empty or bad input. Decide whether the program should reject it or show an empty/error message.
7. For browser work, say whether you are looking at the page, the event handler, or the JavaScript code.
8. For TypeScript work, read the first compiler error and fix the value or type it names.
9. Test what a user can see or what a function returns.
10. Make the JavaScript and TypeScript versions do the same thing.
11. Use a real label, heading, button, link, or visible error when the lesson uses a page.
12. If stuck, return to the lesson’s smallest example and copy only the next small step.

The goal is to understand **${title}**, not to copy a finished file.
`;
}

function solutions(day, title) {
  return `# Day ${day} solution guide: ${title}

Use this guide only after attempting the numbered exercises in [the lesson](../${directories[day - 1]}.md). It contains review checkpoints rather than a copied submission. A strong answer explains the decision, the runtime behavior, the TypeScript boundary, and the limitation.

## Review checkpoints

1. The learner explained the new word in ordinary language.
2. The JavaScript starter ran and its result was written down.
3. The TypeScript starter or compiler check ran.
4. The learner followed one value from input to output.
5. The normal example still works after one small change.
6. The empty or bad input has a clear result.
7. The learner made and fixed the lesson’s deliberate mistake.
8. The fix did not hide an error or turn off type checking.
9. A check fails when the important visible result is removed.
10. JavaScript and TypeScript show the same runtime behavior.
11. The page has the needed label, heading, keyboard action, empty state, or error message.
12. The note lists the changed files, command, result, and one thing not tested.

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
