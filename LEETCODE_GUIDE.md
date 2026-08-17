# LeetCode Practice Guide

## Why LeetCode?

After each day's lesson, practice what you learned on LeetCode. This builds:
- **Problem-solving skills** — Apply concepts to real problems
- **Interview readiness** — Same problems companies ask
- **Confidence** — See your progress in real-time

---

## Getting Started

### 1. Create Account
1. Go to [leetcode.com](https://leetcode.com)
2. Sign up (GitHub/Google/email)
3. Free tier is plenty for learning

### 2. First Time Setup
- **Language**: Select JavaScript or TypeScript in editor dropdown
- **Editor settings**: Enable "Auto-save" and "Line numbers"
- **Theme**: Dark mode recommended

### 3. How to Practice
```
1. Read problem → understand input/output
2. Write pseudocode in comments
3. Code solution
4. Test with examples
5. Submit → analyze runtime/memory
6. Read Discuss → learn better approaches
```

---

## Day-by-Day LeetCode Mapping

### Phase 1: Foundations (Days 1-10)

| Day | Topic | Search on LeetCode | Difficulty |
|-----|-------|-------------------|------------|
| 1 | Setup | — | — |
| 2 | Variables | "Add Digits" (258) | Easy |
| 3 | Data Types | "Reformat Date" (1507) | Easy |
| 4 | Operators | "Sign of Product" (1822) | Easy |
| 5 | Control Flow | "Convert Temperature" (2469) | Easy |
| 6 | Loops | "Number of Good Pairs" (1512) | Easy |
| 7 | Functions I | "Add Two Integers" (2235) | Easy |
| 8 | Functions II | "Pass the Pillow" (2582) | Easy |
| 9 | Objects | "Prefix Common Array" (2657) | Medium |
| 10 | Arrays | "Contains Duplicate" (217) | Easy |

### Phase 2: Core Concepts (Days 11-20)

| Day | Topic | Search on LeetCode | Difficulty |
|-----|-------|-------------------|------------|
| 11 | Destructuring | "Maximum Value Ordered Triplet" (2873) | Medium |
| 12 | Higher-Order Functions I | "Filter Elements from Array" (2634) | Easy |
| 13 | Higher-Order Functions II | "Apply Transform" (2635) | Easy |
| 14 | Strings | "Reverse String" (344) | Easy |
| 15 | Numbers | "Factorial Trailing Zeroes" (172) | Medium |
| 16 | Dates | "Minimize String Length" (2716) | Easy |
| 17 | Regex | "Odd String Difference" (2451) | Easy |
| 18 | Error Handling | "Create Hello World Function" (2667) | Easy |
| 19 | Classes I | "Group By" (2631) | Medium |
| 20 | Classes II | "Add Two Promises" (2723) | Easy |

### Phase 3: DOM & Projects (Days 21-30)

| Day | Topic | Search on LeetCode | Difficulty |
|-----|-------|-------------------|------------|
| 21 | Modules | "Array Reduce Transformation" (2626) | Easy |
| 22 | JSON | "Minimum Operations to Form Subsequence" (2835) | Medium |
| 23 | Web Storage | "Counter" (2620) | Easy |
| 24 | DOM Selection | Practice in browser dev tools | — |
| 25 | DOM Manipulation | Build: Todo app (Day 29) | — |
| 26 | Events I | Build: Interactive components | — |
| 27 | Events II | Build: Form validation | — |
| 28 | Functional Programming | "Apply Transform" (2635) | Easy |
| 29 | Project: Todo | "Count of Integers" (2719) | Hard |
| 30 | Project: Weather | "Get Maximum in Generated Array" (1646) | Easy |

### Phase 4: Async (Days 31-35)

| Day | Topic | Search on LeetCode | Difficulty |
|-----|-------|-------------------|------------|
| 31 | Promises I | "Call Function with Custom Context" (2693) | Medium |
| 32 | Promises II | "Add Two Promises" (2723) | Easy |
| 33 | Async/Await | "Promise Time Limit" (2637) | Medium |
| 34 | Fetch API | "Maximum Number of Fish in Grid" (2658) | Medium |
| 35 | API Integration | "Cousins in Binary Tree II" (2641) | Medium |

### Phase 5: TypeScript Deep Dive (Days 36-40)

| Day | Topic | Search on LeetCode | Difficulty |
|-----|-------|-------------------|------------|
| 36 | TS Types | Use TS for all above problems | — |
| 37 | Generics | "Group By" (2631) | Medium |
| 38 | Utility Types | Type-only practice | — |
| 39 | Advanced Types | Type-only practice | — |
| 40 | Best Practices | Refactor previous solutions with TS | — |

### Phase 6: Capstones (Days 41-45)

| Day | Topic | Search on LeetCode | Difficulty |
|-----|-------|-------------------|------------|
| 41 | Recipe Book | Full-stack practice | — |
| 42 | Forum | System design basics | — |
| 43 | E-commerce | "Sum Multiples" (2652) | Easy |
| 44 | Countries | Data processing practice | — |
| 45 | Capstone | Your choice! | — |

---

## Recommended Learning Path

### Beginner (First 2 weeks)
```
Day 2-3  → Add Digits (258), Reformat Date (1507)
Day 4-5  → Sign of Product (1822), Convert Temperature (2469)
Day 6-7  → Number of Good Pairs (1512), Add Two Integers (2235)
Day 8-9  → Pass the Pillow (2582), Prefix Common Array (2657)
Day 10   → Contains Duplicate (217), Missing Number (268)
```

### Intermediate (Weeks 3-4)
```
Day 11-13 → Maximum Value Ordered Triplet (2873), Filter Elements (2634), Apply Transform (2635)
Day 14-16 → Reverse String (344), Reverse String II (541), Factorial Trailing Zeroes (172)
Day 17-18 → Odd String Difference (2451), Create Hello World Function (2667)
Day 19-20 → Group By (2631), Add Two Promises (2723)
```

### Advanced (Weeks 5-6)
```
Day 31-33 → Call Function with Custom Context (2693), Add Two Promises (2723), Promise Time Limit (2637)
Day 34-35 → Maximum Number of Fish in Grid (2658), Cousins in Binary Tree II (2641)
Day 36-40 → Rewrite all above in TypeScript!
```

---

## Tips for Success

### 1. Don't Just Solve — Understand
```javascript
// Bad: Copy-paste solution
// Good: Add comments explaining WHY
function addDigits(num: number): number {
  // Digital root formula: if num === 0 return 0
  // else return 1 + (num - 1) % 9
  if (num === 0) return 0;
  return 1 + (num - 1) % 9;
}
```

### 2. Track Progress
- LeetCode shows streak, problems solved, topics covered
- Aim for **1-2 problems per day** after each lesson

### 3. Use TypeScript
- Select TypeScript in editor
- Practice types: `function add(a: number, b: number): number`

### 4. Read Discussions
- After solving, read "Discuss" tab
- Learn: multiple approaches, time/space complexity, patterns

### 5. Patterns to Master
| Pattern | Problems |
|---------|----------|
| Two Pointers | 167, 15, 11 |
| Sliding Window | 3, 76, 438 |
| Prefix Sum | 560, 523, 974 |
| Hash Map | 1, 15, 49 |
| Recursion/Backtracking | 22, 46, 78 |

---

## Resources

- [LeetCode Patterns](https://leetcode.com/discuss/study-guide/458695/Dynamic-Programming-Patterns) — Pattern guides
- [NeetCode 150](https://neetcode.io/practice) — Curated 150 problems
- [Blind 75](https://leetcode.com/discuss/general-discussion/460599/Blind-75-LeetCode-Questions) — Classic interview set
- [TypeScript on LeetCode](https://leetcode.com/discuss/study-guide/2378751/TypeScript-for-LeetCode) — TS tips

---

## Quick Commands

```bash
# After solving locally, test with:
npx tsx your-solution.ts

# Type-check:
npx tsc --noEmit your-solution.ts
```

---

**Remember:** Consistency > Intensity. 15 minutes daily beats 3 hours weekly.

Start with Day 2's problem today: [258. Add Digits](https://leetcode.com/problems/add-digits/) 🚀