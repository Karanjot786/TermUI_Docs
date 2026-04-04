import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/docs/')({
    beforeLoad: () => {
        throw redirect({ to: '/docs/$section/$slug', params: { section: 'getting-started', slug: 'installation' } })
    },
})
