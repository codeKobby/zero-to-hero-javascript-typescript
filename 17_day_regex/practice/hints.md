# Day 17 hints

Use only when you are stuck — the learning happens in the attempt.

1. The entire input should match, so use a start anchor (`^`) and an end anchor (`$`).
2. `matchAll` needs the global flag. Capture the letters after `#` and map each match to capture group one (`match[1]`).
3. Whitespace has the shorthand class `\s`. One or more is written with `+`.
4. For `firstTag`, call `exec` — but remember its result may be `null`, so return `null` immediately in that path.
5. For a slug, anchor both ends and repeat the allowed set with `+`.