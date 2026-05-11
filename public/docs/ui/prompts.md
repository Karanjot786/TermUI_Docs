# Imperative Prompts
The `prompt` object in `@termuijs/ui` lets you request user input without restructuring your component tree. Each function returns a Promise — await it and get the response.
## The four prompts
```ts

// Free-form text entry
const name = await prompt.text('What is your name?')

// Yes/no confirmation
const ok = await prompt.confirm('Delete this file?')

// Pick one from a list
const color = await prompt.select('Choose a color:', ['red', 'green', 'blue'])

// Pick multiple from a list
const tags = await prompt.multiSelect('Select tags:', ['bug', 'feature', 'docs', 'test'])
```
## prompt.text(message, opts?)
Shows a text input dialog. Resolves with the entered string when the user presses Enter. Pressing Escape resolves with an empty string.
```ts
const username = await prompt.text('Username:', {
    placeholder: 'e.g. alice',
    default:     'guest',
})
```
| Option        | Type      | Description                            |
| ------------- | --------- | -------------------------------------- |
| `placeholder` | `string`  | Dimmed hint text shown in the input    |
| `default`     | `string`  | Pre-filled value                       |
| `mask`        | `boolean` | Replace input with `*` (for passwords) |

## prompt.confirm(message, opts?)
Shows a yes/no dialog. Resolves with `true` if the user confirms, `false` if they cancel.
```ts
const shouldProceed = await prompt.confirm('This will overwrite your config. Continue?', {
    defaultYes: false,    // focus "No" by default
})

if (shouldProceed) {
    writeConfig(newSettings)
}
```
| Option         | Type      | Default | Description                 |
| -------------- | --------- | ------- | --------------------------- |
| `defaultYes`   | `boolean` | `true`  | Which button starts focused |
| `confirmLabel` | `string`  | `'Yes'` | Text on the confirm button  |
| `cancelLabel`  | `string`  | `'No'`  | Text on the cancel button   |

## prompt.select(message, items, opts?)
Shows a scrollable list — user navigates with arrow keys and confirms with Enter:
```ts
const action = await prompt.select('What do you want to do?', [
    'Create new project',
    'Open existing project',
    'Settings',
    'Quit',
])
```
Items can also be objects with `label` and `value`:
```ts
const result = await prompt.select('Environment:', [
    { label: 'Development', value: 'dev' },
    { label: 'Staging',     value: 'staging' },
    { label: 'Production',  value: 'prod' },
])
// result is the value string, not the label
```
## prompt.multiSelect(message, items, opts?)
Like `select`, but the user can toggle multiple items with Space and confirm with Enter:
```ts
const features = await prompt.multiSelect('Enable features:', [
    'hot-reload',
    'source-maps',
    'type-checking',
    'linting',
])
// features is string[]
```
| Option            | Type       | Description                           |
| ----------------- | ---------- | ------------------------------------- |
| `initialSelected` | `string[]` | Pre-checked items (by value)          |
| `min`             | `number`   | Minimum number of selections required |
| `max`             | `number`   | Maximum selections allowed            |

## Focus behavior
While a prompt is open it captures all keyboard input. The rest of the UI is visible but does not respond to key presses. When the promise resolves the previous focus state is restored.

This is handled automatically — you don't need to set up a focus trap.
## Error handling
All prompts reject if the app exits while the dialog is open. Wrap in try/catch if you need to handle that:
```ts
try {
    const name = await prompt.text('Project name:')
    createProject(name)
} catch {
    // User quit the app — no-op
}
```
## See also

- [Notifications](/docs/ui/notifications) — non-blocking toasts for feedback that doesn't require input
- [UI Inputs](/docs/ui/inputs) — PasswordInput, NumberInput, PathInput for inline input in forms
