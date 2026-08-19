// Day 22 - JavaScript: parse, validate, then use JSON
function tryParseJson(text) {
  try {
    return { ok: true, value: JSON.parse(text) }
  } catch {
    return { ok: false, value: null }
  }
}

function isLearner(value) {
  return typeof value === 'object' &&
    value !== null &&
    typeof value.name === 'string' &&
    typeof value.completedLessons === 'number'
}

function toPublicProfile(learner) {
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
