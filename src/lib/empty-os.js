// Browser stub for os — @termuijs/core's Session class imports `homedir` (and
// friends) to resolve a config dir. That path can't exist in a browser preview,
// so every named member core may import is exported as a safe constant and
// Turbopack's static export check passes. Code that truly needs os can't run
// in-browser anyway; nothing else breaks.
export const homedir = () => '/'
export const tmpdir = () => '/tmp'
export const platform = () => 'browser'
export const hostname = () => 'localhost'
export const userInfo = () => ({ username: 'user', homedir: '/' })
export const arch = () => 'browser'
export const release = () => ''
export const type = () => 'Browser'
export const EOL = '\n'
export default { homedir, tmpdir, platform, hostname, userInfo, arch, release, type, EOL }
