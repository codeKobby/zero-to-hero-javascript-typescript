// Day 19 — JavaScript Starter: Classes & OOP
class Animal {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  speak() {
    return this.name + ' makes a sound'
  }
}

class Dog extends Animal {
  constructor(name, age, breed) {
    super(name, age)
    this.breed = breed
  }

  speak() {
    return this.name + ' barks!'
  }

  fetch(item) {
    return this.name + ' fetches the ' + item
  }
}

var rex = new Dog('Rex', 5, 'German Shepherd')
console.log(rex.speak())
console.log(rex.fetch('ball'))
console.log(rex instanceof Animal)
