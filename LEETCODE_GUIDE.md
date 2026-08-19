# Interview practice guide

LeetCode is a supplement, not a gate. First learn the concept in the lesson and solve the local practice task; then use one interview problem to apply the same pattern. Problem links can change, so confirm the current statement on LeetCode before starting.

Before your first problem, read the two sections that follow — they teach the rules of the platform and how to read the starter code, so a problem never surprises you.

## How LeetCode evaluates your answer

- Every problem hands you a **starter**: a function stub (or a class stub) with JSDoc comments. Your job is to fill in the body — and only the body.
- The platform runs **hidden test cases**: it calls your function with different inputs and compares what it returns (or, for a few JavaScript problems, checks behavior). You never see these tests; the examples in the statement are only a sample.
- **Keep the signature.** Do not rename the function or class, do not change the parameter list, and do not delete the starter. The tests call it by that exact name.
- **Do not uncomment the example block** at the bottom of the starter. It is a comment showing how the code is used — documentation, not code. The tests already call your functions; uncommenting or pasting that block adds top-level code that runs at load time and usually breaks the submission.
- **Do not add top-level code** that runs when the file loads. Only define the function/class and any helpers. A stray top-level `console.log` runs on every test and pollutes the output.
- The **constraints** (input sizes) are part of the statement and decide which approach is fast enough: small inputs allow simple loops; large inputs (for example `10^5` elements) usually need a faster approach.
- If you prefer to solve in your editor first, copy the stub into a scratch file and work there — then paste only your finished function body back.

## Reading the starter code: the `@` annotations

LeetCode's JavaScript starter uses **JSDoc**: comments that document types, like `@param` and `@return`. They are plain comments — the JavaScript engine ignores them, but the editor and the site use them to show hints. You never edit them, and they never run.

Common tags you will see:

| Tag | Meaning | Example |
| --- | --- | --- |
| `@param {Type} name` | Documents one parameter and its type | `@param {number[]} nums` — parameter `nums` is an array of numbers |
| `@return {Type}` | Documents what the function returns (alias `@returns`) | `@return {number}` returns a number; `@return {void}` returns nothing (`undefined`); `@return {Function}` returns a function; `@return {Promise}` returns a promise |
| `@type {Type}` | Declares the type of a variable or expression | `@type {Function}` above a prototype method assignment |
| `@constructor` | Marks a function meant to be called with `new` | Used on the class-style problems |
| `@param {...Type} name` | Documents a rest parameter | `@param {...number} nums` — any number of number arguments |

JSDoc type expressions are small and readable: primitives like `string`, `number`, `boolean`; arrays like `number[]`; `any` (any type); `void` (returns nothing); unions like `string \| number`; and capitalized names like `Function`, `Object`, `Promise`. So `@param {number[]} nums` reads "the parameter named `nums` is an array of numbers".

### A starter code, read line by line

Day 19's problem uses the most comment-heavy starter. Here it is:

```js
/**
 * @param {number[]} nums
 * @return {void}
 */
var ArrayWrapper = function(nums) {

};
```

- `@param {number[]} nums` — the constructor receives one array of numbers. Store it on the instance (`this.nums = nums`).
- `@return {void}` — a constructor does not return a value; it sets up the instance. No `return` needed.
- `var ArrayWrapper = function(nums) {}` — the function you implement. Keep this name and this parameter.

The starter then asks you to add two methods on the prototype:

```js
/**
 * @return {number}
 */
ArrayWrapper.prototype.valueOf = function() {

}

/**
 * @return {string}
 */
ArrayWrapper.prototype.toString = function() {

}
```

- `ArrayWrapper.prototype.valueOf` returns a `number`. The `+` operator calls `valueOf` on objects, so `obj1 + obj2` runs both `valueOf` methods and adds their results — make it return the sum of the stored numbers.
- `ArrayWrapper.prototype.toString` returns a `string`. `String(obj)` calls `toString`, so it should return the array in its literal form, like `[1,2]`.

And the example block:

```js
/**
 * const obj1 = new ArrayWrapper([1,2]);
 * const obj2 = new ArrayWrapper([3,4]);
 * obj1 + obj2; // 10
 * String(obj1); // "[1,2]"
 * String(obj2); // "[3,4]"
 */
```

This is documentation of how the problem is tested — it is **not** code. Do not uncomment it. The hidden tests already perform exactly these calls. Notice the comment teaches the two facts that make the problem solvable: `+` on two wrappers triggers `valueOf` (so the result is the sum, `10`), and `String(...)` triggers `toString` (so the result is the bracketed list).

This course teaches class syntax, and the same shape can be written as a class:

```js
class ArrayWrapper {
  constructor(nums) {
    this.nums = nums
  }
  valueOf() { /* sum of this.nums */ }
  toString() { /* "[1,2]" style text */ }
}
```

Either style passes, as long as the constructor takes `nums` and the two methods return the right values. The simplest path for a beginner is to fill the stub as given; if you convert it to a class, keep the name `ArrayWrapper` and the two method names.

## How to approach any problem

A repeatable session for one problem:

1. **Read the statement twice.** The first read is for the headline, the second for the constraints and edge cases.
2. **Restate it** in your own words: inputs, outputs, constraints, examples. Write the restated version down.
3. **Trace the examples by hand** before writing any code.
4. **Write a brute-force idea first** — the simplest correct approach — and state its complexity (`O(n)`, `O(n²)`, ...).
5. **Optimize only if the constraints demand it.** Large input sizes (for example `10^5` items) rule out `O(n²)`.
6. **Implement in JavaScript**, using the pattern the matching lesson taught.
7. **Test the given examples and then edge cases**: empty input, one element, duplicates, extremes, invalid-looking input.
8. **Explain why the algorithm is correct** — in one or two sentences, why does it always return the right answer?
9. Only then compare with a reference solution (for example the NeetCode explanation when the hint provides one).

## Day-by-day ladder

Every problem below asks you to write a function, and a problem is only assigned once the lesson has already taught every skill it needs — so the ladder starts at Day 7, when functions are introduced. Days marked `—` have no problem: Days 1-6 predate functions, the browser/API and project days teach topics LeetCode does not model (and the projects are their own practice), and some later classics need data structures (trees, tries, heaps) that this course does not cover. Problems marked `NeetCode` also have a worked explanation on the [NeetCode roadmap](https://neetcode.io/roadmap); the rest are still on the roadmap but without a dedicated NeetCode page, so use LeetCode's statement and hints.

| Day | Problem | LeetCode | NeetCode hint |
| --- | --- | --- | --- |
| 1 | — | — | — |
| 2 | — | — | — |
| 3 | — | — | — |
| 4 | — | — | — |
| 5 | — | — | — |
| 6 | — | — | — |
| 7 | 9 Palindrome Number | https://leetcode.com/problems/palindrome-number/ | NeetCode roadmap |
| 8 | 2629 Function Composition | https://leetcode.com/problems/function-composition/ | NeetCode roadmap |
| 9 | 242 Valid Anagram | https://leetcode.com/problems/valid-anagram/ | https://neetcode.io/problems/is-anagram/question |
| 10 | 217 Contains Duplicate | https://leetcode.com/problems/contains-duplicate/ | https://neetcode.io/problems/duplicate-integer/question |
| 11 | — | — | — |
| 12 | 2626 Array Reduce Transformation | https://leetcode.com/problems/array-reduce-transformation/ | NeetCode roadmap |
| 13 | 56 Merge Intervals | https://leetcode.com/problems/merge-intervals/ | https://neetcode.io/problems/merge-intervals/question |
| 14 | 125 Valid Palindrome | https://leetcode.com/problems/valid-palindrome/ | https://neetcode.io/problems/is-palindrome/question |
| 15 | 202 Happy Number | https://leetcode.com/problems/happy-number/ | NeetCode roadmap |
| 16 | 1185 Day of the Week | https://leetcode.com/problems/day-of-the-week/ | NeetCode roadmap |
| 17 | 520 Detect Capital | https://leetcode.com/problems/detect-capital/ | NeetCode roadmap |
| 18 | 2704 To Be Or Not To Be | https://leetcode.com/problems/to-be-or-not-to-be/ | NeetCode roadmap |
| 19 | 2695 Array Wrapper | https://leetcode.com/problems/array-wrapper/ | NeetCode roadmap |
| 20 | 155 Min Stack | https://leetcode.com/problems/min-stack/ | https://neetcode.io/problems/minimum-stack/question |
| 21 | — | — | — |
| 22 | — | — | — |
| 23 | — | — | — |
| 24 | — | — | — |
| 25 | — | — | — |
| 26 | — | — | — |
| 27 | — | — | — |
| 28 | 2635 Apply Transform Over Each Element in Array | https://leetcode.com/problems/apply-transform-over-each-element-in-array/ | NeetCode roadmap |
| 29 | — | — | — |
| 30 | — | — | — |
| 31 | 2723 Add Two Promises | https://leetcode.com/problems/add-two-promises/ | NeetCode roadmap |
| 32 | 2636 Promise Pool | https://leetcode.com/problems/promise-pool/ | NeetCode roadmap |
| 33 | 2637 Promise Time Limit | https://leetcode.com/problems/promise-time-limit/ | NeetCode roadmap |
| 34 | 2715 Timeout Cancellation | https://leetcode.com/problems/timeout-cancellation/ | NeetCode roadmap |
| 35 | 2621 Sleep | https://leetcode.com/problems/sleep/ | NeetCode roadmap |
| 36 | 271 Encode and Decode Strings | https://leetcode.com/problems/encode-and-decode-strings/ | https://neetcode.io/problems/string-encode-and-decode/question |
| 37 | 238 Product of Array Except Self | https://leetcode.com/problems/product-of-array-except-self/ | https://neetcode.io/problems/products-of-array-discluding-self/question |
| 38 | 347 Top K Frequent Elements | https://leetcode.com/problems/top-k-frequent-elements/ | https://neetcode.io/problems/top-k-elements-in-list/question |
| 39 | 981 Time Based Key-Value Store | https://leetcode.com/problems/time-based-key-value-store/ | https://neetcode.io/problems/time-based-key-value-store/question |
| 40 | — | — | — |
| 41 | — | — | — |
| 42 | — | — | — |
| 43 | — | — | — |
| 44 | — | — | — |
| 45 | — | — | — |

Use one easy problem after Days 1-10, one or two per week after that, and keep a short explanation beside each solution. Do not copy solutions into lesson files; keep your own work in a separate folder or private notes.

Useful starting points: [LeetCode](https://leetcode.com/problemset/), [NeetCode roadmap](https://neetcode.io/roadmap), [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide), and the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html).