import { describe, it, expect } from 'vitest';
import { htmlTableToMarkdown } from './html-table.mjs';

describe('htmlTableToMarkdown', () => {
  it('converts a simple thead/tbody table', () => {
    const html = [
      '<table>',
      '<thead>',
      '<tr><th>Widget</th><th>Description</th></tr>',
      '</thead>',
      '<tbody>',
      '<tr><td>`Box`</td><td>Container with flex layout</td></tr>',
      '<tr><td>`Text`</td><td>Styled text</td></tr>',
      '</tbody>',
      '</table>',
    ].join('\n');
    const md = htmlTableToMarkdown(html);
    expect(md).toBe(
      [
        '| Widget | Description |',
        '| --- | --- |',
        '| `Box` | Container with flex layout |',
        '| `Text` | Styled text |',
      ].join('\n'),
    );
  });

  it('escapes a pipe inside a cell', () => {
    const html = '<table><thead><tr><th>Type</th></tr></thead><tbody><tr><td>`a | b`</td></tr></tbody></table>';
    expect(htmlTableToMarkdown(html)).toContain('`a \\| b`');
  });

  it('returns null for a table with a colspan it cannot represent', () => {
    const html = '<table><tbody><tr><td colspan="2">merged</td></tr></tbody></table>';
    expect(htmlTableToMarkdown(html)).toBeNull();
  });
});
