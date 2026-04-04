export function UiOverview() {
    return (
        <>
            <h1>UI Components</h1>
            <p><code>@termuijs/ui</code> provides eight high-level interactive components built on top of <code>@termuijs/widgets</code>. Each component handles its own keyboard navigation, focus management, and rendering — you just wire up data and callbacks.</p>

            <h2 id="installation">Installation</h2>
            <pre><code>{`npm install @termuijs/ui`}</code></pre>
            <p>Peer dependencies: <code>@termuijs/core</code> and <code>@termuijs/widgets</code> must be installed in the same project.</p>

            <h2 id="select">Select</h2>
            <p>Single-choice dropdown with keyboard navigation and fuzzy filtering. Renders inline — no popup layer required.</p>
            <pre><code>{`import { Select } from '@termuijs/ui'

const value = await Select.prompt({
  message: 'Choose environment:',
  options: [
    { label: 'Development', value: 'dev' },
    { label: 'Staging',     value: 'staging' },
    { label: 'Production',  value: 'prod' },
  ],
})
// → 'dev' | 'staging' | 'prod'`}</code></pre>

            <h3 id="select-api">Select API</h3>
            <table>
                <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
                <tbody>
                    <tr><td><code>message</code></td><td><code>string</code></td><td>—</td><td>Prompt text shown above the list</td></tr>
                    <tr><td><code>options</code></td><td><code>Option[]</code></td><td>—</td><td>Array of <code>{"{ label, value, hint? }"}</code> objects</td></tr>
                    <tr><td><code>initialValue</code></td><td><code>string</code></td><td><code>undefined</code></td><td>Pre-selected value</td></tr>
                    <tr><td><code>filter</code></td><td><code>boolean</code></td><td><code>true</code></td><td>Enable fuzzy filtering via typing</td></tr>
                    <tr><td><code>pageSize</code></td><td><code>number</code></td><td><code>8</code></td><td>Visible rows before scrolling</td></tr>
                </tbody>
            </table>

            <h2 id="multiselect">MultiSelect</h2>
            <p>Multi-choice selector with Space to toggle, A to select all, Enter to confirm.</p>
            <pre><code>{`import { MultiSelect } from '@termuijs/ui'

const chosen = await MultiSelect.prompt({
  message: 'Select packages to install:',
  options: [
    { label: '@termuijs/core',    value: 'core' },
    { label: '@termuijs/widgets', value: 'widgets' },
    { label: '@termuijs/motion',  value: 'motion' },
    { label: '@termuijs/tss',     value: 'tss' },
  ],
  min: 1,  // require at least one selection
})
// → ['core', 'widgets']`}</code></pre>

            <h3 id="multiselect-api">MultiSelect API</h3>
            <table>
                <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
                <tbody>
                    <tr><td><code>message</code></td><td><code>string</code></td><td>—</td><td>Prompt text</td></tr>
                    <tr><td><code>options</code></td><td><code>Option[]</code></td><td>—</td><td>List of selectable items</td></tr>
                    <tr><td><code>min</code></td><td><code>number</code></td><td><code>0</code></td><td>Minimum required selections</td></tr>
                    <tr><td><code>max</code></td><td><code>number</code></td><td><code>Infinity</code></td><td>Maximum allowed selections</td></tr>
                    <tr><td><code>initialValues</code></td><td><code>string[]</code></td><td><code>[]</code></td><td>Pre-selected values</td></tr>
                </tbody>
            </table>

            <h2 id="tabs">Tabs</h2>
            <p>Tabbed content panels. Arrow keys switch tabs, Enter activates. Tabs render as a horizontal bar above the content region.</p>
            <pre><code>{`import { Tabs, Tab } from '@termuijs/ui'

const tabs = new Tabs()
tabs.addTab(new Tab('Overview',  overviewPanel))
tabs.addTab(new Tab('Logs',      logsPanel))
tabs.addTab(new Tab('Metrics',   metricsPanel))

const app = new App(tabs, { fullscreen: true })
await app.mount()`}</code></pre>

            <h2 id="modal">Modal</h2>
            <p>Overlay dialog that traps focus until dismissed. Renders centered over the existing UI. Escape always closes.</p>
            <pre><code>{`import { Modal } from '@termuijs/ui'

const confirmed = await Modal.confirm({
  title: 'Delete item?',
  message: 'This cannot be undone.',
  confirmLabel: 'Delete',
  cancelLabel:  'Cancel',
})
// → true | false`}</code></pre>

            <h2 id="tree">Tree</h2>
            <p>Expandable tree for hierarchical data. Arrow keys navigate, Space or Enter expands/collapses nodes.</p>
            <pre><code>{`import { Tree, TreeNode } from '@termuijs/ui'

const root = new TreeNode('src/', [
  new TreeNode('components/', [
    new TreeNode('Button.tsx'),
    new TreeNode('Input.tsx'),
  ]),
  new TreeNode('index.ts'),
])

const tree = new Tree(root)
tree.on('select', (node) => console.log('Selected:', node.label))

const app = new App(tree, { fullscreen: true })
await app.mount()`}</code></pre>

            <h2 id="toast">Toast</h2>
            <p>Timed notification overlay. Stacks multiple toasts at the corner of the screen and auto-dismisses after a timeout.</p>
            <pre><code>{`import { ToastManager } from '@termuijs/ui'

const toasts = new ToastManager({ position: 'bottom-right' })
app.addOverlay(toasts)

// Show notifications from anywhere
toasts.show({ message: 'File saved',     variant: 'success', duration: 3000 })
toasts.show({ message: 'Network error',  variant: 'error',   duration: 5000 })
toasts.show({ message: 'Syncing...',     variant: 'info' })  // stays until dismissed`}</code></pre>

            <h2 id="form">Form</h2>
            <p>Form container with built-in validation. Tab advances through fields, Shift+Tab goes back, Enter submits if all fields are valid.</p>
            <pre><code>{`import { Form, TextField, PasswordField } from '@termuijs/ui'

const form = new Form({
  fields: [
    new TextField({ name: 'user',     label: 'Username', required: true }),
    new PasswordField({ name: 'pass', label: 'Password', required: true, minLength: 8 }),
  ],
  onSubmit: async (values) => {
    // values: { user: string; pass: string }
    await login(values.user, values.pass)
  },
})

const app = new App(form, { fullscreen: true })
await app.mount()`}</code></pre>

            <h2 id="commandpalette">CommandPalette</h2>
            <p>Fuzzy-search command launcher. Typically opened via a global keyboard shortcut. Filters commands as you type, runs the selected command on Enter.</p>
            <pre><code>{`import { CommandPalette, Command } from '@termuijs/ui'

const palette = new CommandPalette({
  commands: [
    new Command({ id: 'open',   label: 'Open file…',     action: openFile }),
    new Command({ id: 'save',   label: 'Save',           keys: ['ctrl+s'], action: saveFile }),
    new Command({ id: 'quit',   label: 'Quit',           keys: ['ctrl+q'], action: () => app.exit() }),
    new Command({ id: 'theme',  label: 'Switch theme…',  action: pickTheme }),
  ],
  placeholder: 'Type a command…',
})

// Open on Ctrl+P
app.events.on('key', (e) => {
  if (e.ctrl && e.key === 'p') palette.open()
})`}</code></pre>

            <h2 id="see-also">See also</h2>
            <ul>
                <li><a href="/docs/widgets/overview">Widgets — Box, Text, ProgressBar, Table</a></li>
                <li><a href="/docs/tss/overview">TSS — style UI components with themes</a></li>
                <li><a href="/docs/core/event-emitter">Event Emitter — keyboard event handling</a></li>
            </ul>
        </>
    )
}
