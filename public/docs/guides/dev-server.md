# Dev server and hot reload
The `@termuijs/dev-server` package runs your app in a child process and automatically restarts it whenever a source file changes.

It pairs with the `dev` script in every project created by  `create-termui-app`.
Changes are reflected in under 200ms in most cases; the old process exits, a fresh one starts, and your terminal is live again.
## Usage
```ts
# From a create-termui-app project
npm run dev

# Or directly with the CLI
npx termui-dev --entry src/index.tsx
```
## CLI Flags
| Flag              | Default       | Description                                        |
| ----------------- | ------------- | -------------------------------------------------- |
| `--entry <path>`  | Auto-detected | Entry file to run (e.g. `src/index.tsx`)           |
| `--watch <glob>`  | `src/**`      | Files to watch for changes                         |
| `--debounce <ms>` | `200`         | Wait this long after last change before restarting |
## Auto entry detection
If you don't pass `--entry`, the server looks for these files in order:
```ts
src/index.tsx
src/index.ts
src/main.tsx
src/main.ts
index.tsx
index.ts
```
## How it works
The dev server uses Node's `child_process.fork()` to spawn your entry file as a separate process with TypeScript support (via  `--loader tsx`). On file change:
```ts
// Schematic
1. File change detected (debounced 200ms)
2. Send SIGTERM to old process
3. If still alive after 2s → send SIGKILL
4. Fork a new process with the same entry
5. New process starts rendering immediately
```
The child process runs with `TERMUI_DEV=1` and  `NODE_ENV=development` in its environment. you can check these to enable dev-only features like verbose logging.
## DevTools integration
When the dev server is running, it communicates with the child process over IPC. The DevTools panel (if enabled) receives timing metrics and render traces from the child without polluting your terminal output.
```ts
// In your app. check if dev server is present
if (process.env.TERMUI_DEV === '1') {
    // Enable verbose logging, performance overlays, etc.
}
```
## Graceful shutdown
The dev server handles `SIGTERM` and `SIGINT`  (Ctrl+C). When it receives one, it first forwards SIGTERM to the child process, waits up to 2 seconds, then kills the child if necessary before exiting cleanly.
## Environment variables
| Variable     | Value           | Description                                     |
| ------------ | --------------- | ----------------------------------------------- |
| `TERMUI_DEV` | `"1"`           | Signals the app is running under the dev server |
| `NODE_ENV`   | `"development"` | Standard Node env flag                          |
## See also

- **create-termui-app**: Scaffold a new project with dev server pre-configured
- **Architecture**: How the render pipeline runs inside the child process
