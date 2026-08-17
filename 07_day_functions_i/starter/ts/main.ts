export {}

// Day 7: Functions
function greet(name: string): string {
  return `Hello, ${name}!`
}

const multiply = (a: number, b: number): number => a * b

function greetWithDefault(name: string, greeting: string = 'Hello'): string {
  return `${greeting}, ${name}!`
}

console.log(greet('Alice'))
console.log(multiply(3, 4))
console.log(greetWithDefault('Bob', 'Hey'))

// this binding demo
const calculator = {
  value: 10,
  regularFn: function () { return this.value },
  arrowFn: () => undefined  // arrow has no own `this`
}

console.log('regular:', calculator.regularFn())   // 10
console.log('arrow:', calculator.arrowFn())        // undefined
