// Day 14 - JavaScript: working with text
const rawTags = ' JavaScript, TypeScript, testing '
const tags = rawTags
  .split(',')
  .map((tag) => tag.trim().toLowerCase())

console.log('Tags:', tags)
console.log('Original input:', rawTags)

const learner = 'Mina'
const completed = 14
console.log(`${learner} has completed ${completed} lessons.`)

const filename = 'lesson-notes.md'
console.log('File extension:', filename.slice(-3))
console.log('Has dot:', filename.includes('.'))

function isYes(answer) {
  return answer.trim().toLowerCase() === 'yes'
}

console.log('YES is accepted:', isYes(' YES '))
