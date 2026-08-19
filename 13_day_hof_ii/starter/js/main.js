// Day 13 - Predict each method's result and whether it changes the source array.

const scores = [42, 78, 91, 49, 65]
const firstPassingScore = scores.find(score => score >= 50)
const hasExcellentScore = scores.some(score => score >= 90)
const everyScorePasses = scores.every(score => score >= 50)

console.log('First passing score:', firstPassingScore)
console.log('Has an excellent score:', hasExcellentScore)
console.log('Every score passes:', everyScorePasses)

const originalNumbers = [10, 2, 30]
const ascendingNumbers = [...originalNumbers].sort((left, right) => left - right)

console.log('Original numbers:', originalNumbers)
console.log('Sorted copy:', ascendingNumbers)
