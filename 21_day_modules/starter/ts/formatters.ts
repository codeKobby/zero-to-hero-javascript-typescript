export type Learner = {
  name: string
  completedLessons: number
}

export function formatLearner(learner: Learner): string {
  return learner.name + ' has completed ' + learner.completedLessons + ' lessons.'
}

function pluralizeLesson(count: number): string {
  return count === 1 ? 'lesson' : 'lessons'
}

export function formatProgress(learner: Learner): string {
  return learner.name + ' completed ' + learner.completedLessons + ' ' +
    pluralizeLesson(learner.completedLessons) + '.'
}
