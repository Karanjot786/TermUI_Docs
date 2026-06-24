'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import type * as PageTree from 'fumadocs-core/page-tree'

const FOLDER_COLORS: Record<string, string> = {
  'getting-started': '#9898b8',
  'guides':          '#9898b8',
  'core':            '#00ff88',
  'jsx':             '#ffaa00',
  'widgets':         '#00d4ff',
  'ui':              '#aa66ff',
  'ui-components':   '#aa66ff',
  'store':           '#ffaa00',
  'tss':             '#00d4ff',
  'tss-theming':     '#00d4ff',
  'router':          '#00ff88',
  'data':            '#ff4466',
  'motion':          '#aa66ff',
  'adapters':        '#00d4ff',
  'testing':         '#00ff88',
  'create-termui-app': '#00ff88',
}

function toSlug(name: string): string {
  return name.toLowerCase().replace(/[\s_]+/g, '-')
}

export function SidebarFolderItem({
  item,
  children,
}: {
  item: PageTree.Folder
  children: ReactNode
}) {
  const pathname = usePathname()
  const displayName = String(item.name)
  // prefer $ref.folder last segment (e.g. "content/docs/core" → "core")
  const slug = item.$ref?.folder?.split('/').pop() ?? toSlug(displayName)
  const color = FOLDER_COLORS[slug] ?? '#9898b8'
  const isUnder = pathname.startsWith(`/docs/${slug}`)
  const [open, setOpen] = useState(isUnder || item.defaultOpen || false)

  return (
    <div className="sidebar-section">
      <button
        className={`sidebar-section-label${open ? ' open' : ''}${isUnder ? ' has-active' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="section-icon" style={{ color }}>●</span>
        <span className="section-path">
          <span className="section-path-prefix">~/</span>
          <span className="section-path-name">{slug}</span>
          <span className="section-path-slash">/</span>
        </span>
        <span className="chevron">{open ? '▾' : '▸'}</span>
      </button>
      <div className={`sidebar-items${open ? '' : ' collapsed'}`}>
        {children}
      </div>
    </div>
  )
}

export function SidebarPageItem({ item }: { item: PageTree.Item }) {
  const pathname = usePathname()
  const isActive = pathname === item.url

  return (
    <div className="sidebar-item">
      <Link
        href={item.url}
        className={`sidebar-link${isActive ? ' active' : ''}`}
        aria-current={isActive ? 'page' : undefined}
      >
        {item.name}
      </Link>
    </div>
  )
}

export function SidebarSeparatorItem({ item }: { item: PageTree.Separator }) {
  if (!item.name) return null
  return (
    <div className="sidebar-separator-label">{item.name}</div>
  )
}
