export function CoreLayout() {
    return (
        <>
            <h1>Layout engine</h1>
            <p>The layout engine computes positions and sizes for terminal widgets using a flexbox-inspired algorithm. You describe a tree of nodes with style constraints, and it figures out where everything goes.</p>

            <h2 id="usage">How it works</h2>
            <p>Build a tree with <code>createLayoutNode()</code>, then pass the root to <code>computeLayout()</code>. The engine modifies each node's <code>.computed</code> rect in place.</p>
            <pre><code>{`import { createLayoutNode, computeLayout } from '@termuijs/core'

// Build the tree
const header  = createLayoutNode('header',  { height: 3 })
const content = createLayoutNode('content', { flexGrow: 1 })
const footer  = createLayoutNode('footer',  { height: 1 })

const root = createLayoutNode('root', {
    flexDirection: 'column',
    padding: 1,
}, [header, content, footer])

// Compute. mutates .computed on each node
computeLayout(root, 80, 24)

console.log(header.computed)
// → { x: 1, y: 1, width: 78, height: 3 }
console.log(content.computed)
// → { x: 1, y: 4, width: 78, height: 18 }
console.log(footer.computed)
// → { x: 1, y: 22, width: 78, height: 1 }`}</code></pre>

            <h2 id="properties">Layout properties</h2>
            <table>
                <thead><tr><th>Property</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
                <tbody>
                    <tr><td><code>width</code></td><td><code>number | string</code></td><td>—</td><td>Fixed width in columns, or percentage like <code>'50%'</code></td></tr>
                    <tr><td><code>height</code></td><td><code>number | string</code></td><td>—</td><td>Fixed height in rows, or percentage</td></tr>
                    <tr><td><code>padding</code></td><td><code>number | Edges</code></td><td><code>0</code></td><td>Inner spacing on all sides</td></tr>
                    <tr><td><code>margin</code></td><td><code>number | Edges</code></td><td><code>0</code></td><td>Outer spacing on all sides</td></tr>
                    <tr><td><code>flexDirection</code></td><td><code>'row' | 'column'</code></td><td><code>'column'</code></td><td>Main axis direction</td></tr>
                    <tr><td><code>justifyContent</code></td><td><code>'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around'</code></td><td><code>'flex-start'</code></td><td>Main axis alignment</td></tr>
                    <tr><td><code>alignItems</code></td><td><code>'flex-start' | 'flex-end' | 'center' | 'stretch'</code></td><td><code>'stretch'</code></td><td>Cross axis alignment</td></tr>
                    <tr><td><code>flexGrow</code></td><td><code>number</code></td><td><code>0</code></td><td>How much free space this node should absorb</td></tr>
                    <tr><td><code>flexShrink</code></td><td><code>number</code></td><td><code>1</code></td><td>How much this node shrinks when space is tight</td></tr>
                    <tr><td><code>gap</code></td><td><code>number</code></td><td><code>0</code></td><td>Space between children</td></tr>
                    <tr><td><code>border</code></td><td><code>BorderStyle</code></td><td><code>'none'</code></td><td>Border style (takes up space in the layout)</td></tr>
                    <tr><td><code>visible</code></td><td><code>boolean</code></td><td><code>true</code></td><td>Hidden nodes are skipped during layout</td></tr>
                </tbody>
            </table>

            <h2 id="flex-grow">Flex grow</h2>
            <p>Nodes with <code>flexGrow</code> split the remaining space proportionally. A node with <code>flexGrow: 2</code> gets twice the free space as a node with <code>flexGrow: 1</code>:</p>
            <pre><code>{`const left  = createLayoutNode('left',  { flexGrow: 1 })
const right = createLayoutNode('right', { flexGrow: 2 })
const row   = createLayoutNode('row', { flexDirection: 'row' }, [left, right])

computeLayout(row, 90, 10)
// left.computed.width  → 30  (1/3 of 90)
// right.computed.width → 60  (2/3 of 90)`}</code></pre>
            <p>All computed values are rounded to integers. Terminal cells can't have fractional positions.</p>

            <h2 id="constraint-layout">Constraint layout</h2>
            <p>For cases where flexbox isn't a good fit, the <code>splitRect</code> utility divides a rectangle using explicit constraints:</p>
            <pre><code>{`import { splitRect, length, fill, percentage } from '@termuijs/core'

const areas = splitRect(
    { x: 0, y: 0, width: 80, height: 24 },
    'horizontal',
    [length(20), fill(), percentage(25)]
)
// → [{ x:0, width:20 }, { x:20, width:40 }, { x:60, width:20 }]`}</code></pre>
        </>
    )
}
