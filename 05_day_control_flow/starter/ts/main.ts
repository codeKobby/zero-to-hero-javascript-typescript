export {}

const score: number = 85

if (score >= 90) {
  console.log('Grade: A')
} else if (score >= 80) {
  console.log('Grade: B')
} else if (score >= 60) {
  console.log('Grade: Pass')
} else {
  console.log('Grade: Needs more practice')
}

const age: number = 17
const ageGroup: string = age >= 18 ? 'Adult' : 'Minor'
console.log(ageGroup)

type TrafficLight = 'red' | 'yellow' | 'green'
const trafficLights: TrafficLight[] = ['red', 'yellow', 'green']
const trafficLight: TrafficLight = trafficLights[1] ?? 'red'

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
}

// Try this, read the error, then restore the comment:
// const invalidLight: TrafficLight = 'blue'
