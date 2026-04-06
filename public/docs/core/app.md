# App lifecycle

The `App` class wires everything together. terminal setup, input parsing, screen buffering, focus management, and the render loop.

You give it a root widget and it handles the rest.

## Basic usage

```ts

// Your root widget implements render() and getLayoutNode()
const myWidget = new Box({ border: 'round', padding: 1 })
myWidget.addChild(new Text('Hello from TermUI'))

const app = new App(myWidget, {
    fullscreen: true,   // use alternate screen buffer
    fps: 30,            // render loop speed
    mouse: false,       // enable mouse events
    title: 'My App',    // terminal title bar
})

// Start the app. blocks until exit() is called
await app.mount()
```

## Options

| Option       | Type      | Default | What it does                      |
| ------------ | --------- | ------- | --------------------------------- |
| `fullscreen` | `boolean` | `true`  | Enter the alternate screen buffer |
| `fps`        | `number`  | `30`    | Render loop frequency             |
| `mouse`      | `boolean` | `false` | Track mouse clicks and movement   |
| `title`      | `string`  | —       | Set the terminal window title     |

## Handling input

Key and mouse events are dispatched through the app's `events` emitter. Keys bubble from the focused widget up to the root, then to the app level:

```ts
// Listen for keys at the app level
app.events.on('key', (event) => {
    if (event.key === 'q') app.exit()
    if (event.key === 'tab') app.focus.focusNext()
})

// Listen for mouse events (requires mouse: true)
app.events.on('mouse', (event) => {
    console.log(event.x, event.y, event.button)
})

// Listen for terminal resize
app.events.on('resize', ({ cols, rows }) => {
    console.log('Terminal resized to', cols, 'x', rows)
})
```

## Overlays

Overlays render above the normal widget tree. Use them for modals, dropdowns, and toasts:

```ts
app.addOverlay('modal', 200)    // higher zIndex = on top
app.removeOverlay('modal')
```

## API reference

| Method                    | Description                                             |
| ------------------------- | ------------------------------------------------------- |
| `mount()`                 | Start the app. Returns a promise that resolves on exit. |
| `unmount()`               | Stop the app and restore the terminal.                  |
| `exit(code?)`             | Signal the app to shut down.                            |
| `requestRender()`         | Schedule a re-render on the next frame.                 |
| `addOverlay(id, zIndex?)` | Create a layer that renders above everything.           |
| `removeOverlay(id)`       | Remove an overlay layer.                                |

## What's inside

The app exposes its internals as read-only properties if you need them:

```ts
app.terminal   // Terminal. raw mode, alt screen, stdout writes
app.screen     // Screen. double-buffered cell grid
app.renderer   // Renderer. diff engine and render loop
app.input      // InputParser. stdin decoder
app.focus      // FocusManager. tab-order focus cycling
app.events     // EventEmitter. key, mouse, resize, mount, unmount
app.layers     // LayerManager. overlay z-ordering
```
