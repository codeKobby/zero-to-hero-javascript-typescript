// Day 9 — JavaScript Starter: Objects & Interfaces
const myBook = {
  id: 1,
  title: 'Dune',
  author: 'Herbert',
  year: 2021,
  isAvailable: true
}

console.log(myBook.title)
console.log(myBook['author'])

// Getter pattern
const bookWrapper = {
  _book: myBook,
  get description() {
    return this._book.title + ' by ' + this._book.author
  }
}

console.log(bookWrapper.description)
