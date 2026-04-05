export function GuideFirstApp() {
    return (
        <>
            <h1>Build your first app</h1>
            <p>This tutorial walks through building a system monitoring dashboard. By the end you'll have gauges, a process table, log output, and keyboard navigation between panels.</p>

            <h2 id="what-we-build">What we're building</h2>
            <ul>
                <li>CPU and memory usage gauges</li>
                <li>A process list table</li>
                <li>A log viewer with auto-scroll</li>
                <li>Tab to switch between panels, q to quit</li>
            </ul>

            <h2 id="step-1">Step 1: create the project</h2>
            <pre><code>{`$ npx create-termui-app my-dashboard
$ cd my-dashboard
$ npm install @termuijs/widgets @termuijs/tss @termuijs/data`}</code></pre>

            <h2 id="step-2">Step 2: set up a theme</h2>
            <p>Create <code>src/theme.tss</code> with your dashboard color palette:</p>
            <pre><code>{`@theme dashboard {
  --primary: #00ff88;
  --secondary: #00d4ff;
  --bg: #0a0a0f;
  --border: #2a2a45;
  --text: #e8e8f0;
  --dim: #55557a;
}

Box {
  border-color: var(--border);
}

Box:focused {
  border-color: var(--primary);
}

Text {
  color: var(--text);
}

Text.dim {
  color: var(--dim);
}`}</code></pre>
            <p>Then load it in your app entry point:</p>
            <pre><code>{`import { ThemeEngine } from '@termuijs/tss'
import { readFileSync } from 'node:fs'

const engine = new ThemeEngine()
engine.load(readFileSync('./src/theme.tss', 'utf8'))
engine.setTheme('dashboard')`}</code></pre>

            <h2 id="step-3">Step 3: build the layout</h2>
            <p>Build the widget tree and immediately mount the app so the screen is live while data loads:</p>
            <pre><code>{`import { App } from '@termuijs/core'
import { Box, Text, ProgressBar, Table } from '@termuijs/widgets'

// Header
const header = new Box({ padding: 1, border: 'single' })
header.addChild(new Text('System Dashboard', { bold: true }))

// Gauge panel
const gaugePanel = new Box({ flexDirection: 'column', padding: 1 })
const cpuBar = new ProgressBar({ width: 25, label: 'CPU' })
const memBar = new ProgressBar({ width: 25, label: 'MEM' })
gaugePanel.addChild(cpuBar)
gaugePanel.addChild(memBar)

// Process panel
const processPanel = new Box({ flexGrow: 1, padding: 1, border: 'single' })
processPanel.addChild(new Text('Processes', { dim: true, className: 'dim' }))

// Log panel
const logPanel = new Box({ height: 8, padding: 1, border: 'single' })
logPanel.addChild(new Text('Logs', { dim: true, className: 'dim' }))

// Assemble the layout
const content = new Box({ flexDirection: 'row', flexGrow: 1 })
content.addChild(gaugePanel)
content.addChild(new Box({ flexDirection: 'column', flexGrow: 1 }, [processPanel, logPanel]))

const root = new Box({ flexDirection: 'column' })
root.addChild(header)
root.addChild(content)

// Apply theme to the tree
engine.onChange(() => {
    root.applyStyles(engine.resolveStyle('Box'))
    app.requestRender()
})
root.applyStyles(engine.resolveStyle('Box'))

// Mount. app is now live
const app = new App(root, { fullscreen: true })
await app.mount()`}</code></pre>

            <h2 id="step-4">Step 4: add real data</h2>
            <p>Start the data polling loop after <code>app.mount()</code> resolves:</p>
            <pre><code>{`import { cpu, memory } from '@termuijs/data'

setInterval(async () => {
    const cpuInfo = await cpu()
    const memInfo = await memory()

    cpuBar.setValue(cpuInfo.total / 100)
    memBar.setValue(memInfo.usedPercent / 100)
    app.requestRender()
}, 1000)`}</code></pre>

            <h2 id="step-5">Step 5: add keyboard navigation</h2>
            <pre><code>{`app.events.on('key', (event) => {
    if (event.key === 'tab')  focusNext()
    if (event.key === 'q')    app.exit()
})`}</code></pre>

            <h2 id="next-steps">Next steps</h2>
            <ul>
                <li><a href="/docs/tss/overview"><strong>TSS</strong>: advanced selector syntax and runtime theme switching</a></li>
                <li><a href="/docs/motion/springs"><strong>Springs</strong>: animate the gauge values with physics</a></li>
                <li><a href="/docs/widgets/virtual-list"><strong>VirtualList</strong>: handle large process lists efficiently</a></li>
            </ul>
        </>
    )
}
