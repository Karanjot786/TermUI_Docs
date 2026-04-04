import { useState, useEffect, useRef } from 'react'
import { Bell } from 'lucide-react'

const DISMISS_KEY = 'termui-changelog-dismissed'

interface ChangelogEntry {
  version: string
  date: string
  title: string
  type: 'feature' | 'fix' | 'breaking'
}

const RECENT_CHANGES: ChangelogEntry[] = [
  { version: '1.0.0', date: '2026-04-01', title: 'TermUI v1.0 — Stable Release', type: 'feature' },
  { version: '0.9.0', date: '2026-03-15', title: 'Motion package — spring physics', type: 'feature' },
  { version: '0.8.5', date: '2026-03-01', title: 'TSS hot-reload support', type: 'fix' },
]

const TYPE_COLORS: Record<string, string> = {
  feature: 'var(--accent)',
  fix: 'var(--cyan)',
  breaking: 'var(--rose)',
}

export function ChangelogBadge() {
  const [open, setOpen] = useState(false)
  const [hasNew, setHasNew] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dismissed = localStorage.getItem(DISMISS_KEY)
    const latestVersion = RECENT_CHANGES[0]?.version
    if (dismissed !== latestVersion) {
      setHasNew(true)
    }
  }, [])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  const handleOpen = () => {
    setOpen((o) => !o)
    if (hasNew) {
      setHasNew(false)
      localStorage.setItem(DISMISS_KEY, RECENT_CHANGES[0]?.version ?? '')
    }
  }

  return (
    <div className="nav-changelog" ref={ref}>
      <button
        className="nav-changelog-btn"
        onClick={handleOpen}
        aria-label="View changelog"
        aria-expanded={open}
        type="button"
      >
        <Bell size={15} />
        {hasNew && <span className="nav-changelog-dot" aria-label="New updates" />}
      </button>

      {open && (
        <div className="nav-changelog-dropdown" role="menu">
          <span className="nav-changelog-dropdown-glow" aria-hidden="true" />
          <div className="nav-changelog-header">
            <span className="nav-changelog-header-icon">&gt;</span>
            <span>Changelog</span>
          </div>
          <ul className="nav-changelog-list">
            {RECENT_CHANGES.map((entry) => (
              <li key={entry.version} className="nav-changelog-entry" role="menuitem">
                <span
                  className="nav-changelog-type"
                  style={{ color: TYPE_COLORS[entry.type] }}
                >
                  {entry.type}
                </span>
                <span className="nav-changelog-title">{entry.title}</span>
                <span className="nav-changelog-meta">
                  <span className="nav-changelog-version">v{entry.version}</span>
                  <span className="nav-changelog-date">{entry.date}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
