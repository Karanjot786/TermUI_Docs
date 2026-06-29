'use client'
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { SearchDialog } from './SearchDialog'

const Ctx = createContext<{ open: () => void }>({ open: () => {} })
export const useSearch = () => useContext(Ctx)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <Ctx.Provider value={{ open: () => setOpen(true) }}>
      {children}
      <SearchDialog open={open} onClose={close} />
    </Ctx.Provider>
  )
}
