export function CoreOverview() {
    return (
        <>
            <h1>Core</h1>
            <p>Everything in TermUI sits on top of <code>@termuijs/core</code>. It handles the screen buffer, input decoding, layout computation, style data, events, and the application lifecycle. If you only install one package, this is it.</p>

            <h2 id="installation">Installation</h2>
            <pre><code>{`npm install @termuijs/core`}</code></pre>

            <h2 id="key-exports">What's inside</h2>
            <table>
                <thead><tr><th>Export</th><th>What it does</th></tr></thead>
                <tbody>
                    <tr><td><code>App</code></td><td>Wires terminal, input, screen, and render loop together</td></tr>
                    <tr><td><code>Screen</code></td><td>Double-buffered cell grid with diff-based rendering</td></tr>
                    <tr><td><code>Renderer</code></td><td>Diffs screen buffers and flushes changes to stdout</td></tr>
                    <tr><td><code>Terminal</code></td><td>Raw mode, alt screen, cursor control, resize events</td></tr>
                    <tr><td><code>InputParser</code></td><td>Decodes raw stdin bytes into key and mouse events</td></tr>
                    <tr><td><code>EventEmitter</code></td><td>Type-safe publish/subscribe</td></tr>
                    <tr><td><code>FocusManager</code></td><td>Tab-order focus cycling across widgets</td></tr>
                    <tr><td><code>createLayoutNode / computeLayout</code></td><td>Flexbox-inspired layout engine</td></tr>
                    <tr><td><code>defaultStyle / mergeStyles</code></td><td>Style objects. colors, bold, dim, underline</td></tr>
                    <tr><td><code>parseColor</code></td><td>Named, hex, and RGB color parsing</td></tr>
                    <tr><td><code>stringWidth / truncate / wordWrap</code></td><td>Unicode-aware string measurement and wrapping</td></tr>
                </tbody>
            </table>

            <h2 id="quick-example">Quick example</h2>
            <pre><code>{`import { App } from '@termuijs/core'
import { Box, Text } from '@termuijs/widgets'

const root = new Box({ border: 'round', padding: 1 })
root.addChild(new Text('Hello, TermUI!', { bold: true }))

const app = new App(root)

app.events.on('key', (event) => {
    if (event.key === 'q') app.exit()
})

await app.mount()`}</code></pre>

            <h2 id="architecture">How other packages use core</h2>
            <ul>
                <li><code>@termuijs/widgets</code> renders into the Screen buffer and uses the layout engine for positioning</li>
                <li><code>@termuijs/tss</code> builds on top of the Style interface, adding CSS-like variables and themes</li>
                <li><code>@termuijs/router</code> plugs into the App lifecycle for screen transitions</li>
                <li><code>@termuijs/motion</code> animates style properties through the render loop</li>
            </ul>
        </>
    )
}
