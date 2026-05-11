# Display Widgets
Display widgets in `@termuijs/widgets` cover text visualization, AI output patterns, and decorative typography.
## StreamingText
Renders text character by character with a typewriter effect. When `NO_MOTION=1`, the full text is shown immediately.
```ts

const widget = new StreamingText(
    {
        text: 'Generating response...',
        speed: 30,                           // characters per second
        cursor: '▋',                         // blinking cursor (ASCII: '_')
        onComplete: () => console.log('done'),
    },
    { flexGrow: 1 }
)
```
| Option       | Type         | Default       | Description                                                                             |
| ------------ | ------------ | ------------- | --------------------------------------------------------------------------------------- |
| `text`       | `string`     | Required      | Text to stream                                                                          |
| `speed`      | `number`     | `40`          | Characters per second                                                                   |
| `cursor`     | `string`     | `'▋'` / `'_'` | Cursor character. Defaults to unicode block or ASCII underscore based on `caps.unicode` |
| `onComplete` | `() => void` | —             | Called when all characters have been rendered                                           |

## ChatMessage
A chat bubble with role-aware styling. Different roles get different colors and alignment:
```ts

const userMsg = new ChatMessage(
    { role: 'user', content: 'How do I sort an array in TypeScript?' },
    { flexGrow: 1 }
)

const assistantMsg = new ChatMessage(
    { role: 'assistant', content: 'Use `.sort()` with a comparator function...' },
    { flexGrow: 1 }
)
```
| Option      | Type                                | Description                                            |
| ----------- | ----------------------------------- | ------------------------------------------------------ |
| `role`      | `'user' \| 'assistant' \| 'system'` | Determines styling and alignment                       |
| `content`   | `string`                            | Message text (supports newlines)                       |
| `timestamp` | `string`                            | Optional timestamp shown in dim text below the message |

Role styling defaults:
- `user` — right-aligned, blue border
- `assistant` — left-aligned, green border
- `system` — centered, dimmed, gray border
## ToolCall
Displays an AI tool/function call with status indicator and collapsible details:
```ts

const widget = new ToolCall(
    {
        name: 'readFile',
        status: 'running',
        args: { path: '/etc/hosts' },
    },
    { flexGrow: 1 }
)

// Update status as the call progresses
widget.setStatus('done')
widget.setResult('127.0.0.1  localhost\n::1        localhost\n')
```
| Option   | Type                                          | Description                                   |
| -------- | --------------------------------------------- | --------------------------------------------- |
| `name`   | `string`                                      | Function/tool name                            |
| `status` | `'pending' \| 'running' \| 'done' \| 'error'` | Current state — drives the status icon        |
| `args`   | `Record`                                      | Arguments — shown in a collapsible section    |
| `result` | `unknown`                                     | Return value — shown after status is `'done'` |

## JSONView
A collapsible, navigable tree for displaying JSON data:
```ts

const widget = new JSONView(
    {
        data: { name: 'Alice', scores: [98, 87, 92], active: true },
        indent: 2,
        onSelect: (path, value) => console.log(path, value),
    },
    { flexGrow: 1 }
)
```
Users can expand/collapse objects and arrays with Enter. `onSelect` fires when a node is focused.
| Option     | Type                                       | Description                          |
| ---------- | ------------------------------------------ | ------------------------------------ |
| `data`     | `unknown`                                  | Any JSON-serializable value          |
| `indent`   | `number`                                   | Spaces per indent level (default: 2) |
| `onSelect` | `(path: string[], value: unknown) => void` | Fires when a node is selected        |

## DiffView
Renders a unified diff with colored `+` / `-` lines:
```ts

const lines: DiffLine[] = [
    { type: 'context', content: '  function greet(name: string) {' },
    { type: 'remove',  content: '    return "Hello " + name' },
    { type: 'add',     content: '    return `Hello, ${name}!`' },
    { type: 'context', content: '  }' },
]

const widget = new DiffView({ lines }, { flexGrow: 1 })
```
Or pass a raw unified diff string — use the `diffView()` quick builder which parses it automatically:
```ts

const w = diffView('+ added line\n- removed line\n  unchanged')
```
## BigText
Large ASCII art banner text using a built-in 5×3 character map. No external dependencies:
```ts

const banner = new BigText('HELLO', { flexGrow: 1 }, {
    color: { type: 'named', name: 'cyan' },
})
```
Supports uppercase A–Z, digits 0–9, and common punctuation. Unsupported characters are skipped.

| Option  | Type    | Description                      |
| ------- | ------- | -------------------------------- |
| `color` | `Color` | Color of the rendered characters |

## Gradient
Renders text with a smooth color gradient applied per character. Uses ANSI 256-color interpolation:
```ts

const header = new Gradient('Terminal Dashboard',
    { flexGrow: 1 },
    { startColor: '#ff6b6b', endColor: '#4ecdc4', align: 'center' }
)
```
| Option       | Type                            | Default     | Description                        |
| ------------ | ------------------------------- | ----------- | ---------------------------------- |
| `startColor` | `string`                        | `'#ff0000'` | Hex color at the start of the text |
| `endColor`   | `string`                        | `'#0000ff'` | Hex color at the end of the text   |
| `align`      | `'left' \| 'center' \| 'right'` | `'left'`    | Text alignment                     |

Gradient degrades gracefully in terminals without 256-color support — it falls back to the nearest available color.

## See also

- [Layout Widgets](/docs/widgets/layout) — Card, ScrollView, Sidebar for structuring content
- [Chart Widgets](/docs/widgets/charts) — LineChart, HeatMap, BarChart
- [quick builders](/docs/guides/quick) — `chatMessage()`, `toolCall()`, `streamingText()`, `jsonView()`, `diffView()`
