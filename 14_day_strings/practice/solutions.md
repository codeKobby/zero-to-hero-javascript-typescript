# Day 14 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. → `10`.
2. → `'t'` (the last character).
3. → `'HELLO'`.
4. → `'Java'` — `slice` excludes the end index.
5. → `'ipt'` — negative counts from the end.
6. → `['red', 'green']`.
7. → `'red, green'`.
8. → logs `'MINA'` — `toLowerCase()` returns a new string that is discarded; strings are immutable.
9. → `undefined` — an empty string has no character at index 0.
10. `day14:js` and `day14` run; `npm run check` passes.

## Level 2

```js
// 1. Initials (two names, per the stated constraint)
function initials(fullName) {
  const [firstName, lastName] = fullName.trim().split(' ')
  return firstName[0] + lastName[0]
}
console.log(initials('Ada Lovelace')) // AL

// 2. Clean colors
const colors = '  RED, green, Blue  '
  .split(',')
  .map(color => color.trim().toLowerCase())
console.log(colors) // ['red', 'green', 'blue']

// 3. Case-insensitive extension check
function hasFileExtension(filename, extension) {
  return filename.toLowerCase().endsWith(extension.toLowerCase())
}
console.log(hasFileExtension('notes.MD', '.md')) // true
console.log(hasFileExtension('notes.txt', '.md')) // false

// 4. isYes
function isYes(answer) {
  return answer.trim().toLowerCase() === 'yes'
}
console.log(isYes(' YES ')) // true
console.log(isYes('No'))    // false

// 6. Slice using the dash position, not a hard-coded number
function baseName(filename) {
  const dashIndex = filename.indexOf('-')
  return filename.slice(0, dashIndex)
}
console.log(baseName('lesson-notes.md')) // lesson
```

```ts
// 5. Unknown narrowed, empty handled
function asDisplayName(value: unknown): string {
  if (typeof value !== 'string') {
    return 'Anonymous'
  }

  return value.trim() || 'Anonymous'
}
console.log(asDisplayName('  Mina  ')) // Mina
console.log(asDisplayName('   '))      // Anonymous
console.log(asDisplayName(42))         // Anonymous
```

## Level 3

```js
// 1. The tag cleaner, one pipeline
function cleanTags(raw) {
  return raw.split(',').map(tag => tag.trim().toLowerCase())
}
console.log(cleanTags('  JS , TS, testing ')) // ['js', 'ts', 'testing']
// split breaks on commas; map visits each tag; trim removes spaces; toLowerCase normalizes.

// 2. The username
function usernameFrom(email) {
  const atIndex = email.indexOf('@')
  return email.slice(0, atIndex)
}
console.log(usernameFrom('mina@example.com')) // mina
// Rule chosen: everything before the first '@'. State this before relying on it.

// 3. The anagram check
function sameLetters(a, b) {
  const normalize = word => word.toLowerCase().split('').sort().join('')
  return normalize(a) === normalize(b)
}
console.log(sameLetters('listen', 'silent')) // true
console.log(sameLetters('hello', 'world'))   // false

// 4. The summary
function summarize(text, max) {
  if (text.length <= max) {
    return text
  }
  return text.slice(0, max) + '...'
}
console.log(summarize('a short title', 20)) // a short title
console.log(summarize('a much longer title that needs cutting', 10)) // a much lon...

// 5. The title case
function titleCase(phrase) {
  return phrase
    .split(' ')
    .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}
console.log(titleCase('zero to hero')) // Zero To Hero
// Rule chosen: capitalize every word's first letter. If 'to' should stay lowercase,
// that is a separate rule applied before mapping.
```

## TypeScript

```ts
function normalizeSearchQuery(query: string): string {
  return query.trim().toLowerCase()
}

normalizeSearchQuery('  TypeScript  ') // valid
// normalizeSearchQuery(42)             // TypeScript error before runtime

function displayLabel(value: unknown): string {
  if (typeof value !== 'string') {
    return 'No label'
  }

  return value.trim() || 'No label'
}

// function brokenLabel(value: unknown): string {
//   return value.trim()          // Error: 'value' is of type 'unknown'.
// }
```