// Day 27 — JavaScript Starter: Events II — Delegation, Forms, Keyboard
// Run in browser with index.html

function getFormData(form) {
  var data = {}
  var formData = new FormData(form)
  formData.forEach(function (value, key) {
    data[key] = value
  })
  return data
}

function createKeyboardShortcuts() {
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault()
      console.log('Save triggered')
    }
    if (e.key === 'Escape') {
      console.log('Close/cancel triggered')
    }
  })
}

// Usage (browser):
// var form = document.getElementById('myForm')
// form.addEventListener('submit', function (e) {
//   e.preventDefault()
//   console.log(getFormData(form))
// })

console.log('Day 27: Events II — open in browser to test')
