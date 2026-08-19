// Day 33 - JavaScript: async/await over local Promises
function delayed(value, ms) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

async function loadUser(id) {
  return delayed({ id, name: 'User ' + id }, 10)
}

async function run() {
  const user = await loadUser(1)
  console.log('Sequential:', user.name)

  const [first, second] = await Promise.all([
    loadUser(2),
    loadUser(3)
  ])
  console.log('Parallel:', first.name, second.name)

  try {
    throw new Error('Example failure')
  } catch (error) {
    if (error instanceof Error) console.log('Handled:', error.message)
  }
}

run().catch((error) => console.error('Unexpected:', error))
