import { createFileRoute } from '@tanstack/react-router'
import { docPages } from '../../content/pages'

export const Route = createFileRoute('/docs/$section/$slug')({
    head: ({ params }) => {
        const page = docPages[`${params.section}/${params.slug}`]
        return {
            meta: [
                { title: page ? `${page.title} | TermUI Docs` : 'TermUI Docs' },
                { name: 'description', content: page?.description ?? '' },
            ],
        }
    },
    component: DocPage,
})

function DocPage() {
    const { section, slug } = Route.useParams()
    const key = `${section}/${slug}`
    const page = docPages[key]

    if (!page) {
        return (
            <div>
                <h1>Page not found</h1>
                <p>
                    The documentation page <code>{key}</code> doesn't exist yet.
                </p>
            </div>
        )
    }

    const Content = page.component
    return <Content />
}
