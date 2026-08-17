export {}

// Day 18: Error Handling & Custom Errors
class ValidationError extends Error {
  constructor(
    message: string,
    public readonly field: string
  ) {
    super(message)
    this.name = 'ValidationError'
  }
}

function validateAge(age: unknown): number {
  if (typeof age !== 'number') {
    throw new ValidationError('Age must be a number', 'age')
  }
  if (age < 0 || age > 150) {
    throw new ValidationError('Age must be between 0 and 150', 'age')
  }
  return age
}

try {
  const validAge = validateAge(25)
  console.log(`Valid age: ${validAge}`)
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(`Error on "${error.field}": ${error.message}`)
  }
}

// Safe JSON parse
function safeParse<T>(json: string): T | null {
  try {
    return JSON.parse(json) as T
  } catch {
    return null
  }
}

interface Config {
  port: number
  host: string
}

const config = safeParse<Config>('{"port":3000,"host":"localhost"}')
console.log('Config:', config)

const bad = safeParse<Config>('invalid json')
console.log('Bad parse:', bad)
