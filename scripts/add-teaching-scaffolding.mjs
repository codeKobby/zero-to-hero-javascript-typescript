import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);

function lessonFiles() {
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^\d+_day_/.test(entry.name))
    .map((entry) => path.join(root, entry.name, `${entry.name}.md`))
    .filter((file) => fs.existsSync(file));
}

function explain(line) {
  const value = line.trim();
  if (!value) return 'Blank line: it separates ideas for the reader.';
  if (value.startsWith('//') || value.startsWith('/*')) return 'Comment: the runtime ignores this note.';
  if (/^(const|let|var)\s/.test(value)) return 'Declaration or assignment: the runtime creates or updates a named value.';
  if (value.startsWith('function ') || value.includes('=>')) return 'Function syntax: this line defines reusable behavior or an arrow function.';
  if (value.startsWith('return ')) return 'Return statement: the function sends a result back to its caller.';
  if (/^(if|else|for|while|switch)\b/.test(value)) return 'Control-flow statement: the runtime decides whether or how this block runs.';
  if (value.includes('console.log')) return 'Output call: the program displays the evaluated value in the console.';
  if (value.includes('(') && value.includes(')')) return 'Function call: the runtime evaluates the arguments and invokes the operation.';
  return 'Expression or data declaration: identify the values, operators, and names before running it.';
}

function codeBlock(text) {
  const match = text.match(/```(?:js|javascript|ts|typescript)\n([\s\S]*?)\n```/);
  return match ? match[1].split('\n').slice(0, 14) : [];
}

function scaffold(file) {
  let text = fs.readFileSync(file, 'utf8');
  if (text.includes('## Read the first example line by line')) return text;
  const lines = codeBlock(text);
  if (!lines.length) return text;
  const title = text.match(/^# Day \d+: (.+)$/m)?.[1] ?? 'this lesson';
  const rows = lines.map((line, index) => `| ${index + 1} | \`${line.replaceAll('|', '\\|')}\` | ${explain(line)} |`).join('\n');
  const block = `## Read the first example line by line\n\nThe first runnable example introduces **${title}**. Run it unchanged before editing it. Then read it line by line and write down what value exists after each declaration, which condition is tested, and what appears in the console.\n\n| Line | Code | What the runtime is doing |\n| ---: | --- | --- |\n${rows}\n\nThe table is a starting point, not a substitute for running the example. Change one value only, predict the output, run it, and explain the difference.\n\n## Prediction experiment\n\nBefore changing the example, write a prediction. Test one normal input, one empty or missing input, and one boundary input relevant to **${title}**. Record the input, your prediction, the observed output or error, and the rule you learned. Keep the failed prediction; it shows which mental model needs repair.\n\n## Broken example and repair\n\nMake one controlled mistake related to **${title}**: misspell a name, use the wrong type, omit a return, call a function too early, or change one condition. Run it and capture the useful error or incorrect output. Explain the assumption that failed, then make the smallest repair and rerun the normal and boundary cases. Do not hide the error with a broad catch or delete the failing experiment.\n\n## Guided practice before independent work\n\nStart with the nearest worked example. Change one value, predict the result, and run it. Next, change one rule while keeping the input the same. Finally, write a small variation from a blank file and compare it with the example. Only after these three checkpoints should you begin the numbered or level-based practice below.\n\n`;
  const marker = '\n## Practice';
  if (!text.includes(marker)) return text;
  return text.replace(marker, `\n${block}## Practice`, 1);
}

let changed = 0;
for (const file of lessonFiles()) {
  const before = fs.readFileSync(file, 'utf8');
  const after = scaffold(file);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed += 1;
  }
}
console.log(`Added teaching scaffolding to ${changed} JavaScript/TypeScript lessons.`);
