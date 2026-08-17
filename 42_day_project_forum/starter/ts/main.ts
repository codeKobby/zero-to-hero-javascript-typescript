export {}

// Day 42 — Project: Discussion Forum — TypeScript Starter

interface Author {
  name: string
  avatar: string
}

interface Comment {
  id: string
  content: string
  author: Author
  likes: number
  replies: Comment[]
  createdAt: number
}

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

const posts: Post[] = []

function createPost(title: string, content: string, author: Author): Post {
  const post: Post = {
    id: Date.now().toString(),
    title, content, author,
    likes: 0, isLiked: false,
    comments: [], createdAt: Date.now()
  }
  posts.push(post)
  return post
}

console.log('Discussion Forum — TypeScript Starter ready!')
