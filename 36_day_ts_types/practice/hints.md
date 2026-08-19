# Day 36 hints

Use only when you are stuck — the learning happens in the attempt.

1. Start with a small union, narrow it at runtime, then model success and failure with a discriminant such as `status` or `ok`.
2. An interface describes an object shape; a type alias describes unions, tuples, primitives, and composition.
3. A runtime guard proves shape; an assertion (`as`) only claims it.
4. Optional (`?`) means the property may be absent — it never means "any value is acceptable".
5. Add a new status to your union and let the compiler show you every `switch` that needs it.