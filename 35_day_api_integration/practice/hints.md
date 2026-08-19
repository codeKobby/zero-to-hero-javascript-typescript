# Day 35 hints

Use only when you are stuck — the learning happens in the attempt.

1. Store completed responses in a `Map` using the endpoint as the key.
2. Model request state as a union with a `status` discriminator.
3. Keep page and total data in the API response type; do not infer pagination from the current array.
4. Parse as `unknown` and use a type guard for every required `Todo` property.
5. The client returns `unknown`; feature code guards into domain types.
6. A cache needs a key, an invalidation rule, and a stale-data decision.