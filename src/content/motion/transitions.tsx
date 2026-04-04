export function MotionTransitions() {
    return (
        <>
            <h1>Easings & Transitions</h1>
            <p>Easing functions map a progress value (0–1) to a curved output. Pair them with a timer to animate anything — position, opacity, color interpolation. Unlike springs, easing functions are time-based: you specify a duration and the curve does the rest.</p>

            <h2 id="usage">Usage</h2>
            <pre><code>{`import { easings } from '@termuijs/motion'

// All easings take a number 0–1 and return 0–1
easings.easeInOut(0.0)  // → 0
easings.easeInOut(0.5)  // → 0.5
easings.easeInOut(1.0)  // → 1`}</code></pre>

            <h2 id="available-easings">Available easings</h2>
            <table>
                <thead><tr><th>Easing</th><th>What it does</th></tr></thead>
                <tbody>
                    <tr><td><code>linear</code></td><td>Constant speed — no curve</td></tr>
                    <tr><td><code>easeIn</code></td><td>Starts slow, accelerates to end</td></tr>
                    <tr><td><code>easeOut</code></td><td>Starts fast, decelerates to end</td></tr>
                    <tr><td><code>easeInOut</code></td><td>Slow at both ends, fast in the middle</td></tr>
                    <tr><td><code>easeInQuad</code></td><td>Quadratic acceleration (t²)</td></tr>
                    <tr><td><code>easeOutQuad</code></td><td>Quadratic deceleration</td></tr>
                    <tr><td><code>easeInOutQuad</code></td><td>Quadratic ease in both directions</td></tr>
                    <tr><td><code>easeInCubic</code></td><td>Cubic acceleration curve (t³)</td></tr>
                    <tr><td><code>easeOutCubic</code></td><td>Cubic deceleration curve</td></tr>
                    <tr><td><code>easeInOutCubic</code></td><td>Cubic ease in both directions</td></tr>
                    <tr><td><code>easeInExpo</code></td><td>Exponential acceleration — very snappy start</td></tr>
                    <tr><td><code>easeOutExpo</code></td><td>Exponential deceleration — crisp landing</td></tr>
                    <tr><td><code>easeInBack</code></td><td>Slight overshoot at start before moving forward</td></tr>
                    <tr><td><code>easeOutBack</code></td><td>Overshoots the target then settles back</td></tr>
                </tbody>
            </table>

            <h2 id="properties">Guarantees</h2>
            <ul>
                <li><code>easing(0)</code> always returns <code>0</code></li>
                <li><code>easing(1)</code> always returns <code>1</code></li>
                <li>Standard easings are monotonically increasing (no negative values)</li>
                <li><code>easeInOut</code> variants are symmetric around <code>t = 0.5</code></li>
                <li><code>easeInBack</code> / <code>easeOutBack</code> may temporarily exceed <code>[0, 1]</code></li>
            </ul>

            <h2 id="example">Animation loop example</h2>
            <pre><code>{`import { easings } from '@termuijs/motion'

const duration = 500  // ms
const start = Date.now()

function animate() {
    const elapsed = Date.now() - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = easings.easeOutCubic(progress)

    // Move a dot across 40 columns
    const x = Math.round(eased * 40)
    screen.writeString(x, 5, '●')

    if (progress < 1) setTimeout(animate, 16)
}

animate()`}</code></pre>

            <h2 id="with-spring">When to use springs instead</h2>
            <p>Easing functions are ideal for one-shot, fixed-duration transitions (page loads, reveals, progress fills). If your animation reacts to user input mid-flight — or needs to look physical — use <a href="/docs/motion/springs">springs</a> instead. Springs handle interrupts gracefully; easing functions don't.</p>

            <h2 id="see-also">See also</h2>
            <ul>
                <li><a href="/docs/motion/springs">Springs — physics-based animation</a></li>
                <li><a href="/docs/widgets/overview">Widgets — animatable terminal components</a></li>
            </ul>
        </>
    )
}
