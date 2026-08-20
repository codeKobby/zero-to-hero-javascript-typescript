import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);

const keywordMap = {
  1: [
    ['runtime', 'The program that reads JavaScript and produces behavior.'],
    ['Node.js', 'A JavaScript runtime that runs outside the browser.'],
    ['console.log', 'A function that writes a value to the console.'],
    ['TypeScript', 'A language layer that checks JavaScript before runtime.'],
  ],
  2: [
    ['let', 'Declares a name whose value may be reassigned.'],
    ['const', 'Declares a name that cannot be reassigned.'],
    ['var', 'An older declaration keyword with different scope behavior.'],
    ['undefined', 'The value of a declared name that has not received a value.'],
    ['hoisting', 'The runtime preparation of declarations before execution.'],
  ],
  3: [
    ['primitive', 'A basic value such as a string, number, or Boolean.'],
    ['object', 'A value that groups properties and can have identity.'],
    ['null', 'An intentional empty value.'],
    ['typeof', 'An operator that reports a value category.'],
    ['union type', 'A TypeScript type that permits one of several alternatives.'],
  ],
  4: [
    ['operator', 'A symbol or word that performs an operation on values.'],
    ['comparison', 'An operation that produces a Boolean answer.'],
    ['truthy', 'A value treated as true in a condition.'],
    ['strict equality', 'A comparison using both value and type.'],
  ],
  5: [
    ['condition', 'A question whose result chooses a branch.'],
    ['if', 'A keyword that runs a block when its condition is true.'],
    ['else', 'A fallback block when earlier conditions are false.'],
    ['switch', 'A branching statement for matching one expression to cases.'],
  ],
  6: [
    ['loop', 'A structure that repeats a block of code.'],
    ['for', 'A loop commonly used to visit items or ranges.'],
    ['while', 'A loop that continues while a condition remains true.'],
    ['iteration', 'One pass through a loop body.'],
  ],
  7: [
    ['function', 'A named or unnamed reusable block of behavior.'],
    ['parameter', 'A name that receives a value inside a function definition.'],
    ['argument', 'The value supplied when a function is called.'],
    ['return', 'The statement that sends a result back to the caller.'],
    ['scope', 'The region where a name can be accessed.'],
  ],
  8: [
    ['callback', 'A function supplied to another function to run later or conditionally.'],
    ['higher-order function', 'A function that receives or returns another function.'],
    ['closure', 'A function that retains access to surrounding variables.'],
    ['side effect', 'A change outside a function result, such as a log or mutation.'],
  ],
};

function dayNumber(directory) {
  return Number(directory.split('_', 1)[0]);
}

function headingSlug(heading) {
  return heading
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

function firstRuntimeTopics(text) {
  const start = text.indexOf('## JS runtime deep dive');
  if (start === -1) return [];
  const end = text.indexOf('\n## ', start + 4);
  const block = text.slice(start, end === -1 ? text.length : end);
  return [...block.matchAll(/^### (.+)$/gm)].slice(0, 6).map((match) => match[1]);
}

function keywordRows(day, text) {
  const rows = keywordMap[day] ?? firstRuntimeTopics(text).slice(0, 5).map((topic) => [topic, `The lesson explains ${topic.toLowerCase()} through runnable examples and practice.`]);
  return rows.map(([term, meaning]) => `| **${term}** | ${meaning} |`).join('\n');
}

function topicOverview(day, text) {
  const topics = firstRuntimeTopics(text);
  const topicLinks = topics.slice(0, 5).map((topic) => `- [${topic}](#${headingSlug(topic)})`).join('\n');
  const extra = day === 7
    ? 'For this functions lesson, follow the sequence **What is a function?**, **Why are functions useful?**, **What are parameters and arguments?**, **What does return do?**, and **What types of functions can we write?**.'
    : day === 8
      ? 'For this callbacks lesson, follow the sequence **What is a callback?**, **Why pass a function as a value?**, **What is a higher-order function?**, and **What is a closure?**.'
      : 'Read the topics in order: first understand the idea, then study the syntax, then compare a normal case with a boundary case, and finally complete the practice.';
  return `## Topics\n\n${extra}\n\nThe existing deep-dive sections are the main topic sequence for this lesson:\n\n${topicLinks}`;
}

function functionTopicHeadings(text, day) {
  if (day === 7 && !text.includes('### What is a function?')) {
    return text
      .replace('### The function machine', '### What is a function?\n\nA function is a reusable block that receives optional inputs, performs a defined job, and may return a result.\n\n### The function machine')
      .replace('### Parameters and arguments, traced step by step', '### What are parameters and arguments?\n\nA parameter is the name inside the definition; an argument is the value supplied by the caller.\n\n### Parameters and arguments, traced step by step')
      .replace('### Return versus console.log', '### What does return do?\n\n`return` sends a value back to the caller. `console.log` displays a value; it does not automatically send that value back.\n\n### Return versus console.log')
      .replace('### Two useful ways to write a function', '### What types of functions can we write?\n\nThis lesson compares declarations and expressions, then explains when each form is useful.\n\n### Two useful ways to write a function');
  }
  if (day === 8 && !text.includes('### What is a callback?')) {
    return text
      .replace('### A function can be a value', '### What is a callback?\n\nA callback is a function passed to another function so the receiving code can call it at the appropriate time.\n\n### A function can be a value')
      .replace('### Returning a function', '### What is a higher-order function?\n\nA higher-order function receives a function, returns a function, or does both.\n\n### Returning a function')
      .replace('### Closures: a function remembers its surrounding variables', '### What is a closure?\n\nA closure is a function together with the surrounding variables it can still access.\n\n### Closures: a function remembers its surrounding variables');
  }
  return text;
}

for (const file of lessonFiles()) {
  const day = dayNumber(path.basename(file).split('_', 1)[0]);
  let text = fs.readFileSync(file, 'utf8');
  text = functionTopicHeadings(text, day);
  if (!text.includes('## Keywords and terms')) {
    const marker = '\n## JS runtime deep dive';
    if (!text.includes(marker)) throw new Error(`Missing runtime section: ${file}`);
    const block = `\n## Keywords and terms\n\n| Keyword or term | Plain-English meaning |\n| --- | --- |\n${keywordRows(day, text)}\n\n${topicOverview(day, text)}\n`;
    text = text.replace(marker, `${block}${marker}`, 1);
  }
  fs.writeFileSync(file, text);
}

console.log(`Added Keywords and Topics structure to ${lessonFiles().length} JavaScript/TypeScript lessons.`);
