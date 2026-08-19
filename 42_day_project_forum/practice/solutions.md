# Day 42 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. Recursion needs a base case so the function terminates, and hostile data needs a depth or size limit so a malicious tree cannot exhaust the call stack or memory.
2. A sorted list stored beside source posts becomes a second source of truth; the two drift, so views go stale. Sorting at render time keeps one authoritative tree.
3. Array indexes change when sorting reorders the array; stable ids survive reordering and persistence, so actions always target the right item.

## Level 2

The starter demonstrates create, render, and like. Extend it with replies, sorting, persistence, and runtime validation as separate commits.

```ts
function sortPosts(posts: Post[], sortBy: ForumState['sortBy']): Post[] {
  const copy = [...posts]
  switch (sortBy) {
    case 'newest': return copy.sort((a, b) => b.id.localeCompare(a.id))
    case 'most-liked': return copy.sort((a, b) => b.likes - a.likes)
    case 'most-commented': return copy.sort((a, b) => b.comments.length - a.comments.length)
  }
}
```

A recursive storage guard:

```ts
function isComment(value: unknown): value is Comment {
  return typeof value === 'object' && value !== null &&
    'id' in value && typeof value.id === 'string' &&
    'content' in value && typeof value.content === 'string' &&
    'replies' in value && Array.isArray(value.replies) &&
    value.replies.every(isComment)
}
```

A recursive like-by-id walk mutates the comment tree by stable id and stops at depth zero:

```ts
function likeComment(comments: Comment[], id: string): boolean {
  for (const comment of comments) {
    if (comment.id === id) { comment.likes += 1; return true }
    if (likeComment(comment.replies, id)) return true
  }
  return false
}
```

## Level 3

1. A depth-limited renderer stops recursing at the limit, so a hostile tree is truncated instead of crashing the page.
2. Changing the sort option recomputes the view from the source tree at render time, so the stored state never needs a second list.
3. Recursive like-by-id mutates the comment tree wherever it lives; indexes would miss replies after a sort reordered the array.
4. A recursive storage guard proves each loaded field at runtime; a test proves behavior on real values, which the compiler cannot.

A forum is one recursive state tree — posts contain comment trees, actions mutate by stable id, views are derived at render time, and user content is never trusted as HTML.