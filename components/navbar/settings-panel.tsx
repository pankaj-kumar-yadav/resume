"use client"

import { Settings } from "lucide-react"
import { useEffect, useId, useRef, useState } from "react"
import { useFont } from "@/lib/providers/font.providers"
import { ICON_BOX_BASE, ICON_BOX_TONES } from "@/lib/icon-box"
import { cn } from "@/lib/utils"
import type { FontId } from "@/lib/fonts"

const FONTS: { id: FontId; label: string; className: string }[] = [
  { id: "schibsted", label: "Schibsted", className: "[font-family:var(--font-schibsted)]" },
  { id: "inter", label: "Inter", className: "[font-family:var(--font-inter)]" },
  { id: "geist", label: "Geist", className: "[font-family:var(--font-geist)]" },
]

export function SettingsPanel() {
  const { font, setFont } = useFont()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const panelId = useId()

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }

    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  return (
    <div
      ref={rootRef}
      className="fixed right-5 top-6 z-20 print:hidden sm:right-8 sm:top-10"
    >
      <button
        type="button"
        aria-label={open ? "Close settings" : "Open settings"}
        aria-expanded={open}
        aria-controls={panelId}
        className={cn(
          "pressable size-8 text-white",
          ICON_BOX_BASE,
          "rounded-sm",
          ICON_BOX_TONES.neutral
        )}
        onClick={() => setOpen((value) => !value)}
      >
        <Settings
          size={16}
          className="stroke-current drop-shadow-xl drop-shadow-black/40"
          aria-hidden
        />
      </button>

      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label="Display settings"
          className="absolute right-0 top-full mt-2 w-[min(100vw-2.5rem,16rem)] rounded-xl border border-white/10 bg-zinc-900 p-2 text-zinc-100 shadow-lg"
        >
          <div className="flex gap-1" role="group" aria-label="Font">
            {FONTS.map((item) => {
              const active = font === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFont(item.id)}
                  className={cn(
                    "pressable flex-1 rounded-md px-2 py-1.5 text-xs text-zinc-200",
                    item.className,
                    active ? "bg-zinc-800 text-white" : "hover:bg-zinc-800/70"
                  )}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}
