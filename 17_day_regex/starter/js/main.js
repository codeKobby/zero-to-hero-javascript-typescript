// Day 17 - JavaScript: readable regex patterns
const courseCode = /^[A-Z]{2}-\d{3}$/

function isCourseCode(value) {
  return courseCode.test(value)
}

function extractHashtags(text) {
  return [...text.matchAll(/#([a-z]+)/gi)]
    .map((match) => match[1].toLowerCase())
}

const raw = '  Build     with  JavaScript  '
const cleaned = raw.replace(/\s+/g, ' ').trim()

console.log('JS-101 is valid:', isCourseCode('JS-101'))
console.log('js-101 is valid:', isCourseCode('js-101'))
console.log('Tags:', extractHashtags('Build #JavaScript with #TypeScript'))
console.log('Cleaned:', cleaned)
