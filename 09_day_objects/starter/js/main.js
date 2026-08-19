const originalBook = {
  title: 'Dune',
  author: 'Frank Herbert',
  isAvailable: true,
  describe() {
    return this.title + ' by ' + this.author
  }
}

const bookKey = 'title'
console.log(originalBook[bookKey])
console.log(originalBook.describe())

const checkedOutBook = {
  ...originalBook,
  isAvailable: false
}

console.log('Original available:', originalBook.isAvailable)
console.log('Copy available:', checkedOutBook.isAvailable)
