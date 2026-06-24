// src/routes/docs/$.tsx
import { createFileRoute, notFound } from '@tanstack/react-router'
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from 'fumadocs-ui/page'
import { findNeighbour } from 'fumadocs-core/page-tree'
import type { TOCItemType } from 'fumadocs-core/toc'
import { source } from '../../lib/source'
import { getMDXComponents } from '../../components/mdx'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComponent = React.ComponentType<any>

interface DocData {
  body: AnyComponent
  toc: TOCItemType[]
  title?: string
  description?: string
}

export const Route = createFileRoute('/docs/$')({
  // ponytail: loader only validates — page.data has ReactNode/functions that can't cross seroval SSR boundary
  loader: async ({ params }) => {
    const slugs = (params['_splat'] ?? '').split('/').filter(Boolean)
    if (!source.getPage(slugs)) throw notFound()
  },
  component: DocPageComponent,
  notFoundComponent: DocNotFound,
})

function DocPageComponent() {
  const params = Route.useParams()
  const slugs = (params['_splat'] ?? '').split('/').filter(Boolean)
  const page = source.getPage(slugs)!
  const data = page.data as unknown as DocData
  const neighbours = findNeighbour(source.pageTree, page.url)
  const MDX = data.body
  return (
    <DocsPage toc={data.toc} footer={{ items: neighbours }}>
      <DocsTitle>{data.title}</DocsTitle>
      {data.description && <DocsDescription>{data.description}</DocsDescription>}
      <DocsBody>
        {MDX && <MDX components={getMDXComponents()} />}
      </DocsBody>
    </DocsPage>
  )
}

function DocNotFound() {
  return (
    <DocsPage toc={[]}>
      <DocsTitle>Page not found</DocsTitle>
      <DocsBody>
        <p>This documentation page does not exist yet.</p>
      </DocsBody>
    </DocsPage>
  )
}
