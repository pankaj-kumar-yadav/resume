"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"

const buttonClassName =
  "pressable hover-accent inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-input bg-background text-foreground/70"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setMounted(true)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (theme === "system") {
      setTheme(resolvedTheme === "dark" ? "dark" : "light")
    }
  }, [mounted, theme, resolvedTheme, setTheme])

  const handleToggle = () => {
    setTransitioning(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setTransitioning(false), 150)
    const isDark =
      theme === "dark" || (theme !== "light" && resolvedTheme === "dark")
    setTheme(isDark ? "light" : "dark")
  }

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle dark mode"
        className={buttonClassName}
      >
        <Moon size={16} aria-hidden />
      </button>
    )
  }

  const isDark =
    theme === "dark" || (theme !== "light" && resolvedTheme === "dark")

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
        {isDark ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
      </span>
    </button>
  )
}
