import { Search } from 'lucide-react'

interface SearchTriggerProps {
  onOpen: () => void
}

export function SearchTrigger({ onOpen }: SearchTriggerProps) {
  return (
    <button
      className="nav-search"
      onClick={onOpen}
      aria-label="Search documentation (⌘K)"
      type="button"
    >
      <Search size={14} className="nav-search-icon" />
      <span className="nav-search-text">Search docs...</span>
      <kbd className="nav-search-kbd">
        <span>⌘</span>K
      </kbd>
    </button>
  )
}
