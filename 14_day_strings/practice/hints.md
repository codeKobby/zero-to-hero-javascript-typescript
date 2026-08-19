# Day 14 hints

Use only when you are stuck — the learning happens in the attempt.

1. Split the name on one space. The first letter of each returned string is at position zero.
2. Split at commas before trimming and lowercasing each array item.
3. Compare lowercase versions of both the filename and the requested extension.
4. `isYes`: trim and lowercase a copy, then compare with `===`.
5. First check `typeof value`. Then trim it and use the logical OR to pick the fallback for an empty result.
6. `indexOf('-')` gives you the position to stop at; `slice(0, position)` cuts before it.
7. For anagrams: `split('')`, `sort()`, then `join('')` — then compare.