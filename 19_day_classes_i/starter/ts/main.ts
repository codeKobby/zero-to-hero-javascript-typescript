export {}

// Day 19 - TypeScript: classes and instances
class ReadingProgress {
  title: string
  completedLessons: number

  constructor(title: string, completedLessons: number) {
    this.title = title
    this.completedLessons = completedLessons
  }

  completeNextLesson(): void {
    this.completedLessons += 1
  }

  summary(): string {
    return this.title + ': ' + this.completedLessons + ' lessons complete'
  }
}

const javascript = new ReadingProgress('JavaScript', 18)
const typescript = new ReadingProgress('TypeScript', 4)

javascript.completeNextLesson()
console.log(javascript.summary())
console.log(typescript.summary())

// Try this, read the error, then restore the comment:
// const broken = new ReadingProgress(18, 'JavaScript')
