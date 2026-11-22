import type { NextFetchEvent, NextRequest } from 'next/server';
import trail from 'trail-analytics/next/proxy';

// Reports AI crawlers to Trail and serves /t/t.js and /t/e first-party (signed, with your host's edge geo).
export default function proxy(req: NextRequest, event: NextFetchEvent) {
  return trail(req, event);
}

export const config = { matcher: ['/((?!_next/static|_next/image).*)'] };
