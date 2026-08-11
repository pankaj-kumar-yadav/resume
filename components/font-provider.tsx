"use client"

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react"
import {
  DEFAULT_FONT,
  FONT_STORAGE_KEY,
  isFontId,
  type FontId,
} from "@/lib/fonts"

type FontContextValue = {
  font: FontId
  setFont: (font: FontId) => void
}

const FontContext = createContext<FontContextValue | null>(null)

const listeners = new Set<() => void>()

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange)
  return () => {
    listeners.delete(onStoreChange)
  }
}

function emit() {
  listeners.forEach((listener) => listener())
}

function getFontSnapshot(): FontId {
  const value = document.documentElement.getAttribute("data-font")
  return isFontId(value) ? value : DEFAULT_FONT
}

function getServerSnapshot(): FontId {
  return DEFAULT_FONT
}

export function FontProvider({ children }: { children: ReactNode }) {
  const font = useSyncExternalStore(subscribe, getFontSnapshot, getServerSnapshot)

  const setFont = useCallback((next: FontId) => {
    document.documentElement.setAttribute("data-font", next)
    try {
      localStorage.setItem(FONT_STORAGE_KEY, next)
    } catch {
      // ignore quota / private mode
    }
    emit()
  }, [])

  return (
    <FontContext.Provider value={{ font, setFont }}>
      {children}
    </FontContext.Provider>
  )
}

export function useFont(): FontContextValue {
  const ctx = useContext(FontContext)
  if (!ctx) {
    throw new Error("useFont must be used within FontProvider")
  }
  return ctx
}
