export interface SearchDoc {
  slug: string
  title: string
  description: string
  section: string
  headings: string[]
  body: string
}

export interface SearchHit {
  doc: SearchDoc
  score: number
  snippet: string
}

// Dependency-free scored substring search. Fine for ~65 docs. If the corpus
// grows past a few hundred pages or needs typo tolerance, swap in Orama here
// without touching the callers.
export function searchDocs(index: SearchDoc[], query: string, limit = 8): SearchHit[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const terms = q.split(/\s+/)

  const hits: SearchHit[] = []
  for (const doc of index) {
    const title = doc.title.toLowerCase()
    const desc = doc.description.toLowerCase()
    const headings = doc.headings.join(' ').toLowerCase()
    const body = doc.body.toLowerCase()

    let score = 0
    for (const t of terms) {
      if (title.includes(t)) score += title === t ? 12 : 8
      if (headings.includes(t)) score += 4
      if (desc.includes(t)) score += 3
      if (body.includes(t)) score += 1
    }
    if (score === 0) continue

    const hitField = desc || doc.body
    const idx = hitField.toLowerCase().indexOf(terms[0]!)
    const start = Math.max(0, idx - 30)
    const snippet = (start > 0 ? '...' : '') + hitField.slice(start, start + 120).trim()
    hits.push({ doc, score, snippet })
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, limit)
}
