// Day 7 — JavaScript Starter: Functions
function greet(name) {
  return 'Hello, ' + name + '!'
}

const multiply = (a, b) => a * b

function greetWithDefault(name, greeting) {
  greeting = greeting || 'Hello'
  return greeting + ', ' + name + '!'
}

console.log(greet('Alice'))
console.log(multiply(3, 4))
console.log(greetWithDefault('Bob', 'Hey'))
