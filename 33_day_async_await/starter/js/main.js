// Day 33 — Async/Await — Starter

async function loadData() {
  try {
    var response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    var data = await response.json()
    console.log(data)
  } catch (error) {
    console.error('Failed:', error)
  }
}

// Parallel with await
async function loadAll() {
  var [users, posts] = await Promise.all([
    fetch('https://jsonplaceholder.typicode.com/users').then(function (r) { return r.json() }),
    fetch('https://jsonplaceholder.typicode.com/posts').then(function (r) { return r.json() })
  ])
  console.log('Users:', users.length, 'Posts:', posts.length)
}

loadData()
