import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <button
      className="nav-theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      type="button"
    >
      <svg
        className="nav-theme-icon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Sun rays — visible in dark mode (to switch to light) */}
        <g className={`theme-rays ${isDark ? 'theme-rays-visible' : ''}`}>
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>

        {/* Sun circle / Moon — morph between them */}
        <circle
          className="theme-body"
          cx="12"
          cy="12"
          r={isDark ? 5 : 9}
          fill={isDark ? 'none' : 'currentColor'}
          stroke="currentColor"
        />

        {/* Moon cutout — visible in light mode (to switch to dark) */}
        {!isDark && (
          <circle
            className="theme-moon-cutout"
            cx="18"
            cy="6"
            r="5"
            fill="var(--bg-primary)"
            stroke="none"
          />
        )}
      </svg>
    </button>
  )
}
