export function CoreInputParser() {
    return (
        <>
            <h1>Input parser</h1>
            <p>The <code>InputParser</code> sits between raw stdin and your app. It reads bytes off the stream, decodes escape sequences, and fires typed <code>KeyEvent</code> and <code>MouseEvent</code> callbacks. You usually don't create one yourself — the App does it for you — but it's there if you need lower-level control.</p>

            <h2 id="usage">Usage</h2>
            <pre><code>{`import { InputParser } from '@termuijs/core'

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
parser.stop()`}</code></pre>

            <h2 id="key-events">KeyEvent</h2>
            <pre><code>{`interface KeyEvent {
    key: string        // 'a', 'enter', 'up', 'escape', etc.
    ctrl: boolean      // Ctrl was held
    shift: boolean     // Shift was held
    alt: boolean       // Alt/Option was held
    raw: Buffer        // The original bytes from stdin
}`}</code></pre>

            <h2 id="supported-keys">Supported keys</h2>
            <table>
                <thead><tr><th>Category</th><th>Keys</th></tr></thead>
                <tbody>
                    <tr><td>Printable</td><td>All ASCII characters</td></tr>
                    <tr><td>Navigation</td><td><code>up</code>, <code>down</code>, <code>left</code>, <code>right</code>, <code>home</code>, <code>end</code>, <code>pageup</code>, <code>pagedown</code></td></tr>
                    <tr><td>Control</td><td><code>enter</code>, <code>tab</code>, <code>escape</code>, <code>backspace</code>, <code>delete</code>, <code>space</code></td></tr>
                    <tr><td>Function</td><td><code>f1</code> through <code>f12</code></td></tr>
                    <tr><td>Modifiers</td><td><code>ctrl+*</code>, <code>shift+*</code>, <code>alt+*</code></td></tr>
                </tbody>
            </table>

            <h2 id="api">API</h2>
            <table>
                <thead><tr><th>Method</th><th>What it does</th></tr></thead>
                <tbody>
                    <tr><td><code>onKey(handler)</code></td><td>Register a key event callback. Returns unsubscribe function.</td></tr>
                    <tr><td><code>onMouse(handler)</code></td><td>Register a mouse event callback. Returns unsubscribe function.</td></tr>
                    <tr><td><code>start()</code></td><td>Begin reading from stdin.</td></tr>
                    <tr><td><code>stop()</code></td><td>Stop reading. Can be restarted later.</td></tr>
                </tbody>
            </table>
        </>
    )
}
