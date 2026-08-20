import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[`*_]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function lessonFiles() {
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^\d+_day_/.test(entry.name))
    .map((entry) => path.join(root, entry.name, `${entry.name}.md`))
    .filter((file) => fs.existsSync(file));
}

function tableOfContents(text) {
  const headings = [...text.matchAll(/^(##|###) (.+?)\s*$/gm)]
    .map((match) => ({ level: match[1] === '##' ? 0 : 1, title: match[2] }))
    .filter(({ title }) => !/^table of contents$/i.test(title));
  const lines = ['## Table of Contents', ''];
  for (const heading of headings) {
    lines.push(`${'  '.repeat(heading.level)}- [${heading.title}](#${slugify(heading.title)})`);
  }
  return `${lines.join('\n')}\n`;
}

for (const file of lessonFiles()) {
  let text = fs.readFileSync(file, 'utf8');
  text = text.replace(/\n## Table of Contents\n.*?(?=\n## |\z)/is, '\n');
  const firstSection = text.indexOf('\n## ');
  if (firstSection === -1) throw new Error(`No lesson sections: ${file}`);
  text = `${text.slice(0, firstSection)}\n${tableOfContents(text)}${text.slice(firstSection)}`;
  fs.writeFileSync(file, text);
}

console.log(`Refreshed tables of contents for ${lessonFiles().length} lessons.`);
