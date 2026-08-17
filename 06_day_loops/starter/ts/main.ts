export {}

// Day 6: Loops & Iteration
const scores: number[] = [85, 92, 78, 95, 88]

// for...of
for (const score of scores) {
  console.log(`Score: ${score}`)
}

// Array methods
const passingScores: number[] = scores.filter(s => s >= 80)
const average: number = scores.reduce((sum, s) => sum + s, 0) / scores.length
const highest: number = scores.find(s => s === Math.max(...scores))!

console.log(`Passing: ${passingScores}, Average: ${average}, Highest: ${highest}`)

// Object iteration
interface StudentResult {
  name: string
  grade: number
}

const results: StudentResult[] = [
  { name: 'Alice', grade: 95 },
  { name: 'Bob', grade: 82 },
  { name: 'Charlie', grade: 78 }
]

for (const [index, student] of results.entries()) {
  console.log(`${index + 1}. ${student.name}: ${student.grade}`)
}
