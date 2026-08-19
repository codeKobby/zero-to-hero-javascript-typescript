// Day 18 - JavaScript: expected failures and recovery
function tryParseJson(text) {
  try {
    return { ok: true, value: JSON.parse(text) }
  } catch {
    return { ok: false, value: null }
  }
}

function divide(total, people) {
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
  }
}
