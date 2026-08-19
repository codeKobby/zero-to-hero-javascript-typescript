export {}

// Day 16 - TypeScript: dates, time zones, and formatting
const event: Date = new Date('2025-01-15T09:30:00Z')
const formatter = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'full',
  timeStyle: 'short',
  timeZone: 'Africa/Accra'
})

function parseInstant(text: string): Date | null {
  const date = new Date(text)
  return Number.isNaN(date.getTime()) ? null : date
}

function hoursBetween(start: Date, end: Date): number {
  return (end.getTime() - start.getTime()) / (1000 * 60 * 60)
}

console.log('Stored ISO:', event.toISOString())
console.log('Display:', formatter.format(event))
console.log('Hours in example:', hoursBetween(
  new Date('2025-01-15T09:30:00Z'),
  new Date('2025-01-16T21:30:00Z')
))
console.log('Invalid input:', parseInstant('not a date'))

// Try this, read the error, then restore the comment:
// console.log(parseInstant('2025-01-15T09:30:00Z').toISOString())
