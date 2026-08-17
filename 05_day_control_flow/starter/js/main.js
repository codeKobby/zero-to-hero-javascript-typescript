// Day 5 — JavaScript Starter: Control Flow
const examScore = 85

if (examScore >= 90) {
  console.log('Grade: A')
} else if (examScore >= 80) {
  console.log('Grade: B')
} else if (examScore >= 70) {
  console.log('Grade: C')
} else {
  console.log('Grade: F')
}

// Ternary
const passStatus = examScore >= 60 ? 'Pass' : 'Fail'
console.log(passStatus)

// Switch
const day = 'Monday'
switch (day) {
  case 'Saturday':
  case 'Sunday':
    console.log('Weekend')
    break
  default:
    console.log('Workday')
}
