import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const banner = '![Course banner](../assets/course-banner.png)'
let changed = 0
for (const name of fs.readdirSync(root)) {
  if (!/^\d{2}_day_/.test(name)) continue
  const directory = path.join(root, name)
  if (!fs.statSync(directory).isDirectory()) continue
  const lesson = fs.readdirSync(directory).find(file => /^\d{2}_day_.*\.md$/.test(file))
  if (!lesson) continue
  const file = path.join(directory, lesson)
  const text = fs.readFileSync(file, 'utf8')
  if (text.includes('../assets/course-banner.png')) continue
  const lines = text.split(/\r?\n/)
  const headingIndex = lines.findIndex(line => /^#|<h1/i.test(line))
  if (headingIndex < 0) continue
  lines.splice(headingIndex + 1, 0, '', banner, '')
  fs.writeFileSync(file, lines.join('\n'))
  changed += 1
}
console.log(`Added course banner reference to ${changed} lesson files.`)
