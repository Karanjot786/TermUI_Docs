# @termuijs/charts

`@termuijs/charts` is a dedicated package that re-exports the chart widgets from `@termuijs/widgets`. It gives chart-focused projects a minimal install surface without pulling in the entire widget library.

## Installation

```bash
npm install @termuijs/charts
```

## What it exports

```ts

```

| Export             | Kind   | Description                                         |
| ------------------ | ------ | --------------------------------------------------- |
| `AreaChart`        | Widget | Time-series line/area chart with configurable axes  |
| `AreaChartOptions` | Type   | Constructor options for AreaChart                   |
| `PieChart`         | Widget | Pie or donut chart rendered with block characters   |
| `PieSlice`         | Type   | A single slice: `{ label, value, color? }`          |
| `PieChartOptions`  | Type   | Constructor options for PieChart                    |
| `Gauge`            | Widget | Horizontal fill bar with a label and optional color |
| `GaugeOptions`     | Type   | Constructor options for Gauge                       |

## Example

```ts

const chart = new AreaChart(
    { data: [10, 40, 20, 80, 60], label: 'Requests' },
    { width: 40, height: 10 },
)

const pie = new PieChart(
    {
        slices: [
            { label: 'User',   value: 60 },
            { label: 'System', value: 25 },
            { label: 'Idle',   value: 15 },
        ],
    },
    { width: 20, height: 10 },
)

const bar = new Gauge('CPU', { height: 1, flexGrow: 1 })
bar.setValue(0.73)

const root = new Box({ flexDirection: 'column', padding: 1 })
root.addChild(chart)
root.addChild(pie)
root.addChild(bar)

const app = new App(root, { fullscreen: true })
await app.mount()
```

## @termuijs/charts vs @termuijs/widgets

Both packages export the same three widgets. The difference is scope.

Use `@termuijs/charts` when:
- Your project displays charts and nothing else (dashboards, monitoring tools, data viewers).
- You want a minimal dependency that signals intent clearly.
- You are publishing a library that only needs chart types.

Use `@termuijs/widgets` (or `@termuijs/quick`) when:
- You already use other widgets like `Table`, `List`, `LogView`, or `TextInput`.
- You want a single import for the full widget surface.

Because `@termuijs/charts` re-exports from `@termuijs/widgets`, installing both in the same project is safe. They share the same underlying classes.

## See also

- [Widgets overview](/docs/widgets/overview)
- [Quick: rapid prototyping](/docs/guides/quick)
