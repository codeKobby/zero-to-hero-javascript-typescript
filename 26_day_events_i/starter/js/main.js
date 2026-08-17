// Day 26 — JavaScript Starter: Events I
// Run in browser with index.html

function on(el, type, handler) {
  el.addEventListener(type, handler)
}

function debounce(fn, ms) {
  var timer
  return function () {
    var args = arguments
    var ctx = this
    clearTimeout(timer)
    timer = setTimeout(function () { fn.apply(ctx, args) }, ms)
  }
}

// Usage (browser):
// var btn = document.querySelector('button')
// on(btn, 'click', function (e) { console.log('Clicked!', e.clientX) })
//
// var input = document.querySelector('input')
// var logInput = debounce(function (val) { console.log(val) }, 300)
// on(input, 'input', function (e) { logInput(e.target.value) })

console.log('Day 26: Events — open in browser to test')
