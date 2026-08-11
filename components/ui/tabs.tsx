"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export type TabItem = { id: string; label: string; href: string }

export type TabsProps = {
    items: TabItem[]
    activeId: string
    ariaLabel?: string
    className?: string
}

export function Tabs({ items, activeId, ariaLabel, className }: TabsProps) {
    const router = useRouter()
    const containerRef = useRef<HTMLDivElement>(null)
    const tabRefs = useRef<Map<string, HTMLAnchorElement>>(new Map())
    const [indicator, setIndicator] = useState({ left: 0, width: 0 })

    const updateIndicator = useCallback((id: string) => {
        const container = containerRef.current
        const tab = tabRefs.current.get(id)
        if (!container || !tab) return
        setIndicator({ left: tab.offsetLeft, width: tab.offsetWidth })
    }, [])

    useLayoutEffect(() => {
        updateIndicator(activeId)
    }, [activeId, updateIndicator, items])

    useEffect(() => {
        const handleResize = () => updateIndicator(activeId)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [activeId, updateIndicator])

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLAnchorElement>,
        index: number
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
        tabRefs.current.get(next.id)?.focus()
        router.push(next.href)
    }

    return (
        <nav aria-label={ariaLabel} className={cn(className)}>
            <div
                ref={containerRef}
                className="relative min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                <div className="flex gap-5 sm:gap-6">
                    {items.map((item, index) => {
                        const isActive = activeId === item.id

                        return (
                            <Link
                                key={item.id}
                                ref={(el) => {
                                    if (el) tabRefs.current.set(item.id, el)
                                    else tabRefs.current.delete(item.id)
                                }}
                                href={item.href}
                                prefetch
                                scroll={false}
                                aria-current={isActive ? "page" : undefined}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className={cn(
                                    "pressable shrink-0 py-1.5 text-xs font-medium no-underline transition-colors duration-150 sm:text-sm",
                                    "motion-reduce:transition-none",
                                    isActive
                                        ? "text-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {item.label}
                            </Link>
                        )
                    })}
                </div>
                <span
                    aria-hidden
                    className="pointer-events-none absolute bottom-0.5 flex h-1 items-center justify-between px-0.5 transition-[left,width] duration-200 [transition-timing-function:var(--ease-out)] motion-reduce:transition-none"
                    style={{ left: indicator.left, width: indicator.width }}
                >
                    {Array.from({ length: 9 }, (_, i) => (
                        <span
                            key={i}
                            className="size-[2.5px] shrink-0 rounded-full bg-muted-foreground/55"
                        />
                    ))}
                </span>
            </div>
        </nav>
    )
}
