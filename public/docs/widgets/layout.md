# Layout Widgets
Layout widgets in `@termuijs/widgets` handle structural concerns — grouping, scrolling, centering, and status display.
## Card
A bordered container with an optional title embedded in the top border:
```ts

const card = new Card({ flexGrow: 1 }, { title: 'System Status' })
card.addChild(new Text('CPU: 42%', {}))
card.addChild(new Text('MEM: 58%', {}))
```
| Option        | Type     | Description                                |
| ------------- | -------- | ------------------------------------------ |
| `title`       | `string` | Text shown centered in the top border line |
| `borderColor` | `Color`  | Color of the border and title text         |

Card always has `border: 'single'` and `padding: 1` by default. Pass overrides in the style argument.
## ScrollView
A vertically scrollable container. Content that overflows the height can be scrolled with arrow keys:
```ts

const scroll = new ScrollView({ height: 20, flexGrow: 1 }, { scrollbar: true })
for (const line of logLines) {
    scroll.addChild(new Text(line, {}))
}
```
| Option      | Type      | Default | Description                        |
| ----------- | --------- | ------- | ---------------------------------- |
| `scrollbar` | `boolean` | `true`  | Show a scrollbar on the right edge |

**Keyboard:** `↑`/`↓` scroll one line; `PageUp`/`PageDown` scroll by half the visible height; `Home`/`End` jump to top/bottom.
## Center
Centers a single child widget within its available space:
```ts

const centered = new Center({ flexGrow: 1 }, {})
centered.addChild(new Text('Loading...', { bold: true }))
```
| Option | Type                   | Default  | Description             |
| ------ | ---------------------- | -------- | ----------------------- |
| `axis` | `'x' \| 'y' \| 'both'` | `'both'` | Which axes to center on |

## Columns
Evenly-split column layout from an array of widgets:
```ts

const cols = new Columns({ flexGrow: 1 }, { gap: 1 })
cols.addChildren([cpuGauge, memGauge, diskGauge, netGauge])
```
| Option | Type     | Default | Description              |
| ------ | -------- | ------- | ------------------------ |
| `gap`  | `number` | `0`     | Column gap in characters |

Each child gets an equal share of the available width. For unequal columns, use the `row` intrinsic with explicit `flexGrow` values.
## Sidebar
A navigable sidebar with items, optional badges, and active item highlighting:
```ts

const sidebar = new Sidebar({ width: 20 }, {
    items: [
        { id: 'dashboard', label: 'Dashboard', badge: '3' },
        { id: 'logs',      label: 'Logs' },
        { id: 'settings',  label: 'Settings' },
    ],
    activeId: 'dashboard',
    onSelect: (id) => navigate(id),
})
```
| Option      | Type                   | Description                                   |
| ----------- | ---------------------- | --------------------------------------------- |
| `items`     | `SidebarItem[]`        | List of navigation items                      |
| `activeId`  | `string`               | ID of the currently active item (highlighted) |
| `onSelect`  | `(id: string) => void` | Called when an item is selected with Enter    |
| `collapsed` | `boolean`              | Show only icons/initials (narrow mode)        |

`SidebarItem`: `{ id: string, label: string, badge?: string, icon?: string }`

**Keyboard:** `↑`/`↓` to navigate, `Enter` to select.
## KeyValue
Aligned key–value pairs, left-padded so all values line up in a column:
```ts

const info = new KeyValue({ flexGrow: 1 }, {
    data: {
        'Node version': process.version,
        'Platform':     process.platform,
        'Arch':         process.arch,
        'PID':          String(process.pid),
    },
    separator: ' : ',
})
```
| Option       | Type     | Default  | Description                  |
| ------------ | -------- | -------- | ---------------------------- |
| `data`       | `Record` | Required | Key–value pairs to display   |
| `separator`  | `string` | `' : '`  | String between key and value |
| `keyColor`   | `Color`  | —        | Color for the key column     |
| `valueColor` | `Color`  | —        | Color for the value column   |

## Definition
Term + definition stacked pairs, like a glossary or CLI man-page style reference:
```ts

const glossary = new Definition({ flexGrow: 1 }, {
    items: [
        { term: 'TUI', definition: 'Terminal User Interface — an interactive app that runs inside a terminal emulator.' },
        { term: 'Fiber', definition: 'Internal reconciler node tracking component state and hook calls.' },
    ],
})
```
Each term is rendered bold; the definition follows on the next line, indented.
## Banner
A full-width alert with a title and optional body text:
```ts

const alert = new Banner({ flexGrow: 1 }, {
    title: 'Deployment Failed',
    message: 'Build step exited with code 1. Check the logs for details.',
    variant: 'error',
})
```
| Option    | Type                                          | Description          |
| --------- | --------------------------------------------- | -------------------- |
| `title`   | `string`                                      | Bold header line     |
| `message` | `string`                                      | Body text (optional) |
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | Sets border color    |

## StatusMessage
Compact single-line status with an icon and a message:
```ts

const msg = new StatusMessage({ height: 1 }, {
    message: 'Connected to database',
    variant: 'success',
})
```
Icons: `✓` / `[+]` for success, `✗` / `[x]` for error, `⚠` / `[!]` for warning, `ℹ` / `[i]` for info. ASCII fallbacks activate when `NO_UNICODE=1`.

## See also

- [Display Widgets](/docs/widgets/display) — StreamingText, ChatMessage, BigText, Gradient
- [Chart Widgets](/docs/widgets/charts) — LineChart, HeatMap, BarChart
- [Feedback Widgets](/docs/widgets/feedback) — Spinner, ProgressBar, Skeleton, MultiProgress
