export function GettingStartedInstallation() {
    return (
        <>
            <h1>Installation</h1>
            <p>Get TermUI running in your project. There are two paths: scaffold a new app with the CLI, or add packages to something you already have.</p>

            <h2 id="prerequisites">Prerequisites</h2>
            <ul>
                <li><strong>Node.js</strong> 18+ (LTS recommended)</li>
                <li><strong>npm</strong>, <strong>pnpm</strong>, or <strong>yarn</strong></li>
                <li>A terminal with 256-color or truecolor support</li>
            </ul>

            <h2 id="create-new-project">Create a new project</h2>
            <p>The scaffolding CLI sets up a ready-to-run project:</p>
            <pre><code>{`# Using npx
$ npx create-termui-app my-app
$ cd my-app
$ npm run dev

# Using pnpm
$ pnpm create termui-app my-app

# Using yarn
$ yarn create termui-app my-app`}</code></pre>

            <p>This gives you:</p>
            <ul>
                <li>TypeScript configuration</li>
                <li>Hot-reload dev server (<code>npm run dev</code>)</li>
                <li>Example app with Box, Text, and keyboard handling</li>
                <li>TSS theme setup with the default dark theme</li>
                <li>Vitest config for testing</li>
            </ul>

            <h2 id="add-to-existing-project">Add to an existing project</h2>
            <p>Install the packages you need:</p>
            <pre><code>{`# Core framework (required)
npm install @termuijs/core

# UI building blocks
npm install @termuijs/widgets    # Box, Text, Table, ProgressBar, VirtualList
npm install @termuijs/ui         # Select, Tabs, Modal, Toast, Tree
npm install @termuijs/jsx        # JSX runtime, hooks, context, memo

# Application features
npm install @termuijs/tss        # Terminal Style Sheets (theming)
npm install @termuijs/router     # Screen routing with dynamic params
npm install @termuijs/motion     # Spring and easing animations
npm install @termuijs/store      # Zustand-style global state
npm install @termuijs/data       # System monitoring (CPU, memory, disk, network)
npm install @termuijs/quick      # Rapid prototyping helpers

# Development tools
npm install --save-dev @termuijs/testing    # In-memory test renderer
npm install --save-dev @termuijs/dev-server # Hot-reload dev server`}</code></pre>

            <h2 id="verify-installation">Verify it works</h2>
            <p>Create an <code>index.ts</code> to check your setup:</p>
            <pre><code>{`import { App, Screen } from '@termuijs/core'
import { Box, Text } from '@termuijs/widgets'

// Build a simple widget tree
const root = new Box({ border: 'round', padding: 1 })
root.addChild(new Text('Hello from TermUI!'))

// Create and mount the app
const app = new App(root, { fullscreen: true })
await app.mount()`}</code></pre>
            <p>Run it:</p>
            <pre><code>{`$ npx tsx index.ts`}</code></pre>
            <p>You should see a rounded box with your text inside. Press <code>Ctrl+C</code> to exit.</p>

            <h2 id="package-overview">Package overview</h2>
            <table>
                <thead>
                    <tr><th>Package</th><th>What it does</th></tr>
                </thead>
                <tbody>
                    <tr><td><code>@termuijs/core</code></td><td>Screen buffer, input parsing, event system, layout engine</td></tr>
                    <tr><td><code>@termuijs/widgets</code></td><td>Box, Text, Table, ProgressBar, Spinner, Gauge, VirtualList</td></tr>
                    <tr><td><code>@termuijs/ui</code></td><td>Select, Tabs, Modal, Toast, Tree, MultiSelect</td></tr>
                    <tr><td><code>@termuijs/jsx</code></td><td>JSX runtime, useState, useEffect, useContext, memo, useAsync</td></tr>
                    <tr><td><code>@termuijs/tss</code></td><td>CSS-like theming with variables and selectors</td></tr>
                    <tr><td><code>@termuijs/router</code></td><td>Screen routing with dynamic params and history</td></tr>
                    <tr><td><code>@termuijs/motion</code></td><td>Spring physics and easing-based transitions</td></tr>
                    <tr><td><code>@termuijs/store</code></td><td>Zustand-style state with selector subscriptions</td></tr>
                    <tr><td><code>@termuijs/data</code></td><td>System monitoring: CPU, memory, disk, network, processes</td></tr>
                    <tr><td><code>@termuijs/quick</code></td><td>Rapid prototyping with reactive values and layout helpers</td></tr>
                    <tr><td><code>@termuijs/testing</code></td><td>In-memory test renderer with query and interaction API</td></tr>
                    <tr><td><code>@termuijs/dev-server</code></td><td>Process-based hot reload for development</td></tr>
                </tbody>
            </table>

            <h2 id="whats-next">Next steps</h2>
            <ul>
                <li><strong>Quick start</strong>: build a working app in a few minutes</li>
                <li><strong>Architecture</strong>: how the packages fit together</li>
                <li><strong>Core overview</strong>: the render engine in detail</li>
                <li><strong>Testing guide</strong>: write your first component test</li>
            </ul>
        </>
    )
}
