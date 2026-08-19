export {}

// Day 6 - The TypeScript version has the same behavior as main.js.
// Types help prevent using the wrong kind of value; they do not replace tracing.

const students: string[] = ['Ada', 'Grace', 'Linus']

console.log('Students, using an index:')
for (let index: number = 0; index < students.length; index = index + 1) {
  console.log(index + ': ' + students[index])
}

console.log('')
console.log('Students, using for...of:')
for (const student of students) {
  console.log('Hello, ' + student)
}

const scores: number[] = [85, 92, 78, 95, 88]
let passingCount: number = 0

for (const score of scores) {
  if (score >= 80) {
    passingCount = passingCount + 1
  }
}

console.log('')
console.log('Passing scores: ' + passingCount)

let countdown: number = 3
while (countdown > 0) {
  console.log(countdown)
  countdown = countdown - 1
}
console.log('Lift off!')

// Try this, read the TypeScript error, then put the comment back:
// scores.push('not a number')
