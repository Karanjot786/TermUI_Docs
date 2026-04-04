export function MotionSprings() {
    return (
        <>
            <h1>Springs</h1>
            <p>Spring animations in TermUI are physics-based. Instead of specifying a duration and easing curve, you describe how the spring feels — stiffness, damping, mass — and the math handles the rest. The result is motion that looks natural, with overshoot and settling that you don't have to hand-tune.</p>

            <h2 id="installation">Installation</h2>
            <pre><code>{`npm install @termuijs/motion`}</code></pre>

            <h2 id="when-to-use">When to use springs</h2>
            <p>Springs shine in three scenarios:</p>
            <ul>
                <li><strong>Interrupted animations</strong> — if a value is mid-flight when the target changes, a spring naturally continues from its current velocity. Easing functions reset abruptly.</li>
                <li><strong>Physical UI</strong> — panels that drag open, items that snap into place, progress bars that overshoot then correct. The motion reads as intentional rather than programmed.</li>
                <li><strong>Chained motion</strong> — one spring's output feeds another's input, producing cascaded motion without manual orchestration.</li>
            </ul>
            <p>For fixed-duration, one-shot transitions (page reveals, fade-ins), <a href="/docs/motion/transitions">easings</a> are simpler and more predictable.</p>

            <h2 id="usage">Basic usage</h2>
            <p>Springs work on a state machine. Each call to <code>stepSpring()</code> advances the simulation by one time step:</p>
            <pre><code>{`import { stepSpring, SPRING_PRESETS } from '@termuijs/motion'
import type { SpringState } from '@termuijs/motion'

let state: SpringState = {
    value: 0,
    velocity: 0,
    target: 100,
    done: false,
}

// Advance one frame (dt in seconds, so 1/60 ≈ 16ms)
state = stepSpring(state, SPRING_PRESETS.default, 1 / 60)
console.log(state.value)  // → moving toward 100
console.log(state.done)   // → false (still animating)`}</code></pre>

            <h2 id="animate">animateSpring helper</h2>
            <p>If you don't want to manage the loop yourself, <code>animateSpring()</code> runs the full animation and calls you on each frame:</p>
            <pre><code>{`import { animateSpring, SPRING_PRESETS } from '@termuijs/motion'

animateSpring({
    from: 0,
    to: 40,
    config: SPRING_PRESETS.wobbly,
    onUpdate: (value) => {
        screen.writeString(Math.round(value), 5, '●')
    },
    onComplete: () => {
        console.log('settled')
    },
})`}</code></pre>

            <h2 id="presets">Presets</h2>
            <table>
                <thead><tr><th>Preset</th><th>Stiffness</th><th>Damping</th><th>How it feels</th></tr></thead>
                <tbody>
                    <tr><td><code>default</code></td><td>170</td><td>26</td><td>Balanced, general purpose</td></tr>
                    <tr><td><code>gentle</code></td><td>120</td><td>14</td><td>Soft and eased</td></tr>
                    <tr><td><code>wobbly</code></td><td>180</td><td>12</td><td>Bouncy, overshoots the target</td></tr>
                    <tr><td><code>stiff</code></td><td>210</td><td>20</td><td>Snappy, settles fast</td></tr>
                    <tr><td><code>slow</code></td><td>280</td><td>60</td><td>Deliberate, smooth ramp</td></tr>
                    <tr><td><code>molasses</code></td><td>280</td><td>120</td><td>Very slow, heavy feel</td></tr>
                </tbody>
            </table>

            <h2 id="custom">Custom springs</h2>
            <p>Pass your own config instead of a preset. Higher stiffness = faster. Higher damping = less bounce.</p>
            <pre><code>{`state = stepSpring(state, {
    stiffness: 300,
    damping: 10,
    mass: 2,
}, 1 / 60)`}</code></pre>

            <h2 id="integration">Integration example</h2>
            <p>A progress bar that animates to real CPU load values using a spring:</p>
            <pre><code>{`import { App } from '@termuijs/core'
import { Box, Text, ProgressBar } from '@termuijs/widgets'
import { animateSpring, SPRING_PRESETS } from '@termuijs/motion'
import { cpu } from '@termuijs/data'

const bar = new ProgressBar({ width: 30, label: 'CPU' })
let currentValue = 0

async function updateCpu() {
    const info = await cpu()
    const target = info.total / 100

    animateSpring({
        from: currentValue,
        to: target,
        config: SPRING_PRESETS.stiff,
        onUpdate: (v) => {
            currentValue = v
            bar.setValue(Math.max(0, Math.min(1, v)))
            app.requestRender()
        },
    })
}

const root = new Box({ padding: 1 })
root.addChild(new Text('System load', { bold: true }))
root.addChild(bar)

const app = new App(root, { fullscreen: true })
await app.mount()

setInterval(updateCpu, 1000)`}</code></pre>

            <h2 id="see-also">See also</h2>
            <ul>
                <li><a href="/docs/motion/transitions">Transitions — easing functions for fixed-duration animation</a></li>
                <li><a href="/docs/widgets/overview">Widgets — ProgressBar and other animatable components</a></li>
            </ul>
        </>
    )
}
