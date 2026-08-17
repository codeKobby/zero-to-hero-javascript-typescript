// Day 14 — JavaScript Starter: Strings
var sentence = 'Hello, World! Welcome to JavaScript'

// Template literals
var name14 = 'Alice'
var age14 = 25
console.log(name14 + ' is ' + age14 + ' years old')

// String methods
console.log(sentence.slice(0, 5))
console.log(sentence.at(-1))
console.log(sentence.split(' '))
console.log(sentence.includes('World'))
console.log(sentence.toUpperCase())

// padStart/padEnd
console.log('5'.padStart(3, '0'))
console.log('Hi'.padEnd(10, '.'))
