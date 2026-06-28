// Browser stub for child_process — Pty.ts uses spawn but never runs client-side
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const spawn: any = () => {
    throw new Error('child_process.spawn is not available in the browser')
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const exec: any = () => undefined
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const execSync: any = () => undefined
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const spawnSync: any = () => undefined
export default { spawn, exec, execSync, spawnSync }
