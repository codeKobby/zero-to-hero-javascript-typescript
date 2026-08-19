export {}

// Day 14 - TypeScript: working with text
const rawTags: string = ' JavaScript, TypeScript, testing '
const tags: string[] = rawTags
  .split(',')
  .map((tag) => tag.trim().toLowerCase())

console.log('Tags:', tags)
console.log('Original input:', rawTags)

const learner: string = 'Mina'
const completed: number = 14
console.log(`${learner} has completed ${completed} lessons.`)

const filename: string = 'lesson-notes.md'
console.log('File extension:', filename.slice(-3))
console.log('Has dot:', filename.includes('.'))

function isYes(answer: string): boolean {
  return answer.trim().toLowerCase() === 'yes'
}

function displayLabel(value: unknown): string {
  if (typeof value !== 'string') {
    return 'No label'
  }

  return value.trim() || 'No label'
}

console.log('YES is accepted:', isYes(' YES '))
console.log('Unknown label:', displayLabel('  Mina  '))

// Try this, read the error, then restore the comment:
// function brokenLabel(value: unknown): string {
//   return value.trim()
// }
