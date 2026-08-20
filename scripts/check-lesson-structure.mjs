import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const lessons = fs
  .readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && /^\d+_day_/.test(entry.name))
  .map((entry) => path.join(root, entry.name, `${entry.name}.md`))
  .filter((file) => fs.existsSync(file));

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[`*_]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

const failures = [];
for (const file of lessons) {
  const text = fs.readFileSync(file, 'utf8');
  const label = path.relative(root, file);
  if ((text.match(/^## Table of Contents$/gim) ?? []).length !== 1) failures.push(`${label}: expected one Table of Contents`);
  if (!text.includes('## Keywords and terms')) failures.push(`${label}: missing Keywords and terms`);
  if (!text.includes('## Topics')) failures.push(`${label}: missing Topics`);
  for (const section of ['## Read the first example line by line', '## Prediction experiment', '## Broken example and repair', '## Guided practice before independent work']) {
    if (!text.includes(section)) failures.push(`${label}: missing ${section}`);
  }
  const headings = new Set([...text.matchAll(/^##?##? (.+?)\s*$/gm)].map((match) => slugify(match[1])));
  const tocStart = text.search(/^## Table of Contents$/im);
  const nextSection = text.indexOf('\n## ', tocStart + 4);
  const toc = text.slice(tocStart, nextSection === -1 ? text.length : nextSection);
  for (const anchor of toc.matchAll(/\]\(#([^)]+)\)/g)) {
    if (!headings.has(anchor[1])) failures.push(`${label}: broken TOC anchor #${anchor[1]}`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`Lesson structure check passed for ${lessons.length} JavaScript/TypeScript lessons.`);
