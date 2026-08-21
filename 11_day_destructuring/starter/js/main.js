// Day 11 - JavaScript: destructuring, rest, and spread
const learner = {
  name: "Mina",
  track: "frontend",
  completedLessons: 11,
};

const { name, track } = learner;
console.log(name + " is studying " + track + ".");

const [firstScore, , thirdScore = 0, ...remainingScores] = [92, 86, 74, 68];
console.log("First: " + firstScore + "; third: " + thirdScore);
console.log("Remaining scores:", remainingScores);

const { name: learnerName, ...progress } = learner;
console.log(learnerName + "'s progress:", progress);

const updatedLearner = { ...learner, completedLessons: 12 };
console.log("Original lessons:", learner.completedLessons);
console.log("Updated lessons:", updatedLearner.completedLessons);

const { learnerId = "i123435" } = learner;

console.log(learnerId);
console.log(learner)