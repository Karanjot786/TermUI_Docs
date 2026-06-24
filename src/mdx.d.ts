declare module '*.mdx' {
  import type { ComponentType } from 'react'
  // MDX v3 compiled components accept a `components` prop for element overrides
  const Component: ComponentType<{ components?: Record<string, ComponentType<any>> }>
  export default Component
  export const frontmatter: Record<string, unknown>
}

// @tanstack/react-start/api is a virtual module injected by the Vite plugin at runtime.
// This ambient declaration provides type coverage so tsc does not error on the import.
declare module '@tanstack/react-start/api' {
  export function createAPIFileRoute(
    path: string,
  ): (handlers: {
    GET?: (ctx: { request: Request }) => Response | Promise<Response>
    POST?: (ctx: { request: Request }) => Response | Promise<Response>
    PUT?: (ctx: { request: Request }) => Response | Promise<Response>
    PATCH?: (ctx: { request: Request }) => Response | Promise<Response>
    DELETE?: (ctx: { request: Request }) => Response | Promise<Response>
    HEAD?: (ctx: { request: Request }) => Response | Promise<Response>
    OPTIONS?: (ctx: { request: Request }) => Response | Promise<Response>
  }) => { update: (opts: Record<string, unknown>) => unknown }
}
