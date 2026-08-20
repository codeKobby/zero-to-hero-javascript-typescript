import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const directories = fs
  .readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && /^\d+_day_/.test(entry.name))
  .sort((a, b) => Number(a.name.split('_', 1)[0]) - Number(b.name.split('_', 1)[0]))
  .map((entry) => entry.name);

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[`*_]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function numberedCount(text) {
  return (text.match(/^\d+\.\s+/gm) ?? []).length;
}

const failures = [];
for (let index = 0; index < directories.length; index += 1) {
  const directory = directories[index];
  const lessonPath = path.join(root, directory, `${directory}.md`);
  const label = path.relative(root, lessonPath);
  if (!fs.existsSync(lessonPath)) {
    failures.push(`${label}: missing lesson file`);
    continue;
  }
  const text = fs.readFileSync(lessonPath, 'utf8');
  if ((text.match(/^## Table of Contents$/gim) ?? []).length !== 1) failures.push(`${label}: expected one Table of Contents`);
  for (const section of ['## Start here', '## Keywords and terms', '## Topics', '## Read the first example line by line', '## Prediction experiment', '## Broken example and repair', '## Guided practice before independent work']) {
    if (!text.includes(section)) failures.push(`${label}: missing ${section}`);
  }
  for (const link of ['../README.md', '../VS_CODE_SETUP.md', '../DAY_INDEX.md', 'practice/hints.md', 'practice/solutions.md']) {
    if (!text.includes(link)) failures.push(`${label}: missing ${link}`);
  }
  if (!text.includes('Previous lesson') && !text.includes('Course overview')) failures.push(`${label}: missing previous navigation`);
  if (!text.includes('Next lesson') && !text.includes('Course index')) failures.push(`${label}: missing next navigation`);

  const headings = new Set([...text.matchAll(/^##?##? (.+?)\s*$/gm)].map((match) => slugify(match[1])));
  const tocStart = text.search(/^## Table of Contents$/im);
  const nextSection = text.indexOf('\n## ', tocStart + 4);
  const toc = text.slice(tocStart, nextSection === -1 ? text.length : nextSection);
  for (const anchor of toc.matchAll(/\]\(#([^)]+)\)/g)) {
    if (!headings.has(anchor[1])) failures.push(`${label}: broken TOC anchor #${anchor[1]}`);
  }

  const practiceHeading = text.match(/^## Practice\s*$/im);
  if (!practiceHeading) {
    failures.push(`${label}: missing canonical Practice section`);
  } else {
    const practiceTail = text.slice(practiceHeading.index + practiceHeading[0].length);
    const nextHeading = practiceTail.search(/^## /m);
    const practiceSection = practiceTail.slice(0, nextHeading === -1 ? practiceTail.length : nextHeading);
    if (numberedCount(practiceSection) < 12) failures.push(`${label}: fewer than 12 numbered exercises in Practice section`);
  }

  const practice = path.join(root, directory, 'practice');
  if (fs.existsSync(path.join(practice, 'exercises.md'))) failures.push(`${label}: redundant practice/exercises.md remains`);
  for (const file of ['hints.md', 'solutions.md']) {
    const practicePath = path.join(practice, file);
    const practiceLabel = path.relative(root, practicePath);
    if (!fs.existsSync(practicePath)) {
      failures.push(`${practiceLabel}: missing`);
      continue;
    }
    const practiceText = fs.readFileSync(practicePath, 'utf8');
    if (practiceText.split(/\s+/).filter(Boolean).length < 150) failures.push(`${practiceLabel}: too short to be useful`);
    if (numberedCount(practiceText) < 12) failures.push(`${practiceLabel}: fewer than 12 numbered entries`);
    if (practiceText.includes('Use the exercise numbers in order.')) failures.push(`${practiceLabel}: generic placeholder remains`);
  }
}

const bonusDirectory = '00_config_deep_dive';
const bonusLesson = path.join(root, bonusDirectory, 'CONFIG_DEEP_DIVE.md');
if (!fs.existsSync(bonusLesson)) failures.push(`${bonusDirectory}: missing configuration guide`);
for (const file of ['hints.md', 'solutions.md']) {
  const bonusPath = path.join(root, bonusDirectory, 'practice', file);
  const label = path.relative(root, bonusPath);
  if (!fs.existsSync(bonusPath)) {
    failures.push(`${label}: missing`);
    continue;
  }
  const bonusText = fs.readFileSync(bonusPath, 'utf8');
  if (bonusText.split(/\s+/).filter(Boolean).length < 150) failures.push(`${label}: too short to be useful`);
  if (numberedCount(bonusText) < 12) failures.push(`${label}: fewer than 12 numbered entries`);
}

const indexPath = path.join(root, 'DAY_INDEX.md');
if (!fs.existsSync(indexPath)) failures.push('DAY_INDEX.md: missing');
else {
  const rows = [...fs.readFileSync(indexPath, 'utf8').matchAll(/^\| (\d{2}) \|/gm)].map((match) => Number(match[1]));
  if (rows.length !== 45 || rows.some((day, index) => day !== index + 1)) failures.push('DAY_INDEX.md: expected rows 01 through 45');
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`Lesson structure check passed for ${directories.length} JavaScript/TypeScript lessons with canonical in-lesson exercises and support routes.`);
