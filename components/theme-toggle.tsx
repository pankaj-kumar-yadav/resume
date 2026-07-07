"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"

const buttonClassName =
  "pressable hover-accent inline-flex size-7 items-center justify-center rounded-md border border-input bg-background text-foreground/70"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setMounted(true)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleToggle = () => {
    setTransitioning(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setTransitioning(false), 150)
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle dark mode"
        className={buttonClassName}
      >
        <Moon size={16} />
      </button>
    )
  }

  const isDark = theme === "dark"

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={handleToggle}
      className={buttonClassName}
    >
      <span
        className="icon-crossfade inline-flex"
        data-transitioning={transitioning ? "true" : "false"}
      >
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
      </span>
    </button>
  )
}
