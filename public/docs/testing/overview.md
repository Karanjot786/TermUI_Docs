# Testing
`@termuijs/testing` is a test renderer. It renders your JSX tree into an in-memory screen buffer, lets you query the output, simulate key presses, and check behavior.

No real terminal needed.
The design follows the same render → query → assert pattern as React Testing Library.
## Installation
```ts
npm install --save-dev @termuijs/testing vitest
```
## Quick start
```ts
// counter.test.tsx

function Counter() {
    const [count, setCount] = useState(0)
    useInput((key) => {
if (key === '+') setCount((c) => c + 1)
if (key === '-') setCount((c) => c - 1)
    })
    return <Text>Count: {count}</Text>
}

describe('Counter', () => {
    it('starts at zero', () => {
const t = render(<Counter />)
expect(t.getByText('Count: 0')).toBeTruthy()
t.unmount()
    })

    it('increments on +', () => {
const t = render(<Counter />)
t.fireKey('+')
expect(t.getByText('Count: 1')).toBeTruthy()
t.unmount()
    })

    it('decrements on -', () => {
const t = render(<Counter />)
t.fireKey('+')
t.fireKey('+')
t.fireKey('-')
expect(t.getByText('Count: 1')).toBeTruthy()
t.unmount()
    })
})
```
## render(element, options?)
Renders a JSX element into a virtual  `width × height` screen. Returns a `TestInstance`  with query and interaction methods.

Call `unmount()` when you're done to avoid hook state leaking between tests.
```ts

const t = render(<MyWidget />, {
    width:  80,   // default
    height: 24,   // default
})
```
### Options
| Option   | Default | Description    |
| -------- | ------- | -------------- |
| `width`  | `80`    | Screen columns |
| `height` | `24`    | Screen rows    |
## Querying
### getByText(text)
Finds the first widget whose text content includes the string. Returns `null` if nothing matches.
```ts
const widget = t.getByText('Hello')
expect(widget).not.toBeNull()

// Test absence
expect(t.getByText('Error')).toBeNull()
```
### getAllByText(text)
Returns all widgets containing the text. Useful when the same string shows up more than once:
```ts
const rows = t.getAllByText('active')
expect(rows).toHaveLength(3)
```
### getAllByType(Type)
Returns all widget instances of a given constructor:
```ts

const texts = t.getAllByType(Text)
expect(texts).toHaveLength(5)

const boxes = t.getAllByType(Box)
expect(boxes.length).toBeGreaterThan(0)
```
### lastFrame()
Returns the current screen as an array of strings (one per row). Trailing whitespace is trimmed. Works well with snapshot tests:
```ts
const frame = t.lastFrame()

// Check specific rows
expect(frame[0]).toBe('┌────────────┐')
expect(frame[1]).toContain('Dashboard')

// Snapshot test
expect(frame).toMatchSnapshot()
```
### toString()
Joins all non-empty screen rows into one string. For quick content checks when you don't care about line positions:
```ts
expect(t.toString()).toContain('Items: 5')
```
## Interaction
### fireKey(key, modifiers?)
Dispatches a key event to all `useInput` handlers.
```ts
// Basic keys
t.fireKey('enter')
t.fireKey('escape')
t.fireKey('tab')
t.fireKey('up')
t.fireKey('down')

// With modifiers
t.fireKey('c', { ctrl: true })    // Ctrl+C
t.fireKey('a', { shift: true })   // Shift+A
t.fireKey('f', { alt: true })     // Alt+F
```
### typeText(text)
Fires each character as a separate key event. Simulates typing:
```ts
const t = render(<SearchInput />)
t.typeText('hello world')
expect(t.getByText('hello world')).toBeTruthy()
```
## Lifecycle
### rerender(element?)
Re-renders the tree. Pass a new element to replace the root, useful for testing prop changes:
```ts
const t = render(<StatusBar status="loading" />)
expect(t.getByText('loading')).toBeTruthy()

t.rerender(<StatusBar status="done" />)
expect(t.getByText('done')).toBeTruthy()
expect(t.getByText('loading')).toBeNull()
```
### unmount()
Tears down all component instances and hook state. Call this at the end of each test.

With Vitest:
```ts

let t: TestInstance

beforeEach(() => { t = render(<MyWidget />) })
afterEach(() => t.unmount())
```
## Testing with @termuijs/store
Call `destroy()` on your stores in `afterEach` to clear subscribers between tests:
```ts

afterEach(() => {
    useCounterStore.destroy()
})
```
## Testing with context
Wrap the component in a Provider when it reads context:
```ts

const testTheme = { fg: 'white', bg: 'black' }

const t = render(
    <ThemeCtx.Provider value={testTheme}>

    </ThemeCtx.Provider>
)

expect(t.getByText('Ready')).toBeTruthy()
```
## Snapshot testing
Use `lastFrame()` with Vitest's `toMatchSnapshot` to lock in your terminal UI's visual output:
```ts
it('renders the dashboard layout', () => {
    const t = render(<Dashboard />)
    expect(t.lastFrame()).toMatchSnapshot()
    t.unmount()
})

// Snapshot file (auto-generated):
// [
//   "┌────────────────────────────────┐",
//   "│ System Dashboard               │",
//   "│ CPU ████████░░ 72%             │",
//   "│ MEM ██████░░░░ 58%             │",
//   "└────────────────────────────────┘",
// ]
```
## Full reference
| Method                  | Description                                         |
| ----------------------- | --------------------------------------------------- |
| `render(el, opts?)`     | Render into a virtual screen. Returns TestInstance. |
| `t.getByText(text)`     | Find first matching widget, or null                 |
| `t.getAllByText(text)`  | Find all widgets containing the text                |
| `t.getAllByType(Type)`  | Find all widgets of a constructor                   |
| `t.lastFrame()`         | Screen rows as string[]                             |
| `t.toString()`          | Screen as a single string                           |
| `t.fireKey(key, mods?)` | Simulate a key press                                |
| `t.typeText(text)`      | Type characters one by one                          |
| `t.rerender(el?)`       | Re-render, optionally with new element              |
| `t.unmount()`           | Clean up all component state                        |
| `t.container`           | The root Box widget                                 |
| `t.screen`              | The raw Screen buffer                               |
## See also

- **Vitest**: Recommended test runner
- **Guide: Testing**: Patterns for state, async, and snapshot tests
- **@termuijs/store**: Call `destroy()` in test cleanup
