// Day 32 — Promises II — Starter

// Promise.all
var p1 = Promise.resolve(1)
var p2 = Promise.resolve(2)
var p3 = Promise.resolve(3)

Promise.all([p1, p2, p3]).then(function (results) {
  console.log('All:', results)  // [1, 2, 3]
})

// Promise.allSettled
Promise.allSettled([
  Promise.resolve('ok'),
  Promise.reject('fail')
]).then(function (results) {
  results.forEach(function (r) {
    console.log(r.status, r.value || r.reason)
  })
})

// Promise.race with timeout
function fetchWithTimeout(promise, ms) {
  var timeout = new Promise(function (_, reject) {
    setTimeout(function () { reject(new Error('Timeout')) }, ms)
  })
  return Promise.race([promise, timeout])
}

fetchWithTimeout(Promise.resolve('done'), 3000)
  .then(function (v) { console.log(v) })
  .catch(function (e) { console.error(e.message) })
