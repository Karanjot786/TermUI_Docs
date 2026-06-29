'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { searchDocs, type SearchDoc, type SearchHit } from '@/lib/search'

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [index, setIndex] = useState<SearchDoc[] | null>(null)
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (open && !index) {
      fetch('/search-index.json').then((r) => r.json()).then(setIndex).catch(() => setIndex([]))
    }
    if (open) setTimeout(() => inputRef.current?.focus(), 0)
  }, [open, index])

  const hits: SearchHit[] = useMemo(() => (index ? searchDocs(index, q) : []), [index, q])
  useEffect(() => { setActive(0) }, [q])

  if (!open) return null

  const go = (hit: SearchHit) => { onClose(); router.push(`/docs/${hit.doc.slug}`) }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    else if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, hits.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
    else if (e.key === 'Enter' && hits[active]) { e.preventDefault(); go(hits[active]!) }
  }

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()} onKeyDown={onKey}>
        <input
          ref={inputRef}
          className="search-input"
          placeholder="Search docs..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search docs"
        />
        <ul className="search-results">
          {hits.map((hit, i) => (
            <li key={hit.doc.slug}>
              <button
                className={`search-result${i === active ? ' is-active' : ''}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(hit)}
                type="button"
              >
                <span className="search-result-title">{hit.doc.title}</span>
                <span className="search-result-section">{hit.doc.section}</span>
                <span className="search-result-snippet">{hit.snippet}</span>
              </button>
            </li>
          ))}
          {q && index && hits.length === 0 && <li className="search-empty">No results for &quot;{q}&quot;</li>}
        </ul>
      </div>
    </div>
  )
}
