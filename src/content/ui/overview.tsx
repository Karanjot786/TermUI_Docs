export function UiOverview() {
    return (
        <>
            <h1>UI Components</h1>
            <p>
                <code>@termuijs/ui</code> has ten interactive components built on top
                of <code>@termuijs/widgets</code>. Each one handles its own keyboard
                navigation, focus management, and rendering. You wire up data, set
                callbacks, and let the widget do the rest.
            </p>

            <h2 id="installation">Installation</h2>
            <pre><code>{`npm install @termuijs/ui`}</code></pre>
            <p>
                Peer dependencies: <code>@termuijs/core</code> and{' '}
                <code>@termuijs/widgets</code> must be installed in the same project.
            </p>

            <h2 id="select">Select</h2>
            <p>
                Single-choice dropdown with keyboard navigation. Up/Down to move,
                Enter to confirm, Escape to close.
            </p>
            <pre><code>{`import { Select } from '@termuijs/ui'
import { App } from '@termuijs/core'

const select = new Select(
    [
        { label: 'Development', value: 'dev' },
        { label: 'Staging',     value: 'staging' },
        { label: 'Production',  value: 'prod', disabled: true },
    ],
    {
        label: 'Choose environment:',
        onSelect: (option, index) => console.log('Picked:', option.value),
    }
)

const app = new App(select, { fullscreen: true })
app.events.on('key', (e) => {
    if (e.key === 'up')     select.selectPrev()
    if (e.key === 'down')   select.selectNext()
    if (e.key === 'enter')  select.confirm()
    if (e.key === 'escape') select.close()
})
await app.mount()`}</code></pre>

            <h3 id="select-api">Select Methods</h3>
            <table>
                <thead><tr><th>Method</th><th>Description</th></tr></thead>
                <tbody>
                    <tr><td><code>open()</code></td><td>Expand the dropdown</td></tr>
                    <tr><td><code>close()</code></td><td>Collapse the dropdown</td></tr>
                    <tr><td><code>toggle()</code></td><td>Toggle open/closed</td></tr>
                    <tr><td><code>selectNext()</code></td><td>Move cursor down (skips disabled)</td></tr>
                    <tr><td><code>selectPrev()</code></td><td>Move cursor up (skips disabled)</td></tr>
                    <tr><td><code>confirm()</code></td><td>Fire <code>onSelect</code> with current item</td></tr>
                </tbody>
            </table>

            <h2 id="multiselect">MultiSelect</h2>
            <p>
                Multi-choice selector. Space to toggle an item, Enter to submit the
                selection.
            </p>
            <pre><code>{`import { MultiSelect } from '@termuijs/ui'

const multi = new MultiSelect(
    [
        { label: '@termuijs/core',    value: 'core' },
        { label: '@termuijs/widgets', value: 'widgets' },
        { label: '@termuijs/motion',  value: 'motion' },
        { label: '@termuijs/tss',     value: 'tss' },
    ],
    {
        label: 'Select packages to install:',
        onSubmit: (selected) => console.log('Chosen:', selected),
    }
)`}</code></pre>

            <h3 id="multiselect-api">MultiSelect Methods</h3>
            <table>
                <thead><tr><th>Method</th><th>Description</th></tr></thead>
                <tbody>
                    <tr><td><code>selectNext()</code></td><td>Move cursor down (skips disabled)</td></tr>
                    <tr><td><code>selectPrev()</code></td><td>Move cursor up (skips disabled)</td></tr>
                    <tr><td><code>toggleCurrent()</code></td><td>Toggle the item at the cursor</td></tr>
                    <tr><td><code>submit()</code></td><td>Fire <code>onSubmit</code> with all selected options</td></tr>
                    <tr><td><code>selectedOptions</code></td><td>Array of currently selected options</td></tr>
                </tbody>
            </table>

            <h2 id="tabs">Tabs</h2>
            <p>
                Tabbed content panels. Each tab holds a label and a content widget.
                Arrow keys switch tabs.
            </p>
            <pre><code>{`import { Tabs } from '@termuijs/ui'
import { Text } from '@termuijs/widgets'
import { App } from '@termuijs/core'

const tabs = new Tabs(
    [
        { label: 'Overview', content: new Text('Overview content here') },
        { label: 'Logs',     content: new Text('Log output') },
        { label: 'Metrics',  content: new Text('Metrics data') },
    ],
)

const app = new App(tabs, { fullscreen: true })
app.events.on('key', (e) => {
    if (e.key === 'left')  tabs.prevTab()
    if (e.key === 'right') tabs.nextTab()
})
await app.mount()`}</code></pre>

            <h3 id="tabs-api">Tabs Methods</h3>
            <table>
                <thead><tr><th>Method</th><th>Description</th></tr></thead>
                <tbody>
                    <tr><td><code>nextTab()</code></td><td>Switch to the next tab (wraps around)</td></tr>
                    <tr><td><code>prevTab()</code></td><td>Switch to the previous tab (wraps around)</td></tr>
                    <tr><td><code>selectTab(i)</code></td><td>Jump to tab at index <code>i</code></td></tr>
                </tbody>
            </table>

            <h2 id="modal">Modal</h2>
            <p>
                Overlay dialog that can hold any widget as content. Call{' '}
                <code>show()</code> and <code>hide()</code> to control visibility.
            </p>
            <pre><code>{`import { Modal } from '@termuijs/ui'
import { Text } from '@termuijs/widgets'

const modal = new Modal({
    title: 'Delete item?',
    width: 40,
    height: 8,
})
modal.setContent(new Text('This action cannot be undone.'))

// Show the modal when user presses 'd'
app.events.on('key', (e) => {
    if (e.key === 'd')      modal.show()
    if (e.key === 'escape') modal.hide()
})`}</code></pre>

            <h3 id="modal-api">Modal Methods</h3>
            <table>
                <thead><tr><th>Method</th><th>Description</th></tr></thead>
                <tbody>
                    <tr><td><code>show()</code></td><td>Make the modal visible</td></tr>
                    <tr><td><code>hide()</code></td><td>Hide the modal</td></tr>
                    <tr><td><code>toggle()</code></td><td>Toggle visibility</td></tr>
                    <tr><td><code>setContent(widget)</code></td><td>Replace the modal body</td></tr>
                </tbody>
            </table>

            <h2 id="tree">Tree</h2>
            <p>
                Expandable tree for hierarchical data. Up/Down to navigate,
                Enter or Space to expand/collapse or select leaf nodes.
            </p>
            <pre><code>{`import { Tree } from '@termuijs/ui'
import { App } from '@termuijs/core'

const tree = new Tree(
    [
        {
            label: 'src/',
            expanded: true,
            children: [
                {
                    label: 'components/',
                    children: [
                        { label: 'Button.tsx' },
                        { label: 'Input.tsx' },
                    ],
                },
                { label: 'index.ts' },
            ],
        },
    ],
    {
        onSelect: (node, path) => console.log('Selected:', node.label),
    }
)

const app = new App(tree, { fullscreen: true })
app.events.on('key', (e) => {
    if (e.key === 'up')    tree.selectPrev()
    if (e.key === 'down')  tree.selectNext()
    if (e.key === 'enter') tree.confirm()
    if (e.key === 'space') tree.toggleExpand()
})
await app.mount()`}</code></pre>

            <h2 id="toast">Toast</h2>
            <p>
                Timed notification. Push messages to a stack — they auto-expire
                after a timeout.
            </p>
            <pre><code>{`import { Toast } from '@termuijs/ui'

const toasts = new Toast({
    position: 'bottom-right',
    durationMs: 3000,
    maxVisible: 5,
})

// Push notifications from anywhere
toasts.success('File saved')
toasts.error('Network error')
toasts.warning('Disk usage at 90%')
toasts.info('Syncing...')`}</code></pre>

            <h3 id="toast-api">Toast Methods</h3>
            <table>
                <thead><tr><th>Method</th><th>Description</th></tr></thead>
                <tbody>
                    <tr><td><code>push(text, type?)</code></td><td>Show a notification (<code>type</code>: info, success, warning, error)</td></tr>
                    <tr><td><code>info(text)</code></td><td>Shortcut for <code>push(text, 'info')</code></td></tr>
                    <tr><td><code>success(text)</code></td><td>Shortcut for <code>push(text, 'success')</code></td></tr>
                    <tr><td><code>warning(text)</code></td><td>Shortcut for <code>push(text, 'warning')</code></td></tr>
                    <tr><td><code>error(text)</code></td><td>Shortcut for <code>push(text, 'error')</code></td></tr>
                </tbody>
            </table>

            <h2 id="form">Form</h2>
            <p>
                Form with fields, Tab/Shift+Tab navigation, and submission.
            </p>
            <pre><code>{`import { Form } from '@termuijs/ui'
import { App } from '@termuijs/core'

const form = new Form(
    [
        { name: 'user', label: 'Username', required: true },
        { name: 'pass', label: 'Password', required: true, masked: true },
    ],
    {
        onSubmit: (values) => {
            console.log('Submitted:', values)
            // values is Map<string, string>
        },
    }
)

const app = new App(form, { fullscreen: true })
app.events.on('key', (e) => {
    if (e.key === 'tab')   form.nextField()
    if (e.key === 'enter') form.submit()
})
await app.mount()`}</code></pre>

            <h2 id="commandpalette">CommandPalette</h2>
            <p>
                Fuzzy-search command launcher. Type to filter, Enter to run.
            </p>
            <pre><code>{`import { CommandPalette } from '@termuijs/ui'

const palette = new CommandPalette(
    [
        { id: 'open',  label: 'Open file…',    action: openFile },
        { id: 'save',  label: 'Save',           shortcut: 'Ctrl+S', action: saveFile },
        { id: 'quit',  label: 'Quit',           shortcut: 'Ctrl+Q', action: () => app.exit() },
        { id: 'theme', label: 'Switch theme…',  action: pickTheme },
    ],
    { placeholder: 'Type a command…' }
)

// Toggle with Ctrl+P
app.events.on('key', (e) => {
    if (e.ctrl && e.key === 'p') palette.toggle()
})`}</code></pre>

            <h3 id="palette-api">CommandPalette Methods</h3>
            <table>
                <thead><tr><th>Method</th><th>Description</th></tr></thead>
                <tbody>
                    <tr><td><code>show()</code></td><td>Open the palette, reset query</td></tr>
                    <tr><td><code>hide()</code></td><td>Close the palette</td></tr>
                    <tr><td><code>toggle()</code></td><td>Open if closed, close if open</td></tr>
                </tbody>
            </table>

            <h2 id="confirmdialog">ConfirmDialog</h2>
            <p>
                Yes/No confirmation. A focused version of Modal that handles
                the confirm/cancel flow for you.
            </p>
            <pre><code>{`import { ConfirmDialog } from '@termuijs/ui'

const dialog = new ConfirmDialog({
    title: 'Delete this item?',
    message: 'This cannot be undone.',
    confirmLabel: 'Delete',
    cancelLabel: 'Cancel',
    onConfirm: () => deleteItem(),
    onCancel: () => console.log('Cancelled'),
})`}</code></pre>

            <h2 id="divider">Divider</h2>
            <p>A horizontal or vertical line to separate sections.</p>
            <pre><code>{`import { Divider } from '@termuijs/ui'

// Horizontal divider with a label
const divider = new Divider({ label: 'Settings', style: 'dashed' })`}</code></pre>

            <h2 id="see-also">See also</h2>
            <ul>
                <li><a href="/docs/widgets/overview">Widgets — Box, Text, ProgressBar, Table</a></li>
                <li><a href="/docs/tss/overview">TSS — style UI components with themes</a></li>
                <li><a href="/docs/core/event-emitter">Event Emitter — keyboard event handling</a></li>
            </ul>
        </>
    )
}
