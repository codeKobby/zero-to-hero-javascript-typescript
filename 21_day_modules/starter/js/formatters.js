export function formatLearner(learner) {
  return learner.name + ' has completed ' + learner.completedLessons + ' lessons.'
}

function pluralizeLesson(count) {
  return count === 1 ? 'lesson' : 'lessons'
}

export function formatProgress(learner) {
  return learner.name + ' completed ' + learner.completedLessons + ' ' +
    pluralizeLesson(learner.completedLessons) + '.'
}
