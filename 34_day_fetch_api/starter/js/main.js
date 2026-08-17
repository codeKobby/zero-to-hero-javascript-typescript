// Day 34 — Fetch API — Starter

async function getUsers() {
  var response = await fetch('https://jsonplaceholder.typicode.com/users')
  if (!response.ok) throw new Error('Failed: ' + response.status)
  var users = await response.json()
  console.log(users)
}

async function createPost(title, body, userId) {
  var response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: title, body: body, userId: userId })
  })
  var newPost = await response.json()
  console.log('Created:', newPost)
}

getUsers()
