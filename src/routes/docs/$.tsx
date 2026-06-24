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
  loader: async ({ params }) => {
    const slugs = (params['_splat'] ?? '').split('/').filter(Boolean)
    const page = source.getPage(slugs)
    if (!page) throw notFound()
    const data = page.data as unknown as DocData
    const neighbours = findNeighbour(source.pageTree, page.url)
    // ponytail: body omitted — React component can't cross seroval SSR boundary
    return { toc: data.toc, title: data.title, description: data.description, neighbours }
  },
  component: DocPageComponent,
  notFoundComponent: DocNotFound,
})

function DocPageComponent() {
  const { toc, title, description, neighbours } = Route.useLoaderData()
  const params = Route.useParams()
  const slugs = (params['_splat'] ?? '').split('/').filter(Boolean)
  const MDX = (source.getPage(slugs)?.data as unknown as DocData)?.body
  return (
    <DocsPage toc={toc} footer={{ items: neighbours }}>
      <DocsTitle>{title}</DocsTitle>
      {description && <DocsDescription>{description}</DocsDescription>}
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
