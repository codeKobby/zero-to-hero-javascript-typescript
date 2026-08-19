// Day 19 - JavaScript: classes and instances
class ReadingProgress {
  constructor(title, completedLessons) {
    this.title = title
    this.completedLessons = completedLessons
  }

  completeNextLesson() {
    this.completedLessons += 1
  }

  summary() {
    return this.title + ': ' + this.completedLessons + ' lessons complete'
  }
}

const javascript = new ReadingProgress('JavaScript', 18)
const typescript = new ReadingProgress('TypeScript', 4)

javascript.completeNextLesson()
console.log(javascript.summary())
console.log(typescript.summary())
