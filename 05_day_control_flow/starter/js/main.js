// Day 5 - Predict the first true condition before you run each section.

const score = 85

if (score >= 90) {
  console.log('Grade: A')
} else if (score >= 80) {
  console.log('Grade: B')
} else if (score >= 60) {
  console.log('Grade: Pass')
} else {
  console.log('Grade: Needs more practice')
}

const age = 17
const ageGroup = age >= 18 ? 'Adult' : 'Minor'
console.log(ageGroup)

const trafficLight = 'yellow'
switch (trafficLight) {
  case 'red':
    console.log('Stop')
    break
  case 'yellow':
    console.log('Slow down')
    break
  case 'green':
    console.log('Go')
    break
  default:
    console.log('Unknown signal')
}
