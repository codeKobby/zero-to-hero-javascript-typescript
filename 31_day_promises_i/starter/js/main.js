// Day 31 - JavaScript: one future result
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function getUser(id) {
  return delay(10).then(() => ({ id, name: 'User ' + id }))
}

console.log('A')
getUser(1)
  .then((user) => getUser(user.id + 1))
  .then((user) => console.log('Next user:', user.name))
  .catch((error) => console.error('Failed:', error))
  .finally(() => console.log('Done'))
console.log('B')
