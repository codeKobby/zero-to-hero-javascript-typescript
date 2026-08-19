// Day 21 - JavaScript: modules with named exports
import { formatLearner, formatProgress } from './formatters.js'

const learner = { name: 'Mina', completedLessons: 21 }

console.log(formatLearner(learner))
console.log(formatProgress(learner))
