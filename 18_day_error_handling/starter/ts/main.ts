export {}

// Day 18 - TypeScript: expected failures and recovery
type ParseResult = {
  ok: boolean
  value: unknown | null
}

function tryParseJson(text: string): ParseResult {
  try {
    return { ok: true, value: JSON.parse(text) }
  } catch {
    return { ok: false, value: null }
  }
}

function divide(total: number, people: number): number {
  if (!Number.isInteger(people) || people <= 0) {
    throw new Error('people must be a positive whole number')
  }

  return total / people
}

console.log('Valid JSON:', tryParseJson('{"theme":"dark"}'))
console.log('Invalid JSON:', tryParseJson('{not valid json}'))

try {
  console.log('Each person receives:', divide(12, 3))
  divide(12, 0)
} catch (error) {
  console.log('Could not split the total safely.')
  if (error instanceof Error) {
    console.log('Developer detail:', error.message)
  } else {
    console.log('Developer detail: non-Error value thrown')
  }
}

// Try this, read the error, then restore the comment:
// try {
//   JSON.parse('{bad}')
// } catch (error) {
//   console.log(error.message)
// }
