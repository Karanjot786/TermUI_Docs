import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { htmlTableToMarkdown } from './lib/html-table.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DOCS = join(ROOT, 'content', 'docs')

function walk(dir, acc) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) walk(full, acc)
    else if (name.endsWith('.mdx')) acc.push(full)
  }
  return acc
}

let converted = 0
let skipped = 0
const skippedFiles = []

for (const file of walk(DOCS, [])) {
  const src = readFileSync(file, 'utf-8')
  let changed = false
  const out = src.replace(/<table[\s\S]*?<\/table>/gi, (block) => {
    const md = htmlTableToMarkdown(block)
    if (md === null) { skipped++; if (!skippedFiles.includes(file)) skippedFiles.push(file); return block }
    converted++
    changed = true
    return `\n${md}\n`
  })
  if (changed) {
    writeFileSync(file, out.replace(/\n{3,}/g, '\n\n'), 'utf-8')
  }
}

console.log(`[convert-tables] converted ${converted} tables, skipped ${skipped}`)
if (skippedFiles.length) {
  console.log('[convert-tables] left as HTML (review manually):')
  for (const f of skippedFiles) console.log('  ' + f.replace(ROOT + '/', ''))
}
