export {}

const userName: string = 'Ada'
const score: number = 42
const isLearning: boolean = true
const intentionallyEmpty: null = null
let notAssigned: undefined
const hugeId: bigint = 9007199254740993n
const uniqueId: symbol = Symbol('user')

console.log(typeof userName, typeof score, typeof isLearning)
console.log(typeof intentionallyEmpty, typeof notAssigned)
console.log(typeof hugeId, typeof uniqueId)

const colors: string[] = ['red']
const copiedColors: string[] = colors
copiedColors.push('blue')

console.log('colors:', colors)
console.log('copiedColors:', copiedColors)

let selectedScore: number | null = 87
if (selectedScore !== null) {
  console.log(selectedScore.toFixed(2))
}

// Try this, read the error, then restore the comment:
// const wrongScore: number = 'forty-two'
