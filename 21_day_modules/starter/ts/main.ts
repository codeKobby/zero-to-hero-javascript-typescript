import { formatLearner, formatProgress, type Learner } from './formatters.js'

// Day 21 - TypeScript: modules with named exports
const learner: Learner = { name: 'Mina', completedLessons: 21 }

console.log(formatLearner(learner))
console.log(formatProgress(learner))

// Try this, read the error, then restore the comment:
// import { pluralizeLesson } from './formatters.js'
