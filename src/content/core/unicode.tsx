export function CoreUnicode() {
    return (
        <>
            <h1>String utilities</h1>
            <p><code>@termuijs/core</code> includes string width and wrapping utilities that handle the tricky parts of terminal text. CJK characters that take two columns, combining marks that take zero, and ANSI escape sequences that should be invisible to layout.</p>

            <h2 id="string-width">stringWidth</h2>
            <p>Calculate how many terminal columns a string occupies. Not the same as <code>.length</code>. a Chinese character takes 2 columns, an ANSI escape takes 0:</p>
            <pre><code>{`import { stringWidth } from '@termuijs/core'

stringWidth('Hello')   // → 5
stringWidth('你好')     // → 4  (each CJK char = 2 columns)
stringWidth('\\x1b[32mgreen\\x1b[0m')  // → 5  (escapes are invisible)`}</code></pre>

            <h2 id="truncate">truncate</h2>
            <p>Cut a string to fit a column width, adding an ellipsis if it was truncated:</p>
            <pre><code>{`import { truncate } from '@termuijs/core'

truncate('Hello World', 8)   // → 'Hello W…'
truncate('Short', 10)        // → 'Short'  (no truncation needed)
truncate('你好世界', 5)       // → '你好…'`}</code></pre>

            <h2 id="word-wrap">wordWrap</h2>
            <p>Wrap text to a column width, breaking at word boundaries. Returns a single string with newlines inserted:</p>
            <pre><code>{`import { wordWrap } from '@termuijs/core'

const wrapped = wordWrap('The quick brown fox jumps over the lazy dog', 15)
console.log(wrapped)
// "The quick brown"
// "fox jumps over "
// "the lazy dog"

// Split into lines if you need an array
const lines = wrapped.split('\\n')`}</code></pre>

            <h2 id="strip-ansi">stripAnsi</h2>
            <p>Remove all ANSI escape sequences from a string, leaving only the visible text:</p>
            <pre><code>{`import { stripAnsi } from '@termuijs/core'

stripAnsi('\\x1b[32mHello\\x1b[0m')  // → 'Hello'`}</code></pre>

            <h2 id="api">API reference</h2>
            <table>
                <thead><tr><th>Function</th><th>Signature</th><th>Returns</th></tr></thead>
                <tbody>
                    <tr><td><code>stringWidth</code></td><td><code>(str: string) =&gt; number</code></td><td>Visual width in terminal columns</td></tr>
                    <tr><td><code>truncate</code></td><td><code>(str, maxWidth, ellipsis?) =&gt; string</code></td><td>Truncated string with ellipsis</td></tr>
                    <tr><td><code>wordWrap</code></td><td><code>(str, width) =&gt; string</code></td><td>Word-wrapped string with <code>\n</code></td></tr>
                    <tr><td><code>stripAnsi</code></td><td><code>(str: string) =&gt; string</code></td><td>String with ANSI codes removed</td></tr>
                </tbody>
            </table>
        </>
    )
}
