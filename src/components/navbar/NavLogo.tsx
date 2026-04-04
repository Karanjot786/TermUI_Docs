import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from '@tanstack/react-router'

const FULL_TEXT = '>_TermUI'
const GLITCH_CHARS = '!@#$%^&*<>/\\|{}[]~`'

export function NavLogo() {
  const [displayText, setDisplayText] = useState('')
  const [phase, setPhase] = useState<'typing' | 'idle' | 'glitch'>('typing')
  const [cursorVisible, setCursorVisible] = useState(true)
  const glitchTimeout = useRef<ReturnType<typeof setTimeout>>()
  const hasTyped = useRef(false)

  // Typing animation on mount (once)
  useEffect(() => {
    if (hasTyped.current) return
    hasTyped.current = true

    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayText(FULL_TEXT.slice(0, i))
      if (i >= FULL_TEXT.length) {
        clearInterval(interval)
        setPhase('idle')
      }
    }, 80)

    return () => clearInterval(interval)
  }, [])

  // Blinking cursor in idle
  useEffect(() => {
    if (phase !== 'idle') return
    const interval = setInterval(() => setCursorVisible((v) => !v), 530)
    return () => clearInterval(interval)
  }, [phase])

  // Glitch on hover
  const triggerGlitch = useCallback(() => {
    if (phase === 'typing') return
    setPhase('glitch')

    let iterations = 0
    const maxIterations = 6
    const interval = setInterval(() => {
      iterations++
      setDisplayText(
        FULL_TEXT.split('')
          .map((char, idx) => {
            if (idx < iterations) return FULL_TEXT[idx]
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          })
          .join('')
      )
      if (iterations >= maxIterations + FULL_TEXT.length) {
        clearInterval(interval)
        setDisplayText(FULL_TEXT)
        setPhase('idle')
      }
    }, 35)

    glitchTimeout.current = interval
    return () => clearInterval(interval)
  }, [phase])

  const stopGlitch = useCallback(() => {
    if (glitchTimeout.current) clearInterval(glitchTimeout.current)
    setDisplayText(FULL_TEXT)
    setPhase('idle')
  }, [])

  // Split display text into prompt + name parts
  const gtPart = displayText.slice(0, 2)  // ">_"
  const namePart = displayText.slice(2)   // "TermUI"

  return (
    <Link
      to="/"
      className="nav-logo"
      onMouseEnter={triggerGlitch}
      onMouseLeave={stopGlitch}
      aria-label="TermUI Home"
    >
      <span className="nav-logo-gt" aria-hidden="true">{gtPart}</span>
      <span className="nav-logo-name">{namePart}</span>
      <span
        className={`nav-logo-cursor ${cursorVisible ? 'visible' : ''}`}
        aria-hidden="true"
      />
    </Link>
  )
}
