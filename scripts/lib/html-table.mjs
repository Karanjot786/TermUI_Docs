// Convert a single <table>...</table> HTML string to a markdown pipe table.
// Returns null when the table uses structure a pipe table cannot represent
// (colspan, rowspan, nested block tags), so the caller leaves it as HTML.

function cellText(rawCell) {
  let inner = rawCell.replace(/^<(td|th)[^>]*>/i, '').replace(/<\/(td|th)>$/i, '')
  if (/<(table|div|ul|ol|p|pre)\b/i.test(inner)) return null
  inner = inner.replace(/<\/?(code|strong|em|b|i|span)[^>]*>/gi, '')
  inner = inner.replace(/\s+/g, ' ').trim()
  return inner.replace(/\|/g, '\\|')
}

function parseRow(rowHtml) {
  if (/colspan|rowspan/i.test(rowHtml)) return null
  const cells = []
  const re = /<(td|th)\b[^>]*>[\s\S]*?<\/\1>/gi
  let m
  while ((m = re.exec(rowHtml)) !== null) {
    const text = cellText(m[0])
    if (text === null) return null
    cells.push(text)
  }
  return cells.length ? cells : null
}

export function htmlTableToMarkdown(tableHtml) {
  if (/colspan|rowspan/i.test(tableHtml)) return null

  const rowRe = /<tr\b[^>]*>[\s\S]*?<\/tr>/gi
  const rows = []
  let m
  while ((m = rowRe.exec(tableHtml)) !== null) {
    const cells = parseRow(m[0])
    if (!cells) return null
    rows.push(cells)
  }
  if (rows.length < 1) return null

  const cols = rows[0].length
  if (rows.some((r) => r.length !== cols)) return null

  const header = rows[0]
  const bodyRows = rows.slice(1)
  const lines = [
    `| ${header.join(' | ')} |`,
    `| ${header.map(() => '---').join(' | ')} |`,
    ...bodyRows.map((r) => `| ${r.join(' | ')} |`),
  ]
  return lines.join('\n')
}
