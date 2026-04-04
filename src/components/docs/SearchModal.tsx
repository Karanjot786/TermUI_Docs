import { useEffect, useRef, useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { navigation } from '../../data/navigation'
import type { NavItem } from '../../data/navigation'

interface SearchResult {
    item: NavItem
    sectionLabel: string
    matchStart: number
    matchEnd: number
}

function highlight(text: string, query: string): { before: string; match: string; after: string } | null {
    const idx = text.toLowerCase().indexOf(query.toLowerCase())
    if (idx === -1) return null
    return {
        before: text.slice(0, idx),
        match: text.slice(idx, idx + query.length),
        after: text.slice(idx + query.length),
    }
}

function search(query: string): SearchResult[] {
    if (!query.trim()) return []
    const results: SearchResult[] = []
    const q = query.toLowerCase()
    for (const section of navigation) {
        for (const item of section.children ?? []) {
            const idx = item.label.toLowerCase().indexOf(q)
            if (idx !== -1) {
                results.push({
                    item,
                    sectionLabel: section.label,
                    matchStart: idx,
                    matchEnd: idx + q.length,
                })
            }
        }
    }
    return results
}

interface SearchModalProps {
    onClose: () => void
}

export function SearchModal({ onClose }: SearchModalProps) {
    const [query, setQuery] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const results = search(query)
    const router = useRouter()
    const inputRef = useRef<HTMLInputElement>(null)

    // Focus input on mount
    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    // Reset selection when results change
    useEffect(() => {
        setSelectedIndex(0)
    }, [query])

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            } else if (e.key === 'ArrowDown') {
                e.preventDefault()
                setSelectedIndex((i) => Math.min(i + 1, results.length - 1))
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setSelectedIndex((i) => Math.max(i - 1, 0))
            } else if (e.key === 'Enter' && results[selectedIndex]) {
                e.preventDefault()
                router.navigate({ to: results[selectedIndex].item.href })
                onClose()
            }
        }
        document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [results, selectedIndex, onClose, router])

    // Group results by section
    const grouped: Record<string, SearchResult[]> = {}
    for (const result of results) {
        if (!grouped[result.sectionLabel]) grouped[result.sectionLabel] = []
        grouped[result.sectionLabel].push(result)
    }

    return (
        <div className="search-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Search docs">
            <div className="search-modal" onClick={(e) => e.stopPropagation()}>
                <div className="search-input-row">
                    <span className="search-prompt" aria-hidden="true">›</span>
                    <input
                        ref={inputRef}
                        className="search-input"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search docs..."
                        aria-label="Search documentation"
                        autoComplete="off"
                        spellCheck={false}
                    />
                    <kbd className="search-esc">esc</kbd>
                </div>

                {query && (
                    <div className="search-results" role="listbox">
                        {results.length === 0 ? (
                            <div className="search-no-results">No results for "{query}"</div>
                        ) : (
                            Object.entries(grouped).map(([section, items]) => (
                                <div key={section} className="search-result-group">
                                    <div className="search-result-group-label">{section}</div>
                                    {items.map((result) => {
                                        const hl = highlight(result.item.label, query)
                                        const isSelected = results.indexOf(result) === selectedIndex
                                        return (
                                            <div
                                                key={result.item.href}
                                                className={`search-result-item${isSelected ? ' selected' : ''}`}
                                                role="option"
                                                aria-selected={isSelected}
                                                onClick={() => {
                                                    router.navigate({ to: result.item.href })
                                                    onClose()
                                                }}
                                            >
                                                <span className="search-result-icon" aria-hidden="true">›</span>
                                                <span className="search-result-name">
                                                    {hl ? (
                                                        <>
                                                            {hl.before}
                                                            <mark>{hl.match}</mark>
                                                            {hl.after}
                                                        </>
                                                    ) : result.item.label}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            ))
                        )}
                    </div>
                )}

                {!query && (
                    <div className="search-empty">
                        <span className="search-empty-hint">Start typing to search documentation…</span>
                    </div>
                )}

                <div className="search-footer" aria-hidden="true">
                    <span>↑↓ navigate</span>
                    <span>↵ open</span>
                    <span>esc close</span>
                </div>
            </div>
        </div>
    )
}
