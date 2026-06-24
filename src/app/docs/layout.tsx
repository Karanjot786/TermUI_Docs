import type { ReactNode } from 'react'
import { source } from '@/lib/source'
import { DocsSidebar } from '@/components/docs-sidebar'

export default function DocsShellLayout({ children }: { children: ReactNode }) {
  return (
    <div className="doc-layout">
      <DocsSidebar tree={source.pageTree} />
      <div>{children}</div>
    </div>
  )
}
