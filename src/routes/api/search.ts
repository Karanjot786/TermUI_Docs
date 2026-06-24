import { createAPIFileRoute } from '@tanstack/react-start/api'
import { source } from '../../lib/source'
import { createSearchAPI } from 'fumadocs-core/search/server'

const searchAPI = createSearchAPI('simple', {
  indexes: source.getPages().map((page) => ({
    title: page.data.title || '',
    description: page.data.description ?? '',
    url: page.url,
    content: page.data.description ?? '',
  })),
})

export const Route = createAPIFileRoute('/api/search')({
  GET: ({ request }) => searchAPI.GET(request),
})
