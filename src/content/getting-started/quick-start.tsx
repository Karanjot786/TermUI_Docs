export function GettingStartedQuickStart() {
    return (
        <>
            <h1>Quick start</h1>
            <p>This walks you through building a small interactive app. Should take about five minutes.</p>

            <h2 id="scaffold">1. Scaffold your app</h2>
            <pre><code>{`$ npx create-termui-app my-dashboard
$ cd my-dashboard`}</code></pre>

            <h2 id="hello-world">2. Hello world</h2>
            <p>Open <code>src/index.ts</code> and replace the contents:</p>
            <pre><code>{`import { App } from '@termuijs/core'
import { Box, Text } from '@termuijs/widgets'

const root = new Box({ border: 'round', padding: 1 })
root.addChild(new Text('Hello, TermUI!'))

const app = new App(root, { fullscreen: true })
await app.mount()

// Output:
// ╭─────────────────────╮
// │ Hello, TermUI!       │
// ╰─────────────────────╯`}</code></pre>

            <h2 id="add-interactivity">3. Add keyboard input</h2>
            <p>Let's make it respond to key presses:</p>
            <pre><code>{`import { App } from '@termuijs/core'
import { Box, Text } from '@termuijs/widgets'

let count = 0
const label = new Text('Counter: 0')
const hint  = new Text('Press ↑/↓ to change, q to quit', { dim: true })

const root = new Box({ border: 'round', padding: 1, flexDirection: 'column' })
root.addChild(label)
root.addChild(hint)

const app = new App(root, { fullscreen: true })

app.events.on('key', (event) => {
    if (event.key === 'up')   { count++; label.setContent('Counter: ' + count); app.requestRender() }
    if (event.key === 'down') { count--; label.setContent('Counter: ' + count); app.requestRender() }
    if (event.key === 'q')    app.exit()
})

await app.mount()`}</code></pre>

            <h2 id="add-theming">4. Add a theme</h2>
            <p>Use Terminal Style Sheets to define colors as variables, then apply them to widgets:</p>
            <pre><code>{`import { App } from '@termuijs/core'
import { Box, Text } from '@termuijs/widgets'
import { ThemeEngine } from '@termuijs/tss'

// 1. Define the theme
const engine = new ThemeEngine()
engine.load(\`
  @theme ocean {
    --primary: #00d4ff;
    --bg: #0a0a1a;
    --border: #1a1a3a;
  }

  Box {
    border-color: var(--border);
  }

  Box:focused {
    border-color: var(--primary);
  }
\`)
engine.setTheme('ocean')

// 2. Build the widget tree
const root = new Box({ border: 'round', padding: 1, flexDirection: 'column' })
const title = new Text('Ocean Dashboard', { bold: true })
root.addChild(title)

// 3. Apply theme styles to widgets
root.applyStyles(engine.resolveStyle('Box'))

// 4. Re-apply on theme change
engine.onChange(() => {
    root.applyStyles(engine.resolveStyle('Box'))
    app.requestRender()
})

// 5. Mount the app
const app = new App(root, { fullscreen: true })
await app.mount()`}</code></pre>

            <h2 id="next-steps">Next steps</h2>
            <ul>
                <li><a href="/docs/getting-started/architecture"><strong>Architecture</strong>: how the 13 packages connect</a></li>
                <li><a href="/docs/widgets/overview"><strong>Widgets</strong>: Box, Table, ProgressBar, VirtualList</a></li>
                <li><a href="/docs/tss/overview"><strong>TSS</strong>: Terminal Style Sheets in depth</a></li>
                <li><a href="/docs/motion/springs"><strong>Springs</strong>: physics-based animations</a></li>
            </ul>
        </>
    )
}
