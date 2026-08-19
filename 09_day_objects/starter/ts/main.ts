export {}

interface Book {
  readonly id: number
  title: string
  author: string
  isAvailable: boolean
  genre?: string
  describe(): string
}

const originalBook: Book = {
  id: 1,
  title: 'Dune',
  author: 'Frank Herbert',
  isAvailable: true,
  describe() {
    return this.title + ' by ' + this.author
  }
}

const bookKey: keyof Book = 'title'
console.log(originalBook[bookKey])
console.log(originalBook.describe())

const checkedOutBook: Book = {
  ...originalBook,
  isAvailable: false
}

console.log('Original available:', originalBook.isAvailable)
console.log('Copy available:', checkedOutBook.isAvailable)

// Try this, read the error, then restore the comment:
// originalBook.id = 2
