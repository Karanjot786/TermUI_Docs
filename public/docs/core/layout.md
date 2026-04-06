# Layout engine

The layout engine computes positions and sizes for terminal widgets using a flexbox-inspired algorithm. You describe a tree of nodes with style constraints, and it figures out where everything goes.

## How it works

Build a tree with `createLayoutNode()`, then pass the root to `computeLayout()`. The engine modifies each node's `.computed` rect in place.

```ts

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
// → { x: 1, y: 22, width: 78, height: 1 }
```

## Layout properties

| Property         | Type                                                                      | Default        | Description                                        |
| ---------------- | ------------------------------------------------------------------------- | -------------- | -------------------------------------------------- |
| `width`          | `number | string`                                                         | —              | Fixed width in columns, or percentage like `'50%'` |
| `height`         | `number | string`                                                         | —              | Fixed height in rows, or percentage                |
| `padding`        | `number | Edges`                                                          | `0`            | Inner spacing on all sides                         |
| `margin`         | `number | Edges`                                                          | `0`            | Outer spacing on all sides                         |
| `flexDirection`  | `'row' | 'column'`                                                        | `'column'`     | Main axis direction                                |
| `justifyContent` | `'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around'` | `'flex-start'` | Main axis alignment                                |
| `alignItems`     | `'flex-start' | 'flex-end' | 'center' | 'stretch'`                        | `'stretch'`    | Cross axis alignment                               |
| `flexGrow`       | `number`                                                                  | `0`            | How much free space this node should absorb        |
| `flexShrink`     | `number`                                                                  | `1`            | How much this node shrinks when space is tight     |
| `gap`            | `number`                                                                  | `0`            | Space between children                             |
| `border`         | `BorderStyle`                                                             | `'none'`       | Border style (takes up space in the layout)        |
| `visible`        | `boolean`                                                                 | `true`         | Hidden nodes are skipped during layout             |

## Flex grow

Nodes with `flexGrow` split the remaining space proportionally. A node with `flexGrow: 2` gets twice the free space as a node with `flexGrow: 1`:

```ts
const left  = createLayoutNode('left',  { flexGrow: 1 })
const right = createLayoutNode('right', { flexGrow: 2 })
const row   = createLayoutNode('row', { flexDirection: 'row' }, [left, right])

computeLayout(row, 90, 10)
// left.computed.width  → 30  (1/3 of 90)
// right.computed.width → 60  (2/3 of 90)
```

All computed values are rounded to integers. Terminal cells can't have fractional positions.

## Constraint layout

For cases where flexbox isn't a good fit, the `splitRect` utility divides a rectangle using explicit constraints:

```ts

const areas = splitRect(
    { x: 0, y: 0, width: 80, height: 24 },
    'horizontal',
    [length(20), fill(), percentage(25)]
)
// → [{ x:0, width:20 }, { x:20, width:40 }, { x:60, width:20 }]
```
