// Day 6 - Loops: predict each section before you run it.

const students = ['Ada', 'Grace', 'Linus']

console.log('Students, using an index:')
for (let index = 0; index < students.length; index = index + 1) {
  console.log(index + ': ' + students[index])
}

console.log('')
console.log('Students, using for...of:')
for (const student of students) {
  console.log('Hello, ' + student)
}

const scores = [85, 92, 78, 95, 88]
let passingCount = 0

for (const score of scores) {
  if (score >= 80) {
    passingCount = passingCount + 1
  }
}

console.log('')
console.log('Passing scores: ' + passingCount)

let countdown = 3
while (countdown > 0) {
  console.log(countdown)
  countdown = countdown - 1
}
console.log('Lift off!')

// Practice: change the scores, then predict passingCount before running.
