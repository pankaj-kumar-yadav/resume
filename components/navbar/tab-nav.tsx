"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useRef } from "react"
import { cn } from "@/lib/utils"

export type TabNavItem = {
    id: string
    label: string
    href: string
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
    const activeId = items.find((item) => item.href === pathname)?.id
    const tabRefs = useRef<Map<string, HTMLAnchorElement>>(new Map())

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

    return (
        <nav
            aria-label={ariaLabel}
            className="section-nav-tabs min-w-0 flex-1"
        >
            <div className="flex w-full justify-end gap-3 sm:gap-5 lg:gap-8">
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
                            className={cn(
                                "pressable shrink-0 rounded-full px-1 py-1 text-xs sm:px-1.5 sm:text-sm lg:px-2 lg:py-1 lg:text-[15px]",
                                isActive
                                    ? "font-medium text-foreground"
                                    : "font-normal text-muted-foreground",
                            )}
                        >
                            {label}
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
