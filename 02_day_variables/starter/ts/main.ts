export {}

// Day 2 - Same runtime behavior as main.js, with TypeScript assignment checks.

const courseName: string = 'JavaScript foundations'
let completedLessons: number | string = 1

console.log('Course:', courseName)
console.log('Completed lessons:', completedLessons)

completedLessons = completedLessons + 1
console.log('Completed lessons after study:', completedLessons)

let futureGoal: string | undefined
console.log('Before assignment:', futureGoal)
futureGoal = 'Build a useful app'
console.log('After assignment:', futureGoal)

// This demonstrates var's early-access behavior. Do not copy this style.
console.log('var before assignment:', oldCounter)
var oldCounter: number | undefined = undefined
oldCounter = 3
console.log('var after assignment:', oldCounter)

// Try this, read the error, then restore the comment:
completedLessons = "2"


// console.log(d)