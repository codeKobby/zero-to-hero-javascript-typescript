// Day 6 — JavaScript Starter: Loops & Iteration
const scores = [85, 92, 78, 95, 88]

// for...of
for (const score of scores) {
  console.log('Score:', score)
}

// Array methods
const passingScores = scores.filter(s => s >= 80)
const average = scores.reduce((sum, s) => sum + s, 0) / scores.length
console.log('Passing:', passingScores, '| Average:', average)

// forEach with index
const names = ['Alice', 'Bob', 'Charlie']
names.forEach((name, i) => console.log(i + ': ' + name))
