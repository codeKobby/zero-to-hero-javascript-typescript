import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const markdownFiles = []
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') continue
    const full = path.join(directory, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (entry.isFile() && entry.name.endsWith('.md')) markdownFiles.push(full)
  }
}
walk(root)
const failures = []
for (const file of markdownFiles) {
  const text = fs.readFileSync(file, 'utf8')
  for (const match of text.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1].trim().split('#')[0].split('?')[0]
    if (!target || /^(https?:|mailto:|#)/i.test(target)) continue
    const resolved = path.resolve(path.dirname(file), target)
    if (!fs.existsSync(resolved)) failures.push(`${path.relative(root, file)} -> ${target}`)
  }
}
if (failures.length) {
  console.error('Broken local Markdown links:')
  console.error(failures.join('\n'))
  process.exitCode = 1
} else {
  console.log(`Checked ${markdownFiles.length} Markdown files: all local links resolve.`)
}
