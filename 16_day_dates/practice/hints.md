# Day 16 hints

Use only when you are stuck — the learning happens in the attempt.

1. Create the `Date`, call `getTime`, and pass the result to `Number.isNaN`.
2. Keep the formatter in the function or create it once outside the function. Use `dateStyle` for a readable result and specify `Africa/Accra`.
3. Parse both values, subtract their timestamps, and divide by `3_600_000` (milliseconds per hour). Decide whether the result should be signed or absolute.
4. For `daysBetween`, divide the millisecond difference by `86_400_000` and round; comment that this assumes UTC and ignores zone boundaries.
5. A parser with a possible failure should return `Date | null`. Check for `null` before using the result.