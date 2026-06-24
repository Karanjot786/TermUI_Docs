import type { ReactNode } from 'react'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { source } from '@/lib/source'
import { baseOptions } from '@/lib/layout.shared'

const sidebarBanner = (
  <div className="sidebar-header">
    <span className="sidebar-header-prompt">$ docs</span>
    <span className="sidebar-header-cursor" />
  </div>
)

export default function DocsShellLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions} sidebar={{ banner: sidebarBanner }}>
      {children}
    </DocsLayout>
  )
}
