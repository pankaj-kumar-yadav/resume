"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useCallback, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export type TabNavItem = {
    id: string
    label: string
    href: string
}

function getTabClipPath(container: HTMLElement, tab: HTMLElement): string {
    const containerRect = container.getBoundingClientRect()
    const tabRect = tab.getBoundingClientRect()

    const top = tabRect.top - containerRect.top
    const right = containerRect.right - tabRect.right
    const bottom = containerRect.bottom - tabRect.bottom
    const left = tabRect.left - containerRect.left

    return `inset(${top}px ${right}px ${bottom}px ${left}px)`
}

export function TabNav({
    items,
    ariaLabel,
    scroll = true,
}: {
    items: readonly TabNavItem[]
    ariaLabel: string
    scroll?: boolean
}) {
    const pathname = usePathname()
    const router = useRouter()
    const activeId =
        items.find((item) => item.href === pathname)?.id ?? items[0]?.id
    const containerRef = useRef<HTMLDivElement>(null)
    const tabRefs = useRef<Map<string, HTMLAnchorElement>>(new Map())
    const clipRef = useRef<HTMLDivElement>(null)

    const updateClipPath = useCallback((id: string) => {
        const container = containerRef.current
        const tab = tabRefs.current.get(id)
        const clip = clipRef.current
        if (!container || !tab || !clip) return
        clip.style.clipPath = getTabClipPath(container, tab)
    }, [])

    useEffect(() => {
        if (!activeId) return
        updateClipPath(activeId)
    }, [activeId, updateClipPath])

    useEffect(() => {
        if (!activeId) return
        const handleResize = () => updateClipPath(activeId)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [activeId, updateClipPath])

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLAnchorElement>,
        index: number,
    ) => {
        let nextIndex: number | null = null

        switch (e.key) {
            case "ArrowLeft":
                nextIndex = index > 0 ? index - 1 : items.length - 1
                break
            case "ArrowRight":
                nextIndex = index < items.length - 1 ? index + 1 : 0
                break
            case "Home":
                nextIndex = 0
                break
            case "End":
                nextIndex = items.length - 1
                break
            default:
                return
        }

        e.preventDefault()
        const next = items[nextIndex]
        if (!next) return
        tabRefs.current.get(next.id)?.focus()
        router.push(next.href)
    }

    const tabClassName =
        "pressable hover-accent shrink-0 rounded-md px-2.5 py-1.5 text-xs font-medium sm:px-3 sm:py-1.5 sm:text-sm"

    return (
        <nav
            aria-label={ariaLabel}
            className="sticky top-0 z-10 -mx-5 bg-background/90 px-5 py-1.5 backdrop-blur-sm sm:-mx-8 sm:px-8 print:hidden"
        >
            <div
                ref={containerRef}
                className="section-nav-tabs relative min-w-0"
            >
                <div className="flex gap-2">
                    {items.map(({ id, label, href }, index) => {
                        const isActive = activeId === id

                        return (
                            <Link
                                key={id}
                                ref={(el) => {
                                    if (el) tabRefs.current.set(id, el)
                                }}
                                href={href}
                                prefetch
                                scroll={scroll}
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
                    className="section-nav-clip pointer-events-none absolute inset-0 flex gap-2"
                    style={{ clipPath: "inset(0 100% 0 0)" }}
                    aria-hidden="true"
                >
                    {items.map(({ id, label }) => (
                        <span
                            key={id}
                            className={cn(
                                tabClassName,
                                "bg-muted text-foreground",
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
