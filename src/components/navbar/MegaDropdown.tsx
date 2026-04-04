import { useEffect, useRef, type LucideIcon } from 'react'
import { Link } from '@tanstack/react-router'

export interface MegaItem {
  label: string
  href: string
  icon: LucideIcon
  description?: string
  accent?: string
}

export interface MegaSection {
  title: string
  items: MegaItem[]
}

interface MegaDropdownProps {
  sections: MegaSection[]
  onClose: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export function MegaDropdown({ sections, onClose, onMouseEnter, onMouseLeave }: MegaDropdownProps) {
  const ref = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  const isWide = sections.length > 2

  return (
    <div
      className="mega-dropdown"
      ref={ref}
      role="menu"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Glow border top */}
      <span className="mega-dropdown-glow" aria-hidden="true" />

      <div className={`mega-dropdown-grid ${isWide ? 'mega-dropdown-wide' : ''}`}>
        {sections.map((section) => (
          <div key={section.title} className="mega-section">
            <span className="mega-section-title">
              <span className="mega-section-slash">/</span>
              {section.title}
            </span>
            <ul className="mega-section-list">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="mega-item"
                    role="menuitem"
                    onClick={onClose}
                  >
                    <span
                      className="mega-item-icon"
                      style={item.accent ? { color: item.accent } : undefined}
                    >
                      <item.icon size={16} />
                    </span>
                    <span className="mega-item-content">
                      <span className="mega-item-label">{item.label}</span>
                      {item.description && (
                        <span className="mega-item-desc">{item.description}</span>
                      )}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
