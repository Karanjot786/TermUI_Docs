import { Link } from '@tanstack/react-router'

export function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="footer">
            {/* Session end separator */}
            <div className="footer-separator">
                <span className="footer-sep-line" />
                <span className="footer-sep-text">session ended</span>
                <span className="footer-sep-line" />
            </div>

            <div className="footer-inner">
                <div className="footer-grid">

                    {/* Brand terminal card */}
                    <div className="footer-brand">
                        <div className="footer-brand-card">
                            <div className="footer-brand-titlebar">
                                <span className="footer-brand-gt">&gt;_</span>
                                <span className="footer-brand-name">TermUI</span>
                                <span className="footer-brand-cursor" />
                            </div>
                            <p className="footer-description">
                                TypeScript framework for building
                                terminal user interfaces.
                            </p>
                            <div className="footer-brand-meta">
                                <span className="footer-meta-tag">v1.0</span>
                                <span className="footer-meta-sep">·</span>
                                <span className="footer-meta-tag">MIT</span>
                                <span className="footer-meta-sep">·</span>
                                <span className="footer-meta-tag">15 packages</span>
                            </div>
                        </div>
                    </div>

                    {/* Documentation column */}
                    <div className="footer-column">
                        <div className="footer-col-header">
                            <span className="footer-col-tilde">~/</span>
                            <span className="footer-col-path">docs/</span>
                        </div>
                        <ul>
                            <li><Link to={"/docs/getting-started/installation" as any}>Getting Started</Link></li>
                            <li><Link to={"/docs/core/overview" as any}>API Reference</Link></li>
                            <li><Link to={"/docs/guides/first-app" as any}>Guides</Link></li>
                            <li><Link to={"/docs/getting-started/architecture" as any}>Architecture</Link></li>
                        </ul>
                    </div>

                    {/* Packages column */}
                    <div className="footer-column">
                        <div className="footer-col-header">
                            <span className="footer-col-tilde">~/</span>
                            <span className="footer-col-path">packages/</span>
                        </div>
                        <ul>
                            <li><Link to={"/docs/core/overview" as any}>@termuijs/core</Link></li>
                            <li><Link to={"/docs/widgets/overview" as any}>@termuijs/widgets</Link></li>
                            <li><Link to={"/docs/ui/overview" as any}>@termuijs/ui</Link></li>
                            <li><Link to={"/docs/tss/overview" as any}>@termuijs/tss</Link></li>
                            <li><Link to={"/docs/motion/springs" as any}>@termuijs/motion</Link></li>
                        </ul>
                    </div>

                    {/* Community column */}
                    <div className="footer-column">
                        <div className="footer-col-header">
                            <span className="footer-col-tilde">~/</span>
                            <span className="footer-col-path">community/</span>
                        </div>
                        <ul>
                            <li><a href="https://github.com/Karanjot786/TermUI" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                            <li><a href="https://github.com/Karanjot786/TermUI/discussions" target="_blank" rel="noopener noreferrer">Discussions</a></li>
                            <li><a href="https://github.com/Karanjot786/TermUI/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">Contributing</a></li>
                        </ul>
                    </div>

                </div>

                <div className="footer-bottom">
                    <span className="footer-copyright">
                        © {year} TermUI
                        <span className="footer-bottom-sep">·</span>
                        MIT License
                    </span>
                    <span className="footer-built">
                        Built with <span className="footer-built-accent">TanStack Start</span>
                    </span>
                </div>
            </div>
        </footer>
    )
}
