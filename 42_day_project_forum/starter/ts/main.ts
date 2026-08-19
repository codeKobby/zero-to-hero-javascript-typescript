export {}

// Day 42 - TypeScript: forum baseline
type Comment = { id: string; content: string; replies: Comment[] }
type Post = { id: string; title: string; content: string; likes: number; comments: Comment[] }
const posts: Post[] = []
const form = document.querySelector('#post-form')
const title = document.querySelector('#title')
const content = document.querySelector('#content')
const list = document.querySelector('#post-list')

if (!(form instanceof HTMLFormElement) || !(title instanceof HTMLInputElement) ||
    !(content instanceof HTMLTextAreaElement) || !(list instanceof HTMLUListElement)) {
  throw new Error('Forum starter HTML is incomplete.')
}
const ui = { title, content, list }

function render(): void {
  ui.list.replaceChildren()
  if (posts.length === 0) {
    const empty = document.createElement('li')
    empty.textContent = 'No posts yet.'
    ui.list.append(empty)
    return
  }
  for (const post of posts) {
    const item = document.createElement('li')
    const heading = document.createElement('h2')
    heading.textContent = post.title
    const body = document.createElement('p')
    body.textContent = post.content
    const like = document.createElement('button')
    like.type = 'button'
    like.dataset.id = post.id
    like.textContent = 'Like (' + post.likes + ')'
    item.append(heading, body, like)
    ui.list.append(item)
  }
}

form.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault()
  const postTitle = ui.title.value.trim()
  const postContent = ui.content.value.trim()
  if (postTitle === '' || postContent === '') return
  posts.push({ id: crypto.randomUUID(), title: postTitle, content: postContent, likes: 0, comments: [] })
  ui.title.value = ''
  ui.content.value = ''
  render()
})

list.addEventListener('click', (event: MouseEvent) => {
  const target = event.target
  if (!(target instanceof HTMLButtonElement)) return
  const post = posts.find((item) => item.id === target.dataset.id)
  if (post !== undefined) post.likes += 1
  render()
})

render()
