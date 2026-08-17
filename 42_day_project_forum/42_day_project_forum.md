<div align="center">
  <h1>Day 42: Project — Discussion Forum</h1>
</div>

[<< Day 41](../41_day_project_recipe/41_day_project_recipe.md) | [Day 43 >>](43_day_project_ecommerce/43_day_project_ecommerce.md)

---

## 🎯 Project Goal

Build a **Discussion Forum** with threaded comments, likes, and state management using closures and TypeScript.

---

## Features

1. Create posts with title and content
2. Add threaded comments (replies to replies)
3. Like/unlike posts and comments
4. User profiles with avatars
5. Sort by newest, most liked, most commented
6. Persist everything in localStorage

---

## Data Model

```ts
interface Post {
  id: string
  title: string
  content: string
  author: Author
  likes: number
  isLiked: boolean
  comments: Comment[]
  createdAt: number
}

interface Comment {
  id: string
  content: string
  author: Author
  likes: number
  isLiked: boolean
  replies: Comment[]
  createdAt: number
}

interface Author {
  name: string
  avatar: string
}

interface ForumState {
  posts: Post[]
  sortBy: 'newest' | 'most-liked' | 'most-commented'
}
```

---

## Exercises

### Level 1

Build basic post creation and display with localStorage.

### Level 2

Add threaded comments, likes, sorting. Use TypeScript throughout.

### Level 3

Add markdown support for content, real-time character count, mention system (@username).

---

🎉 **Day 42 Complete!**

🎉 **Progress**: 42/45 days complete
