# Feedback Widgets
Feedback widgets communicate loading state, progress, and user action availability.

All feedback widgets respect `caps.motion` (disables animations when `NO_MOTION=1`) and `caps.unicode` (uses ASCII characters when `NO_UNICODE=1`).
## Spinner
An animated indicator for indeterminate operations:
```ts

const spin = new Spinner({ height: 1 }, {
    label: 'Connecting to database...',
    color: { type: 'named', name: 'cyan' },
})
spin.mount()   // start animation
// ...later:
spin.unmount() // stop animation
```
When `NO_MOTION=1`, the spinner shows a static character instead of animating.
| Option   | Type       | Default         | Description                                                              |
| -------- | ---------- | --------------- | ------------------------------------------------------------------------ |
| `label`  | `string`   | —               | Text shown next to the spinner                                           |
| `color`  | `Color`    | white           | Spinner character color                                                  |
| `frames` | `string[]` | Unicode braille | Custom animation frames. Falls back to ASCII `|/-\` when `NO_UNICODE=1`. |

## ProgressBar
A determinate progress bar — use when you know the total:
```ts

const bar = new ProgressBar(
    { height: 1, flexGrow: 1 },
    {
        value: 0.0,
        fillColor: { type: 'named', name: 'green' },
        showLabel: true,
    }
)

// Update progress as work completes
bar.setValue(0.42)   // 42%
bar.setValue(1.0)    // done
```
| Option       | Type      | Default     | Description                  |
| ------------ | --------- | ----------- | ---------------------------- |
| `value`      | `number`  | `0`         | Progress 0.0–1.0             |
| `fillColor`  | `Color`   | green       | Filled portion color         |
| `emptyColor` | `Color`   | brightBlack | Empty portion color          |
| `showLabel`  | `boolean` | `true`      | Show percentage on the right |

Fill characters: `█` / `░` (unicode) → `#` / `.` (ASCII when `NO_UNICODE=1`).
## Skeleton
An animated loading placeholder — use while content is loading asynchronously:
```ts

const placeholder = new Skeleton({ flexGrow: 1, height: 3 }, {
    variant: 'shimmer',
    intervalMs: 80,
    color: { type: 'named', name: 'brightBlack' },
})
```
Two variants:
- `'pulse'` — alternates between two brightness levels
- `'shimmer'` — a moving highlight sweeps left to right

When `NO_MOTION=1`, skeleton renders as a static dimmed block.
| Option       | Type                   | Default     | Description              |
| ------------ | ---------------------- | ----------- | ------------------------ |
| `variant`    | `'pulse' \| 'shimmer'` | `'shimmer'` | Animation style          |
| `intervalMs` | `number`               | `100`       | Animation frame interval |
| `color`      | `Color`                | brightBlack | Base skeleton color      |

## MultiProgress
Multiple labeled progress bars in a single widget — useful for parallel downloads, batch operations, or multi-step processes:
```ts

const items: ProgressItem[] = [
    { label: 'Downloading assets', value: 0.72, color: { type: 'named', name: 'cyan' } },
    { label: 'Building bundle',    value: 0.31 },
    { label: 'Running tests',      value: 0.0,  color: { type: 'named', name: 'yellow' } },
]

const multi = new MultiProgress({ items }, { flexGrow: 1 })

// Update individual bars
items[0].value = 0.95
multi.setItems(items)
```
`ProgressItem`: `{ label: string, value: number, color?: Color }`
## CommandPalette
A searchable, filterable list of commands triggered by keyboard shortcut:
```ts

const commands: Command[] = [
    { id: 'new',     label: 'New File',        action: () => newFile() },
    { id: 'open',    label: 'Open File...',     action: () => openPicker() },
    { id: 'save',    label: 'Save',             action: () => save() },
    { id: 'search',  label: 'Find in Files',    action: () => openSearch(), description: 'Ctrl+Shift+F' },
    { id: 'theme',   label: 'Change Theme',     action: () => openThemePicker() },
]

const palette = new CommandPalette({ commands }, { flexGrow: 1 })
```
The palette shows a text filter at the top; typing narrows the list. Enter selects the highlighted command.

`Command`: `{ id: string, label: string, action: () => void, description?: string }`

## See also

- [Layout Widgets](/docs/widgets/layout) — Banner and StatusMessage for alerts
- [useAsync](/docs/jsx/use-async) — combine with Skeleton for async data loading
- [Accessibility & caps flags](/docs/guides/accessibility) — how all feedback widgets adapt to NO_MOTION and NO_UNICODE
