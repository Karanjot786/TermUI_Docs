# String utilities

`@termuijs/core` includes string width and wrapping utilities that handle the tricky parts of terminal text. CJK characters that take two columns, combining marks that take zero, and ANSI escape sequences that should be invisible to layout.

## stringWidth

Calculate how many terminal columns a string occupies. Not the same as `.length`. a Chinese character takes 2 columns, an ANSI escape takes 0:

```ts

stringWidth('Hello')   // → 5
stringWidth('你好')     // → 4  (each CJK char = 2 columns)
stringWidth('\x1b[32mgreen\x1b[0m')  // → 5  (escapes are invisible)
```

## truncate

Cut a string to fit a column width, adding an ellipsis if it was truncated:

```ts

truncate('Hello World', 8)   // → 'Hello W…'
truncate('Short', 10)        // → 'Short'  (no truncation needed)
truncate('你好世界', 5)       // → '你好…'
```

## wordWrap

Wrap text to a column width, breaking at word boundaries. Returns a single string with newlines inserted:

```ts

const wrapped = wordWrap('The quick brown fox jumps over the lazy dog', 15)
console.log(wrapped)
// "The quick brown"
// "fox jumps over "
// "the lazy dog"

// Split into lines if you need an array
const lines = wrapped.split('\n')
```

## stripAnsi

Remove all ANSI escape sequences from a string, leaving only the visible text:

```ts

stripAnsi('\x1b[32mHello\x1b[0m')  // → 'Hello'
```

## API reference

| Function      | Signature                              | Returns                          |
| ------------- | -------------------------------------- | -------------------------------- |
| `stringWidth` | `(str: string) => number`              | Visual width in terminal columns |
| `truncate`    | `(str, maxWidth, ellipsis?) => string` | Truncated string with ellipsis   |
| `wordWrap`    | `(str, width) => string`               | Word-wrapped string with `\n`    |
| `stripAnsi`   | `(str: string) => string`              | String with ANSI codes removed   |
