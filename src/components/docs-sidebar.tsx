'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import type * as PageTree from 'fumadocs-core/page-tree'

const FOLDER_COLORS: Record<string, string> = {
  'getting-started':   '#9898b8',
  'guides':            '#9898b8',
  'core':              '#00ff88',
  'jsx':               '#ffaa00',
  'widgets':           '#00d4ff',
  'ui':                '#aa66ff',
  'ui-components':     '#aa66ff',
  'store':             '#ffaa00',
  'tss':               '#00d4ff',
  'tss-theming':       '#00d4ff',
  'router':            '#00ff88',
  'data':              '#ff4466',
  'motion':            '#aa66ff',
  'adapters':          '#00d4ff',
  'testing':           '#00ff88',
  'create-termui-app': '#00ff88',
}

function slug(item: PageTree.Folder): string {
  return item.$ref?.folder?.split('/').pop()
    ?? String(item.name).toLowerCase().replace(/[\s_]+/g, '-')
}

function Folder({ item, pathname }: { item: PageTree.Folder; pathname: string }) {
  const s = slug(item)
  const color = FOLDER_COLORS[s] ?? '#9898b8'
  const isUnder = pathname.startsWith(`/docs/${s}`)
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
          <span className="section-path-name">{s}</span>
          <span className="section-path-slash">/</span>
        </span>
        <span className="chevron">{open ? '▾' : '▸'}</span>
      </button>
      <div className={`sidebar-items${open ? '' : ' collapsed'}`}>
        {item.children.map((node, i) => <Node key={i} node={node} pathname={pathname} />)}
      </div>
    </div>
  )
}

function Item({ item, pathname }: { item: PageTree.Item; pathname: string }) {
  const active = pathname === item.url
  return (
    <div className="sidebar-item">
      <Link href={item.url} className={`sidebar-link${active ? ' active' : ''}`} aria-current={active ? 'page' : undefined}>
        {item.name}
      </Link>
    </div>
  )
}

function Node({ node, pathname }: { node: PageTree.Node; pathname: string }) {
  if (node.type === 'folder') return <Folder item={node} pathname={pathname} />
  if (node.type === 'page') return <Item item={node} pathname={pathname} />
  if (node.type === 'separator' && node.name) return <div className="sidebar-separator-label">{node.name}</div>
  return null
}

export function DocsSidebar({ tree }: { tree: PageTree.Root }) {
  const pathname = usePathname()
  return (
    <nav className="sidebar" aria-label="Documentation">
      <div className="sidebar-header">
        <span className="sidebar-header-prompt">$ docs</span>
        <span className="sidebar-header-cursor" />
      </div>
      {tree.children.map((node, i) => <Node key={i} node={node} pathname={pathname} />)}
    </nav>
  )
}
