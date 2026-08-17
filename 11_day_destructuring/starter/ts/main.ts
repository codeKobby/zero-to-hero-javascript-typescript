export {}

// Day 11: Destructuring, Spread & Rest
interface UserData {
  id: number
  name: string
  email: string
  role: string
}

const currentUser: UserData = { id: 1, name: 'Alice', email: 'alice@test.com', role: 'admin' }

// Object destructuring with defaults
const { name: userName, role: userRole = 'guest' } = currentUser
console.log(`${userName} (${userRole})`)

// Rest in destructuring
const { id: _id, ...remainingFields } = currentUser
console.log(remainingFields)

// Array destructuring
const [firstScore, secondScore, ...restScores] = [95, 87, 72, 68, 91]
console.log(`Top two: ${firstScore}, ${secondScore}`)
console.log(`Rest: ${restScores}`)

// Swap
let x: number = 1
let y: number = 2
;[x, y] = [y, x]
console.log(`x=${x}, y=${y}`)
