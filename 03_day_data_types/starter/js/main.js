// Day 3 - Predict every typeof result before running this file.

const userName = 'Ada'
const score = 42
const isLearning = true
const intentionallyEmpty = null
let notAssigned
const hugeId = 9007199254740993n
const uniqueId = Symbol('user')

console.log(typeof userName, typeof score, typeof isLearning)
console.log(typeof intentionallyEmpty, typeof notAssigned)
console.log(typeof hugeId, typeof uniqueId)

const colors = ['red']
const copiedColors = colors
copiedColors.push('blue')

console.log('colors:', colors)
console.log('copiedColors:', copiedColors)
