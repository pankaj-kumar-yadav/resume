"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

const buttonClassName =
  "pressable hover-accent inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-input bg-background text-foreground/70 [&_svg]:size-4"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle dark mode"
        className={buttonClassName}
      />
    )
  }

  const currentTheme =
    theme === "dark" || theme === "light"
      ? theme
      : resolvedTheme === "dark"
        ? "dark"
        : "light"

  return (
    <AnimatedThemeToggler
      aria-label="Toggle dark mode"
      className={buttonClassName}
      theme={currentTheme}
      onThemeChange={setTheme}
    />
  )
}
