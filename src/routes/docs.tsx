import { createFileRoute, Outlet } from '@tanstack/react-router'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { source } from '../lib/source'
import { baseOptions } from '../lib/layout.shared'

import docsCss from '../styles/docs.css?url'

export const Route = createFileRoute('/docs')({
  head: () => ({
    links: [{ rel: 'stylesheet', href: docsCss }],
  }),
  component: DocsLayoutWrapper,
})

function DocsLayoutWrapper() {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions}>
      <Outlet />
    </DocsLayout>
  )
}
