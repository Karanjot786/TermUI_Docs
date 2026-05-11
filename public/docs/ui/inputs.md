# Specialized Inputs
`@termuijs/ui` extends the base `TextInput` with four purpose-built input components for common terminal UI patterns.
## PasswordInput
A text input that masks characters with `*`. Alt+V toggles visibility.
```ts

function LoginForm() {
    return (
        <PasswordInput
            placeholder="Password"
            onSubmit={(value) => authenticate(value)}
        />
    )
}
```
| Prop          | Type                      | Default | Description                            |
| ------------- | ------------------------- | ------- | -------------------------------------- |
| `placeholder` | `string`                  | `''`    | Hint text shown when empty             |
| `mask`        | `string`                  | `'*'`   | Replacement character for hidden input |
| `onSubmit`    | `(value: string) => void` | —       | Called when the user presses Enter     |
| `onChange`    | `(value: string) => void` | —       | Called on every keystroke              |

**Keyboard shortcuts:**
- Alt+V — toggle password visibility (show/hide)
- Enter — submit
- Escape — clear input
## NumberInput
Restricts input to digits and decimal points. Arrow keys increment/decrement by `step`.
```ts

function PortField() {
    return (
        <NumberInput
            value={8080}
            min={1}
            max={65535}
            step={1}
            onChange={(n) => setPort(n)}
        />
    )
}
```
| Prop       | Type                      | Default     | Description                                   |
| ---------- | ------------------------- | ----------- | --------------------------------------------- |
| `value`    | `number`                  | `0`         | Initial value                                 |
| `min`      | `number`                  | `-Infinity` | Minimum value — rejects `-` key when min ≥ 0  |
| `max`      | `number`                  | `Infinity`  | Maximum value                                 |
| `step`     | `number`                  | `1`         | Amount to increment/decrement with arrow keys |
| `decimals` | `number`                  | `0`         | Decimal places to allow                       |
| `onChange` | `(value: number) => void` | —           | Called whenever the value changes             |
| `onSubmit` | `(value: number) => void` | —           | Called on Enter                               |

**Keyboard shortcuts:**
- `↑` — increment by `step`
- `↓` — decrement by `step`
- Only digits, `.`, and `-` (when `min < 0`) are accepted
## PathInput
A text input with filesystem path completion. Press Tab to complete or cycle through suggestions.
```ts

function FileSelector() {
    return (
        <PathInput
            placeholder="/path/to/file"
            cwd={process.cwd()}
            onSubmit={(path) => openFile(path)}
        />
    )
}
```
| Prop          | Type                     | Default         | Description                            |
| ------------- | ------------------------ | --------------- | -------------------------------------- |
| `placeholder` | `string`                 | `''`            | Hint text                              |
| `cwd`         | `string`                 | `process.cwd()` | Base directory for relative paths      |
| `showHidden`  | `boolean`                | `false`         | Include `.dotfiles` in completions     |
| `onSubmit`    | `(path: string) => void` | —               | Called on Enter with the current value |

**Note:** PathInput has a fixed height of 4 rows minimum to show the completion list. Don't use it in height-constrained containers.

**Keyboard shortcuts:**
- Tab — complete to the longest common prefix, or show suggestions list
- Tab again — cycle through completions
- Shift+Tab — cycle backwards
- Enter — submit current value
- Escape — dismiss completions without clearing input
## KeyboardShortcuts
Renders a formatted reference card of keyboard bindings. Groups bindings by `category`, shows key names in bordered boxes.
```ts

const bindings: KeyBinding[] = [
    { key: 'q',      description: 'Quit',         category: 'General' },
    { key: 'ctrl+c', description: 'Force quit',    category: 'General' },
    { key: '?',      description: 'Show this help', category: 'General' },
    { key: 'up/down', description: 'Navigate',     category: 'Navigation' },
    { key: 'enter',  description: 'Select',        category: 'Navigation' },
    { key: 'tab',    description: 'Next panel',    category: 'Navigation' },
    { key: '/',      description: 'Search',        category: 'Actions' },
    { key: 'r',      description: 'Refresh',       category: 'Actions' },
]

function HelpScreen() {
    return <KeyboardShortcuts bindings={bindings} columns={2} />
}
```
| Prop             | Type           | Default  | Description                            |
| ---------------- | -------------- | -------- | -------------------------------------- |
| `bindings`       | `KeyBinding[]` | Required | The shortcuts to display               |
| `columns`        | `number`       | `1`      | Number of columns to lay out groups in |
| `showCategories` | `boolean`      | `true`   | Show group headers                     |

The `KeyBinding` type comes from `@termuijs/jsx`. Add a `category` field to group related shortcuts:
```ts

const binding: KeyBinding = {
    key: 'ctrl+s',
    description: 'Save file',
    category: 'File',         // optional grouping
}
```

## See also

- [Focus Management](/docs/jsx/focus) — wire these inputs into a focus-managed form
- [Imperative Prompts](/docs/ui/prompts) — overlay-style input dialogs
