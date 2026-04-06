# Screen

The `Screen` class is a double-buffered grid of cells. It stores what's on screen now and what was there before.

On each frame, the `Renderer` diffs the two buffers and writes only the cells that changed.

## Constructor

```ts

// Create a buffer. typically your terminal dimensions
const screen = new Screen(80, 24)

// The Renderer handles stdout output; Screen just manages cells
```

## Writing to the buffer

```ts
// Write a string at (col, row)
screen.writeString(5, 2, 'Hello TermUI!')

// Write with style attributes (fg, bg, bold, etc.)
screen.writeString(5, 3, 'Bold text', { bold: true })

// Set a single cell
screen.setCell(0, 0, { char: '┌', fg: 'green' })

// Read a cell back
const cell = screen.getCell(0, 0)
// → { char: '┌', fg: 'green', bg: '', ... }
```

## Clipping regions

Push a clip rectangle to restrict where writes land. Anything outside the clip is silently ignored.

This is how bordered containers keep content inside their walls:

```ts
screen.pushClip({ x: 2, y: 2, width: 20, height: 10 })

// These writes only affect cells inside the clip
screen.writeString(0, 0, 'This is clipped')  // ignored. outside
screen.writeString(3, 3, 'This shows up')     // inside clip

screen.popClip()
```

## Buffer lifecycle

| Method                            | What it does                                              |
| --------------------------------- | --------------------------------------------------------- |
| `writeString(x, y, text, attrs?)` | Write text at a position with optional style              |
| `setCell(x, y, cell)`             | Set a single cell                                         |
| `getCell(x, y)`                   | Read a cell back                                          |
| `clear()`                         | Fill the entire buffer with empty cells                   |
| `resize(cols, rows)`              | Resize both buffers (clears content)                      |
| `swap()`                          | Swap front and back buffers after the renderer diffs them |
| `pushClip(rect)`                  | Restrict writes to a rectangular region                   |
| `popClip()`                       | Remove the most recent clip                               |

## How diffing works

The screen holds two buffers: **front** (what's visible) and **back** (what we're drawing). Widgets write to the back buffer.

The `Renderer` then walks both buffers cell by cell and emits ANSI escape sequences only for cells that differ. A full-screen update that touches 3 cells writes exactly 3 escape sequences.

## Test backend

For unit tests, use the in-memory test screen instead of a real terminal:

```ts

const ts = createTestScreen(30, 5)
testScreenSetString(ts, 0, 0, 'Hello!')
console.log(testScreenToString(ts))
// → "Hello!                        "
//   "                              "
//   ...
```
