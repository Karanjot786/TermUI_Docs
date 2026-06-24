import defaultComponents from 'fumadocs-ui/mdx'

export function getMDXComponents(overrides?: Record<string, any>): Record<string, any> {
  return { ...defaultComponents, ...overrides }
}
