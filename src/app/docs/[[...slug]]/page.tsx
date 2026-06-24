import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from 'fumadocs-ui/page'
import { findNeighbour } from 'fumadocs-core/page-tree'
import type { TOCItemType } from 'fumadocs-core/toc'
import { source } from '@/lib/source'
import { getMDXComponents } from '@/components/mdx'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComponent = React.ComponentType<any>

interface DocData {
  body: AnyComponent
  toc: TOCItemType[]
  title?: string
  description?: string
}

interface Props {
  params: Promise<{ slug?: string[] }>
}

export async function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = source.getPage(slug ?? [])
  if (!page) return {}
  const data = page.data as unknown as DocData
  return { title: data.title, description: data.description }
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params
  const page = source.getPage(slug ?? [])
  if (!page) notFound()

  const data = page.data as unknown as DocData
  const MDX = data.body
  const neighbours = findNeighbour(source.pageTree, page.url)

  return (
    <DocsPage toc={data.toc} footer={{ items: neighbours }}>
      <DocsTitle>{data.title}</DocsTitle>
      {data.description && <DocsDescription>{data.description}</DocsDescription>}
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  )
}
