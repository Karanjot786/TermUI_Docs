import type { ReactNode } from 'react'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { source } from '@/lib/source'
import { baseOptions } from '@/lib/layout.shared'
import { SidebarFolderItem, SidebarPageItem, SidebarSeparatorItem } from '@/components/sidebar-tree'

const sidebarBanner = (
  <div className="sidebar-header">
    <span className="sidebar-header-prompt">$ docs</span>
    <span className="sidebar-header-cursor" />
  </div>
)

const sidebarComponents = {
  Folder: SidebarFolderItem,
  Item: SidebarPageItem,
  Separator: SidebarSeparatorItem,
}

export default function DocsShellLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions}
      sidebar={{ banner: sidebarBanner, components: sidebarComponents }}
    >
      {children}
    </DocsLayout>
  )
}
