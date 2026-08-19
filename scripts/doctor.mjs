import { existsSync } from 'node:fs'
import process from 'node:process'

const [major, minor] = process.versions.node.split('.').map(Number)
const supported = major === 20
  ? minor >= 19
  : major >= 22

const requiredFiles = [
  'package-lock.json',
  'tsconfig.json',
  '01_day_setup/starter/js/main.js',
  '01_day_setup/starter/ts/main.ts'
]
const missing = requiredFiles.filter((file) => !existsSync(file))

console.log('Course environment check')
console.log('Node:', process.versions.node)

if (!supported) {
  console.error('Unsupported Node.js version. Use Node 20.19+ or Node 22.12+.')
  process.exitCode = 1
}

if (missing.length > 0) {
  console.error('Missing required files:', missing.join(', '))
  process.exitCode = 1
}

if (process.exitCode !== 1) {
  console.log('Environment is ready. Run npm.cmd run check next.')
}
