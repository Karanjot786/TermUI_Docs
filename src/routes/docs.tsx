import { createFileRoute, Outlet, useRouterState, Link } from '@tanstack/react-router'
import { Sidebar } from '../components/layout/Sidebar'
import { TableOfContents } from '../components/layout/TableOfContents'
import { PrevNext } from '../components/docs/PrevNext'
import { FeedbackWidget } from '../components/docs/FeedbackWidget'
import { navigation } from '../data/navigation'
import { docPages } from '../content/pages'

import docsCss from '../styles/docs.css?url'

export const Route = createFileRoute('/docs')({
    head: () => ({
        links: [{ rel: 'stylesheet', href: docsCss }],
    }),
    component: DocsLayout,
})

function DocBreadcrumb() {
    const { location: { pathname } } = useRouterState()
    const section = navigation.find((s) =>
        s.children?.some((c) => c.href === pathname)
    )
    const page = section?.children?.find((c) => c.href === pathname)

    if (!section || !page) return null

    const sectionSlug = section.label
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[()]/g, '')

    // Parse section/slug from pathname for the GitHub edit link + lastUpdated
    const parts = pathname.replace('/docs/', '').split('/')
    const pathSection = parts[0] ?? ''
    const pathSlug = parts[1] ?? ''
    const editHref = `https://github.com/Karanjot786/TermUI/edit/main/website/src/content/${pathSection}/${pathSlug}.tsx`
    const pageKey = `${pathSection}/${pathSlug}`
    const lastUpdated = docPages[pageKey]?.lastUpdated

    return (
        <div className="doc-meta-bar">
            <nav className="doc-breadcrumb" aria-label="Breadcrumb">
                <Link
                    to="/docs/$section/$slug"
                    params={{ section: 'getting-started', slug: 'installation' }}
                    className="breadcrumb-root"
                >
                    docs
                </Link>
                <span className="breadcrumb-sep">/</span>
                <Link
                    to={section.children![0].href as any}
                    className="breadcrumb-section"
                >
                    {sectionSlug}
                </Link>
                <span className="breadcrumb-sep">/</span>
                <span className="breadcrumb-current">{page.label}</span>
            </nav>
            <div className="doc-meta-actions">
                {lastUpdated && (
                    <span className="doc-last-updated">Updated {lastUpdated}</span>
                )}
                <a
                    href={editHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="doc-edit-link"
                >
                    Edit this page ↗
                </a>
            </div>
        </div>
    )
}

function DocsLayout() {
    return (
        <div className="doc-layout">
            <Sidebar />
            <div className="doc-content">
                <DocBreadcrumb />
                <div className="doc-content-wrapper">
                    <Outlet />
                </div>
                <PrevNext />
                <FeedbackWidget />
            </div>
            <TableOfContents />
        </div>
    )
}
