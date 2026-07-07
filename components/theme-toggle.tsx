"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle dark mode"
        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-foreground/70"
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
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-foreground/70 hover:bg-gray-100 transition-colors dark:border-white/20 dark:hover:bg-white/10"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
