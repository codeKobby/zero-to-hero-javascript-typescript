// Day 16 — JavaScript Starter: Dates & Time
var today = new Date()
console.log('ISO:', today.toISOString())
console.log('Date string:', today.toDateString())

// Formatting with Intl
var formatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
})
console.log('Formatted:', formatter.format(today))

// Date calculations
function daysBetween(a, b) {
  var msPerDay = 1000 * 60 * 60 * 24
  return Math.abs(b.getTime() - a.getTime()) / msPerDay
}

var birthday = new Date('1995-06-15')
console.log('Days since birthday:', Math.floor(daysBetween(birthday, today)))
