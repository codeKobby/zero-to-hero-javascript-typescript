// Day 42 — Project: Discussion Forum — Starter

var forumPosts = []

function createPost(title, content, author) {
  var post = {
    id: Date.now().toString(),
    title: title,
    content: content,
    author: author,
    likes: 0,
    comments: [],
    createdAt: new Date().toISOString()
  }
  forumPosts.push(post)
  return post
}

function addComment(postId, content, author) {
  var post = forumPosts.find(function (p) { return p.id === postId })
  if (post) {
    post.comments.push({
      id: Date.now().toString(),
      content: content,
      author: author,
      createdAt: new Date().toISOString()
    })
  }
}

console.log('Discussion Forum ready!')
