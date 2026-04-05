export function CoreScreen() {
    return (
        <>
            <h1>Screen</h1>
            <p>The <code>Screen</code> class is a double-buffered grid of cells. It stores what's on screen now and what was there before. On each frame, the <code>Renderer</code> diffs the two buffers and writes only the cells that changed.</p>

            <h2 id="constructor">Constructor</h2>
            <pre><code>{`import { Screen } from '@termuijs/core'

// Create a buffer. typically your terminal dimensions
const screen = new Screen(80, 24)

// The Renderer handles stdout output; Screen just manages cells`}</code></pre>

            <h2 id="writing">Writing to the buffer</h2>
            <pre><code>{`// Write a string at (col, row)
screen.writeString(5, 2, 'Hello TermUI!')

// Write with style attributes (fg, bg, bold, etc.)
screen.writeString(5, 3, 'Bold text', { bold: true })

// Set a single cell
screen.setCell(0, 0, { char: '┌', fg: 'green' })

// Read a cell back
const cell = screen.getCell(0, 0)
// → { char: '┌', fg: 'green', bg: '', ... }`}</code></pre>

            <h2 id="clipping">Clipping regions</h2>
            <p>Push a clip rectangle to restrict where writes land. Anything outside the clip is silently ignored. This is how bordered containers keep content inside their walls:</p>
            <pre><code>{`screen.pushClip({ x: 2, y: 2, width: 20, height: 10 })

// These writes only affect cells inside the clip
screen.writeString(0, 0, 'This is clipped')  // ignored. outside
screen.writeString(3, 3, 'This shows up')     // inside clip

screen.popClip()`}</code></pre>

            <h2 id="lifecycle">Buffer lifecycle</h2>
            <table>
                <thead><tr><th>Method</th><th>What it does</th></tr></thead>
                <tbody>
                    <tr><td><code>writeString(x, y, text, attrs?)</code></td><td>Write text at a position with optional style</td></tr>
                    <tr><td><code>setCell(x, y, cell)</code></td><td>Set a single cell</td></tr>
                    <tr><td><code>getCell(x, y)</code></td><td>Read a cell back</td></tr>
                    <tr><td><code>clear()</code></td><td>Fill the entire buffer with empty cells</td></tr>
                    <tr><td><code>resize(cols, rows)</code></td><td>Resize both buffers (clears content)</td></tr>
                    <tr><td><code>swap()</code></td><td>Swap front and back buffers after the renderer diffs them</td></tr>
                    <tr><td><code>pushClip(rect)</code></td><td>Restrict writes to a rectangular region</td></tr>
                    <tr><td><code>popClip()</code></td><td>Remove the most recent clip</td></tr>
                </tbody>
            </table>

            <h2 id="diffing">How diffing works</h2>
            <p>The screen holds two buffers: <strong>front</strong> (what's visible) and <strong>back</strong> (what we're drawing). Widgets write to the back buffer. The <code>Renderer</code> then walks both buffers cell by cell and emits ANSI escape sequences only for cells that differ. A full-screen update that touches 3 cells writes exactly 3 escape sequences.</p>

            <h2 id="test-backend">Test backend</h2>
            <p>For unit tests, use the in-memory test screen instead of a real terminal:</p>
            <pre><code>{`import { createTestScreen, testScreenToString, testScreenSetString } from '@termuijs/core'

const ts = createTestScreen(30, 5)
testScreenSetString(ts, 0, 0, 'Hello!')
console.log(testScreenToString(ts))
// → "Hello!                        "
//   "                              "
//   ...`}</code></pre>
        </>
    )
}
