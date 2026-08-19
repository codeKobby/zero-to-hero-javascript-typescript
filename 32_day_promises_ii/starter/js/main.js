// Day 32 - JavaScript: promise coordination
function delayed(value, ms, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error('Operation failed'))
      else resolve(value)
    }, ms)
  })
}

async function run() {
  const all = await Promise.all([delayed('first', 15), delayed('second', 5)])
  console.log('All:', all)

  const settled = await Promise.allSettled([
    delayed('ok', 5),
    delayed('bad', 10, true)
  ])
  console.log('Settled:', settled.map((result) => result.status))

  const fastest = await Promise.race([delayed('fast', 5), delayed('slow', 20)])
  console.log('Race:', fastest)

  const firstSuccess = await Promise.any([
    delayed('fallback', 10, true),
    delayed('winner', 15)
  ])
  console.log('Any:', firstSuccess)
}

run().catch((error) => console.error('Unexpected failure:', error))
