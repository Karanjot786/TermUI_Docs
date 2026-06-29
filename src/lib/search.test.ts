import { describe, it, expect } from 'vitest';
import { searchDocs, type SearchDoc } from './search.js';

const INDEX: SearchDoc[] = [
  { slug: 'core/app', title: 'App Lifecycle', description: 'The App class bootstraps a terminal app', section: 'core', headings: ['Mounting', 'Exit'], body: 'app mount stdin raw mode render loop focus' },
  { slug: 'jsx/use-input', title: 'useInput', description: 'Handle keyboard input in components', section: 'jsx', headings: ['Key events'], body: 'useInput keypress KeyEvent modifiers' },
  { slug: 'widgets/spinner', title: 'Spinner', description: 'Animated loading indicator', section: 'widgets', headings: [], body: 'spinner preset frames color loading' },
];

describe('searchDocs', () => {
  it('ranks a title match above a body-only match', () => {
    const hits = searchDocs(INDEX, 'spinner');
    expect(hits[0]!.doc.slug).toBe('widgets/spinner');
  });
  it('matches description and headings', () => {
    expect(searchDocs(INDEX, 'keyboard').map((h) => h.doc.slug)).toContain('jsx/use-input');
    expect(searchDocs(INDEX, 'exit').map((h) => h.doc.slug)).toContain('core/app');
  });
  it('returns nothing for an empty query', () => {
    expect(searchDocs(INDEX, '   ')).toEqual([]);
  });
  it('respects the limit', () => {
    expect(searchDocs(INDEX, 'a', 2).length).toBeLessThanOrEqual(2);
  });
});
