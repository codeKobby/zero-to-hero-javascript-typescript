// Day 31 — Promises I — Starter

// Create a Promise
var myPromise = new Promise(function (resolve, reject) {
  var success = true
  if (success) {
    resolve('Data loaded!')
  } else {
    reject(new Error('Failed to load'))
  }
})

myPromise
  .then(function (data) { console.log(data) })
  .catch(function (err) { console.error(err) })
  .finally(function () { console.log('Done') })

// Chaining
function getUser(id) {
  return new Promise(function (resolve) {
    setTimeout(function () { resolve({ id: id, name: 'Alice' }) }, 500)
  })
}

getUser(1)
  .then(function (user) {
    console.log('User:', user.name)
    return getUser(2)
  })
  .then(function (user2) {
    console.log('User 2:', user2.name)
  })
  .catch(function (err) { console.error(err) })
