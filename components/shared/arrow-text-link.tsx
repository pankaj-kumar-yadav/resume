"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { MotionArrow } from "@/components/shared/motion-arrow"
import { cn } from "@/lib/utils"

export function ArrowTextLink({
    href,
    children,
    className,
}: {
    href: string
    children: ReactNode
    className?: string
}) {
    const isExternal = /^https?:\/\//.test(href)

    return (
        <Link
            href={href}
            {...(isExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            className={cn(
                "pressable group/arrow inline-flex items-center gap-0.5 whitespace-nowrap text-foreground",
                className,
            )}
        >
            <span className="underline underline-offset-[3px]">{children}</span>
            <MotionArrow />
        </Link>
    )
}
