export {}

// Day 13 - Same behavior as main.js, with the missing-result case made explicit.

const scores: number[] = [42, 78, 91, 49, 65]
const firstPassingScore: number | undefined = scores.find(score => score >= 50)
const hasExcellentScore: boolean = scores.some(score => score >= 90)
const everyScorePasses: boolean = scores.every(score => score >= 50)

if (firstPassingScore === undefined) {
  console.log('No passing score was found.')
} else {
  console.log('First passing score:', firstPassingScore)
}

console.log('Has an excellent score:', hasExcellentScore)
console.log('Every score passes:', everyScorePasses)

const originalNumbers: number[] = [10, 2, 30]
const ascendingNumbers: number[] = [...originalNumbers].sort((left, right) => left - right)

console.log('Original numbers:', originalNumbers)
console.log('Sorted copy:', ascendingNumbers)

// Try this, read the error, then restore the comment:
// console.log(firstPassingScore.toFixed(2))
