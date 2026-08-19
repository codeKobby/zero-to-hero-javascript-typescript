export {}

// Day 12 - Same behavior as main.js, with checked callback contracts.

const scores: number[] = [42, 78, 91, 49, 65]

const passingScores: number[] = scores.filter((score: number): boolean => {
  return score >= 50
})

const doubledScores: number[] = passingScores.map((score: number): number => {
  return score * 2
})

const total: number = scores.reduce((runningTotal: number, score: number): number => {
  return runningTotal + score
}, 0)

console.log('Original scores:', scores)
console.log('Passing scores:', passingScores)
console.log('Doubled passing scores:', doubledScores)
console.log('Total:', total)

const names: string[] = ['Ada', 'Grace', 'Linus']
console.log('Names:')
names.forEach((name: string): void => {
  console.log('- ' + name)
})

// Try this, read the error, then restore the comment:
// scores.map(score => score.toUpperCase())
