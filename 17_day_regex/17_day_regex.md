<div align="center">
  <h1>Day 17: Regular Expressions</h1>
</div>

[<< Day 16](../16_day_dates/16_day_dates.md) | [Day 18 >>](../18_day_error_handling/18_day_error_handling.md)

---

## What You'll Learn

- Create regex with literals or constructors
- Use character classes, quantifiers, anchors
- Extract data with named capture groups
- Validate input with patterns

---

## Creating Regex

```js
// Literal (preferred):
const regex = /hello/

// Constructor:
const regex2 = new RegExp('hello', 'i')

// Flags:
const caseInsensitive = /hello/i   // ignore case
const global = /hello/g            // find all matches
const multiline = /hello/gm        // multiline
```

## Testing and Matching

```js
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// test() — returns true/false:
emailRegex.test('alice@test.com')   // true
emailRegex.test('invalid')          // false

// match() — returns array or null:
const text = 'Contact: alice@test.com'
const match = text.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)
console.log(match[0])  // 'alice@test.com'

// matchAll() — returns iterator of all matches:
const hashtags = '#hello #world #test'
const all = [...hashtags.matchAll(/#(\w+)/g)]
// [{ 0: '#hello', 1: 'hello' }, { 0: '#world', 1: 'world' }, ...]
```

## Character Classes and Quantifiers

```js
/[aeiou]/        // any vowel
/[a-zA-Z0-9]/    // any letter or digit
/\w/             // word character (letter, digit, underscore)
/\d/             // digit
/\s/             // whitespace
/./              // any character except newline

/a*/             // 0 or more a's
/a+/             // 1 or more a's
/a?/             // 0 or 1 a (optional)
/a{3}/           // exactly 3 a's
/a{2,4}/         // 2 to 4 a's
```

## Anchors

```js
/^hello/         // must start with "hello"
/world$/         // must end with "world"
/^full string$/  // must match entire string
```

## Named Capture Groups (ES2018+)

```js
const phoneRegex = /(?<area>\d{3})-(?<exchange>\d{3})-(?<number>\d{4})/
const match = phoneRegex.exec('My phone: 555-123-4567')

if (match?.groups) {
  console.log(match.groups.area)     // '555'
  console.log(match.groups.exchange)  // '123'
  console.log(match.groups.number)   // '4567'
}
```

## Replace

```js
const messy = 'Hello!!! World???'
const clean = messy.replace(/[?!]+/g, '')
console.log(clean)  // 'Hello World'

// Replace with groups:
const name = 'John Doe'
const formatted = name.replace(/(\w+) (\w+)/, '$2, $1')
console.log(formatted)  // 'Doe, John'
```

## TypeScript: RegExp Type

```ts
const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface PhoneMatch {
  area: string
  exchange: string
  number: string
}

function parsePhone(phoneStr: string): PhoneMatch | null {
  const regex = /(?<area>\d{3})-(?<exchange>\d{3})-(?<number>\d{4})/
  const match = regex.exec(phoneStr)
  if (!match?.groups) return null
  const { area, exchange, number } = match.groups
  if (!area || !exchange || !number) return null
  return { area, exchange, number }
}
```

---

## Exercises

### Level 1

1. Test if `'hello world'` contains the word `'world'` using regex.
2. Extract the domain from `alice@example.com`.
3. Remove all digits from `'abc123def456'`.
4. Split `'one,two,,three'` by commas (ignoring empty strings).

### Level 2

1. Write a regex to validate a strong password: 8+ chars, 1 uppercase, 1 lowercase, 1 digit, 1 special.
2. Create `extractHashtags(text): string[]` in TypeScript.
3. Parse `'key=value'` pairs from a query string.

### Level 3

1. Parse markdown links: `[text](url)` → `{ text: string, url: string }`.
2. Write a TypeScript type guard `isUrl(val: string): val is string`.
3. Build a simple find-and-replace engine.

<details>
<summary>🔍 View Solutions</summary>

**Level 1:**
```js
/world/.test('hello world')           // true
'alice@example.com'.match(/@(.+)/)[1] // 'example.com'
'abc123def456'.replace(/\d/g, '')     // 'abcdef'
'one,two,,three'.split(',').filter(Boolean)  // ['one', 'two', 'three']
```

**Level 2:**
```ts
function extractHashtags(text: string): string[] {
  return [...text.matchAll(/#(\w+)/g)].map(m => m[1])
}
```

**Level 3:**
```ts
function parseMarkdownLink(text: string): { text: string; url: string } | null {
  const match = text.match(/\[([^\]]+)\]\(([^)]+)\)/)
  if (!match) return null
  return { text: match[1], url: match[2] }
}
```
</details>

---

[<< Day 16](../16_day_dates/16_day_dates.md) | [Day 18 >>](../18_day_error_handling/18_day_error_handling.md)

🌕 **Day 17 Complete!** You now write regex for validation, extraction, and replacement.
