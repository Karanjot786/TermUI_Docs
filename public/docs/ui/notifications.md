# Notifications
`@termuijs/ui` provides a `NotificationCenter` widget and `useNotifications` hook for in-app notifications. Notifications appear as auto-dismissing overlays and don't interrupt the user's current interaction.
## Setup
Mount `NotificationCenter` once at the app root. It renders notifications as a floating overlay in the top-right corner:
```ts

function App() {
    return (
        <col>

        </col>
    )
}
```
## Sending notifications
Use `useNotifications` from any component in the tree:
```ts

function SaveButton() {
    const { notify } = useNotifications()

    function handleSave() {
        try {
            saveData()
            notify('Saved successfully', { type: 'success' })
        } catch (err) {
            notify(`Save failed: ${err.message}`, { type: 'error', duration: 0 })
        }
    }

    useKeymap({ 's': handleSave })

    return <Text>Press s to save</Text>
}
```
## notify(message, options?)
| Parameter  | Type                                          | Default  | Description                                                |
| ---------- | --------------------------------------------- | -------- | ---------------------------------------------------------- |
| `message`  | `string`                                      | Required | Text to display                                            |
| `type`     | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Sets the icon and border color                             |
| `duration` | `number`                                      | `3000`   | Milliseconds before auto-dismiss. Pass `0` for persistent. |

Returns a `string` ID you can use to dismiss the notification programmatically.

## Notification types
| Type      | Icon (unicode) | Icon (ASCII fallback) | Border color |
| --------- | -------------- | --------------------- | ------------ |
| `info`    | ℹ              | [i]                   | cyan         |
| `success` | ✓              | [+]                   | green        |
| `warning` | ⚠              | [!]                   | yellow       |
| `error`   | ✗              | [x]                   | red          |

Icons automatically switch to ASCII fallbacks when `NO_UNICODE=1`.
## dismiss(id)
```ts
const { notify, dismiss } = useNotifications()

// Show a persistent notification
const id = notify('Uploading...', { type: 'info', duration: 0 })

// Later, when upload completes
dismiss(id)
notify('Upload complete', { type: 'success' })
```
## Reading all active notifications
```ts
const { notifications } = useNotifications()

// notifications: Array<{ id: string, message: string, type: string, createdAt: number }>
console.log(`${notifications.length} notifications visible`)
```
## See also

- [Imperative Prompts](/docs/ui/prompts) — blocking input dialogs (confirm, text entry, select)
- [Accessibility](/docs/guides/accessibility) — how icons adapt to NO_UNICODE environments
