// src/routes/docs/$.tsx
import { createFileRoute, notFound } from '@tanstack/react-router'
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from 'fumadocs-ui/page'
import { source } from '../../lib/source'
import { getMDXComponents } from '../../components/mdx'

export const Route = createFileRoute('/docs/$')({
  loader: async ({ params }) => {
    const slugs = (params['_splat'] ?? '').split('/').filter(Boolean)
    const page = source.getPage(slugs)
    if (!page) throw notFound()
    const MDX = page.data.body
    const toc = page.data.toc
    return { MDX, toc, title: page.data.title, description: page.data.description }
  },
  component: DocPage,
  notFoundComponent: DocNotFound,
})

function DocPage() {
  const { MDX, toc, title, description } = Route.useLoaderData()
  return (
    <DocsPage toc={toc}>
      <DocsTitle>{title}</DocsTitle>
      {description && <DocsDescription>{description}</DocsDescription>}
      <DocsBody>
        <MDX components={getMDXComponents()} />
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
