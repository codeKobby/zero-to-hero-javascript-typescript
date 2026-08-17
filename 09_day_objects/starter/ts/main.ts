export {}

// Day 9: Objects & Interfaces
interface Book {
  id: number
  title: string
  author: string
  year: number
  isAvailable: boolean
  genre?: string  // optional field
}

const myBook: Book = {
  id: 1,
  title: 'Dune',
  author: 'Herbert',
  year: 2021,
  isAvailable: true,
  genre: 'Sci-Fi'
}

// Accessing
console.log(myBook.title)
console.log(myBook['author'])

// Getter pattern with object
const bookWrapper = {
  _book: myBook,
  get description(): string {
    return `${this._book.title} by ${this._book.author}`
  }
}

console.log(bookWrapper.description)
