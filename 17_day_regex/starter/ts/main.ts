export {}

// Day 17 - TypeScript: readable regex patterns
const courseCode: RegExp = /^[A-Z]{2}-\d{3}$/

type ParsedCourseCode = {
  subject: string
  number: string
}

function isCourseCode(value: string): boolean {
  return courseCode.test(value)
}

function parseCourseCode(value: string): ParsedCourseCode | null {
  const match = /^([A-Z]{2})-(\d{3})$/.exec(value)
  if (match === null) {
    return null
  }

  const subject = match[1]
  const number = match[2]
  if (subject === undefined || number === undefined) {
    return null
  }

  return { subject, number }
}

function extractHashtags(text: string): string[] {
  return [...text.matchAll(/#([a-z]+)/gi)]
    .map((match) => match[1])
    .filter((tag): tag is string => tag !== undefined)
    .map((tag) => tag.toLowerCase())
}

const raw: string = '  Build     with  JavaScript  '
const cleaned: string = raw.replace(/\s+/g, ' ').trim()

console.log('JS-101 is valid:', isCourseCode('JS-101'))
console.log('Parsed course:', parseCourseCode('JS-101'))
console.log('Tags:', extractHashtags('Build #JavaScript with #TypeScript'))
console.log('Cleaned:', cleaned)

// Try this, read the error, then restore the comment:
// const brokenMatch = /^([A-Z]{2})-(\d{3})$/.exec('JS-101')
// console.log(brokenMatch[1])
