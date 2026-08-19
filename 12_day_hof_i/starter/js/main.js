// Day 12 - Predict the callback inputs, returns, and final method result.

const scores = [42, 78, 91, 49, 65]

const passingScores = scores.filter(score => score >= 50)
const doubledScores = passingScores.map(score => score * 2)
const total = scores.reduce((runningTotal, score) => {
  return runningTotal + score
}, 0)

console.log('Original scores:', scores)
console.log('Passing scores:', passingScores)
console.log('Doubled passing scores:', doubledScores)
console.log('Total:', total)

console.log('Names:')
;['Ada', 'Grace', 'Linus'].forEach(name => {
  console.log('- ' + name)
})
