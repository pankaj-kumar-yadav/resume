"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useCallback, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { getSectionFromPath, SECTIONS, type SectionId } from "@/lib/sections"

function getTabClipPath(container: HTMLElement, tab: HTMLElement): string {
    const containerRect = container.getBoundingClientRect()
    const tabRect = tab.getBoundingClientRect()

    const top = tabRect.top - containerRect.top
    const right = containerRect.right - tabRect.right
    const bottom = containerRect.bottom - tabRect.bottom
    const left = tabRect.left - containerRect.left

    return `inset(${top}px ${right}px ${bottom}px ${left}px)`
}

export function SectionNav() {
    const pathname = usePathname()
    const router = useRouter()
    const activeId = getSectionFromPath(pathname)
    const containerRef = useRef<HTMLDivElement>(null)
    const tabRefs = useRef<Map<SectionId, HTMLAnchorElement>>(new Map())
    const clipRef = useRef<HTMLDivElement>(null)

    const updateClipPath = useCallback((id: SectionId) => {
        const container = containerRef.current
        const tab = tabRefs.current.get(id)
        const clip = clipRef.current
        if (!container || !tab || !clip) return
        clip.style.clipPath = getTabClipPath(container, tab)
    }, [])

    useEffect(() => {
        updateClipPath(activeId)
    }, [activeId, updateClipPath])

    useEffect(() => {
        const handleResize = () => updateClipPath(activeId)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [activeId, updateClipPath])

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLAnchorElement>,
        index: number
    ) => {
        let nextIndex: number | null = null

        switch (e.key) {
            case "ArrowLeft":
                nextIndex = index > 0 ? index - 1 : SECTIONS.length - 1
                break
            case "ArrowRight":
                nextIndex = index < SECTIONS.length - 1 ? index + 1 : 0
                break
            case "Home":
                nextIndex = 0
                break
            case "End":
                nextIndex = SECTIONS.length - 1
                break
            default:
                return
        }

        e.preventDefault()
        const next = SECTIONS[nextIndex]
        tabRefs.current.get(next.id)?.focus()
        router.push(next.href)
    }

    const tabClassName =
        "pressable hover-accent shrink-0 rounded-md px-2 py-1 text-xs font-medium sm:px-2.5 sm:py-1.5 sm:text-sm"

    return (
        <nav
            aria-label="Resume sections"
            className="sticky top-0 z-10 -mx-5 bg-background/90 px-5 py-1.5 backdrop-blur-sm sm:-mx-8 sm:px-8 print:hidden"
        >
            <div
                ref={containerRef}
                className="section-nav-tabs relative min-w-0"
            >
                <div className="flex gap-1">
                    {SECTIONS.map(({ id, label, href }, index) => {
                        const isActive = activeId === id

                        return (
                            <Link
                                key={id}
                                ref={(el) => {
                                    if (el) tabRefs.current.set(id, el)
                                }}
                                href={href}
                                prefetch
                                scroll={false}
                                aria-current={isActive ? "page" : undefined}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className={cn(tabClassName, "text-muted-foreground")}
                            >
                                {label}
                            </Link>
                        )
                    })}
                </div>
                <div
                    ref={clipRef}
                    className="section-nav-clip pointer-events-none absolute inset-0 flex gap-1"
                    style={{ clipPath: "inset(0 100% 0 0)" }}
                    aria-hidden="true"
                >
                    {SECTIONS.map(({ id, label }) => (
                        <span
                            key={id}
                            className={cn(
                                tabClassName,
                                "text-foreground underline decoration-solid decoration-2 underline-offset-4"
                            )}
                        >
                            {label}
                        </span>
                    ))}
                </div>
            </div>
        </nav>
    )
}
