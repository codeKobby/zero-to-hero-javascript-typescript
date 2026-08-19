# Day 5 worked solutions

## Level 1 — Mechanical

1. `if (true)` → prints `A`
2. `if (0)` → `0` is falsy → prints `B`
3. `false && true` is `false` → first branch skipped; `true || false` is `true` → prints `B`
4. `n > 5` is true → `s` is `'big'`
5. With no `break` in the `'a'` case, both cases print. `'a'` matches, runs its body, falls through, runs `'b'`'s body.
6. `null` is falsy → prints `B`
7. `'0'` is a non-empty string → truthy → prints `A`

## Level 2

1. Temperature classifier:

~~~js
const temp = 12

if (temp < 0) {
  console.log('Freezing')
} else if (temp < 10) {
  console.log('Cold')
} else if (temp < 25) {
  console.log('Warm')
} else {
  console.log('Hot')
}
// temp = 12 → Warm
~~~

2. Adult/minor ternary:

~~~js
const age = 17
const ageGroup = age >= 18 ? 'Adult' : 'Minor'
console.log(ageGroup) // Minor
~~~

3. Traffic light switch:

~~~js
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
// yellow → Slow down
~~~

4. Intentional fall-through:

~~~js
const day = 'Saturday'

switch (day) {
  case 'Saturday': // falls through intentionally:
  case 'Sunday':   // both share the Weekend body
    console.log('Weekend')
    break
  default:
    console.log('Weekday')
}
~~~

5. TypeScript plan union:

~~~ts
type Plan = 'free' | 'pro' | 'enterprise'

function describePlan(plan: Plan): string {
  switch (plan) {
    case 'free':
      return 'Basic features'
    case 'pro':
      return 'Advanced features'
    case 'enterprise':
      return 'Dedicated support'
    default:
      return 'Unknown plan'
  }
}
~~~

6. Grade reporter trace:

~~~js
const score = 95

if (score >= 90) { console.log('A') }
else if (score >= 80) { console.log('B') }
else if (score >= 60) { console.log('Pass') }
else { console.log('Fail') }

// 95 → A (>= 90 true first)
// 85 → B (90 false, 80 true)
// 65 → Pass
// 40 → Fail (all conditions false → else)
~~~

## Level 3

1. Login gate:

~~~js
const isLoggedIn = false
const hasPaidPlan = true
const isAdmin = false

if (isAdmin) {
  console.log('Admin panel')
} else if (isLoggedIn && hasPaidPlan) {
  console.log('Dashboard (paid)')
} else if (isLoggedIn) {
  console.log('Dashboard (free)')
} else {
  console.log('Sign-in page')
}
~~~

2. Pricing story:

~~~js
// A ternary fits: one short two-way value, assigned immediately.
const displayPrice = isDiscountActive ? price * 0.8 : price

// Multi-step discount logic needs a real if/else:
let finalPrice = price
if (isDiscountActive) {
  finalPrice = price * 0.8
  if (price > 100) finalPrice -= 10 // second step: if/else is clearer
}
~~~

3. Weekday/weekend fall-through:

~~~js
const day = 'Wednesday'

switch (day) {
  case 'Monday':    // intentional fall-through:
  case 'Tuesday':   // weekdays share one body
  case 'Wednesday':
  case 'Thursday':
  case 'Friday':
    console.log('Weekday')
    break
  case 'Saturday':  // intentional fall-through:
  case 'Sunday':    // weekends share one body
    console.log('Weekend')
    break
}
~~~

4. Exhaustive traffic light function:

~~~ts
type TrafficLight = 'red' | 'yellow' | 'green'

function safetyMessage(light: TrafficLight): string {
  switch (light) {
    case 'red':
      return 'Stop'
    case 'yellow':
      return 'Slow down'
    case 'green':
      return 'Go'
  }
}

// const bad: TrafficLight = 'blue' // error: not assignable to TrafficLight
~~~

5. Dead-code detector:

~~~js
const score = 95

if (score >= 60) {
  console.log('Pass')
} else if (score >= 90) {
  // DEAD CODE: 95 >= 60 matched first, so the >= 90 branch
  // can never be reached. Only the first true branch runs.
  console.log('A')
}
~~~
