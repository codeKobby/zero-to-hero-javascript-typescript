// Day 18 — JavaScript Starter: Error Handling
class ValidationError extends Error {
  constructor(message, field) {
    super(message)
    this.name = 'ValidationError'
    this.field = field
  }
}

function validateAge(age) {
  if (typeof age !== 'number') {
    throw new ValidationError('Age must be a number', 'age')
  }
  if (age < 0 || age > 150) {
    throw new ValidationError('Age must be between 0 and 150', 'age')
  }
  return age
}

try {
  var validAge = validateAge(25)
  console.log('Valid age:', validAge)
} catch (error) {
  if (error instanceof ValidationError) {
    console.log('Error on "' + error.field + '": ' + error.message)
  }
}

// Safe JSON parse
function safeParse(json) {
  try {
    return JSON.parse(json)
  } catch {
    return null
  }
}

console.log(safeParse('{"port":3000}'))
console.log(safeParse('invalid json'))
