# Day 17 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. `true`.
2. `false` — lowercase letters fail `[A-Z]`.
3. `false` — without the prefix removed, the string does not match from `^` to `$`; the anchors reject partial matches.
4. `match[1]` is `'First'`, `match[2]` is `'Last'` (case-insensitive `i` flag).
5. `'Ada Lovelace'` — `\s+` collapses each run of whitespace to one space.
6. Two matches: `'tag'` and `'Tag'` (the `i` flag matches both; `[a-z]+` with `i` also accepts the uppercase `T`).
7. `true` — the `i` flag ignores case.
8. `false` — `'sky'` contains no vowel from the set `[aeiou]`.
9. A dynamic regex — `includes` treats `+` as a literal character with no escaping needed.
10. `day17:js` and `day17` run; `npm run check` passes.

## Level 2

```js
// 1. isCourseCode
function isCourseCode(value) {
  return /^[A-Z]{2}-\d{3}$/.test(value)
}
console.log(isCourseCode('JS-101'))     // true
console.log(isCourseCode('js-101'))     // false
console.log(isCourseCode('JS-12'))      // false
console.log(isCourseCode('pre-JS-101')) // false

// 2. Extract hashtags
function extractHashtags(text) {
  return [...text.matchAll(/#([a-z]+)/gi)]
    .map((match) => match[1].toLowerCase())
}
console.log(extractHashtags('Build #JavaScript with #TypeScript')) // ['javascript', 'typescript']

// 3. collapseSpaces
function collapseSpaces(text) {
  return text.replace(/\s+/g, ' ').trim()
}
console.log(collapseSpaces('  Ada   Lovelace  ')) // 'Ada Lovelace'

// 4. firstTag
function firstTag(text) {
  const match = /#([a-z]+)/i.exec(text)
  return match === null ? null : match[1].toLowerCase()
}
console.log(firstTag('See #one here')) // one
console.log(firstTag('no tags'))       // null
```

```ts
// 5. parseCourseCode in TypeScript
type ParsedCourseCode = {
  subject: string
  number: string
}

function parseCourseCode(value: string): ParsedCourseCode | null {
  const match = /^([A-Z]{2})-(\d{3})$/.exec(value)
  if (match === null) {
    return null
  }

  return { subject: match[1], number: match[2] }
}

console.log(parseCourseCode('JS-101')) // { subject: 'JS', number: '101' }
console.log(parseCourseCode('js-101')) // null
```

## Level 3

```js
// 1. The slug reader
function isSlug(value) {
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(value)
}
console.log(isSlug('my-course-101')) // true
console.log(isSlug('My Course!'))    // false
// Rule chosen: one or more lowercase alphanumeric segments joined by single hyphens.

// 2. The tag counter
function countTags(text) {
  return [...text.matchAll(/#[a-z]+/gi)].length
}
console.log(countTags('a #one b #two c')) // 2

// 3. The redactor
function redactCards(text) {
  // Rule chosen: four groups of four digits separated by hyphens.
  return text.replace(/\b\d{4}-\d{4}-\d{4}-\d{4}\b/g, '****')
}
console.log(redactCards('Card 1234-5678-9012-3456 ok')) // Card **** ok
// State your rule before relying on it: no spaces or ungrouped digits are covered here.

// 4. The initials from a name (regex approach)
function initialsRegex(fullName) {
  const match = /^\s*(\w)\S+\s+(\w)\S+\s*$/.exec(fullName)
  if (match === null) {
    return ''
  }
  return (match[1] + match[2]).toUpperCase()
}
console.log(initialsRegex('Ada   Lovelace')) // AL
// Compare with Day 14: split(' ').map(first).join('') is easier to read and reason about.
// Prefer the split version; the regex version exists here to show the trade-off.
```

These examples validate deliberately narrow formats. They do not validate a real-world email address, password policy, or URL; those requirements need product rules, server validation, and often a dedicated library.