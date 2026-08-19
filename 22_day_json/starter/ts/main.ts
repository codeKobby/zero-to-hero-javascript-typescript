export {}

// Day 22 - TypeScript: parse, validate, then use JSON
type Learner = {
  name: string
  completedLessons: number
}

function tryParseJson(text: string): { ok: boolean; value: unknown | null } {
  try {
    return { ok: true, value: JSON.parse(text) }
  } catch {
    return { ok: false, value: null }
  }
}

function isLearner(value: unknown): value is Learner {
  return typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    'completedLessons' in value &&
    typeof value.name === 'string' &&
    typeof value.completedLessons === 'number'
}

function toPublicProfile(learner: Learner): Learner {
  return {
    name: learner.name,
    completedLessons: learner.completedLessons
  }
}

const result = tryParseJson('{"name":"Mina","completedLessons":22}')
if (result.ok && isLearner(result.value)) {
  console.log('Trusted learner:', toPublicProfile(result.value))
  console.log('Stored JSON:', JSON.stringify(toPublicProfile(result.value)))
} else {
  console.log('The data was not a usable learner.')
}

// Try this, read the error, then restore the comment:
// const value: unknown = JSON.parse('{"name":"Mina","completedLessons":22}')
// console.log(value.name)
