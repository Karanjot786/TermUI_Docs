# Input parser

The `InputParser` sits between raw stdin and your app. It reads bytes off the stream, decodes escape sequences, and fires typed `KeyEvent` and `MouseEvent` callbacks.

The App creates one for you, but you have direct access if you need lower-level control.

## Usage

```ts

const parser = new InputParser(process.stdin)

parser.onKey((event) => {
    console.log(event.key, event.ctrl, event.shift, event.alt)
})

parser.onMouse((event) => {
    console.log(event.x, event.y, event.button)
})

// Start reading from stdin
parser.start()

// Later, stop reading
parser.stop()
```

## KeyEvent

```ts
interface KeyEvent {
    key: string        // 'a', 'enter', 'up', 'escape', etc.
    ctrl: boolean      // Ctrl was held
    shift: boolean     // Shift was held
    alt: boolean       // Alt/Option was held
    raw: Buffer        // The original bytes from stdin
}
```

## Supported keys

| Category   | Keys                                                               |
| ---------- | ------------------------------------------------------------------ |
| Printable  | All ASCII characters                                               |
| Navigation | `up`, `down`, `left`, `right`, `home`, `end`, `pageup`, `pagedown` |
| Control    | `enter`, `tab`, `escape`, `backspace`, `delete`, `space`           |
| Function   | `f1` through `f12`                                                 |
| Modifiers  | `ctrl+*`, `shift+*`, `alt+*`                                    |

## API

| Method             | What it does                                                   |
| ------------------ | -------------------------------------------------------------- |
| `onKey(handler)`   | Register a key event callback. Returns unsubscribe function.   |
| `onMouse(handler)` | Register a mouse event callback. Returns unsubscribe function. |
| `start()`          | Begin reading from stdin.                                      |
| `stop()`           | Stop reading. Can be restarted later.                          |
