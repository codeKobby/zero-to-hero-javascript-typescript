export {}

// Day 11 - TypeScript: destructuring, rest, and spread
type Learner = {
  name: string
  track: 'frontend' | 'backend'
  completedLessons: number
  nickname?: string
}

const learner: Learner = {
  name: 'Mina',
  track: 'frontend',
  completedLessons: 11
}

const { name, track, nickname = 'new learner' } = learner
console.log(name + ' is studying ' + track + ' as ' + nickname + '.')

const [firstScore, , thirdScore = 0, ...remainingScores]: number[] = [92, 86, 74, 68]
console.log('First: ' + firstScore + '; third: ' + thirdScore)
console.log('Remaining scores:', remainingScores)

const { name: learnerName, ...progress } = learner
console.log(learnerName + "'s progress:", progress)

const updatedLearner: Learner = { ...learner, completedLessons: 12 }
console.log('Original lessons:', learner.completedLessons)
console.log('Updated lessons:', updatedLearner.completedLessons)

// Try this, read the error, then restore the comment:
// const { learnerId = "i123435" } = learner
