# Day 23 hints

Use only when you are stuck — the learning happens in the attempt.

1. Save JSON text with `setItem`; load with `getItem` and return a fallback for `null`.
2. Store an object containing `value` and `expiry`. Compare `Date.now()` with the expiry when loading and remove the stale entry.
3. Reuse the object/non-null/property checks from Day 22, then validate each property with `typeof` or an exact-value check.
4. A type predicate has the form `value is Preferences` and includes real property checks — never a bare `as Preferences` assertion.
5. Catch storage calls in `try/catch`; blocked or full storage must not break the page.
6. `localStorage.clear()` wipes every key for the origin, including data from unrelated parts of the app — remove only the failing key.