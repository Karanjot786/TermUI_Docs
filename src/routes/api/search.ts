import { createAPIFileRoute } from '@tanstack/react-start/api'
import { source } from '../../lib/source'
import { createSearchAPI } from 'fumadocs-core/search/server'

// v15 adaptation: fumadocs-core exports 'simple' and 'advanced' — 'extended' is not available.
// Using 'simple' mode with an explicit id field (cast to bypass excess-property check).
const searchAPI = createSearchAPI('simple', {
  indexes: source.getPages().map((page) => ({
    id: page.url,
    title: page.data.title || '',
    description: page.data.description ?? '',
    url: page.url,
    content: page.data.description ?? '',
  })) as any,
})

// v15 convention: TanStack Start v1.168 router plugin expects `Route` (not `APIRoute`).
// The @tanstack/react-start/api package is a virtual module injected by the Vite plugin.
export const Route = createAPIFileRoute('/api/search')({
  GET: ({ request }) => searchAPI.GET(request),
})
