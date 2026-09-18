"use client"

import Link from "next/link"
import { FaviconSquircle } from "@/components/shared/favicon-squircle"
import { MotionArrow } from "@/components/shared/motion-arrow"
import { LinkPreview } from "@/components/ui/link-preview"
import type { WorkItem } from "@/lib/constants/resume.constant"
import { cn } from "@/lib/utils"

const rowClassName =
    "social-link pressable hover-accent group/arrow relative flex items-start gap-3 overflow-hidden rounded-md border border-transparent px-2 py-2.5 -mx-2 print:hidden lg:gap-4 lg:px-2.5 lg:py-3"

function WorkRow({
    item,
    delayMs,
}: {
    item: WorkItem
    delayMs: number
}) {
    const link = (
        <Link
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="pressable flex min-w-0 w-full flex-col text-left"
        >
            <span className="inline-flex min-w-0 flex-wrap items-baseline gap-x-2">
                <span className="text-sm font-medium text-foreground lg:text-[15px]">
                    {item.name}
                </span>
                <span className="text-xs text-muted-foreground lg:text-sm">
                    {item.outcome}
                </span>
                <MotionArrow />
            </span>
            <span className="mt-0.5 text-pretty text-sm leading-relaxed text-foreground/70 lg:mt-1 lg:text-[15px]">
                {item.summary}
            </span>
        </Link>
    )

    return (
        <div
            className="social-row"
            style={{ animationDelay: `${delayMs}ms` }}
        >
            <div className={cn(rowClassName, "pr-1")}>
                <FaviconSquircle
                    href={item.href}
                    icon={item.icon}
                    className="mt-0.5"
                />
                <LinkPreview url={item.href} className="min-w-0 flex-1">
                    {link}
                </LinkPreview>
            </div>
        </div>
    )
}

function WorkCard({
    item,
    delayMs,
}: {
    item: WorkItem
    delayMs: number
}) {
    return (
        <div
            className="social-row"
            style={{ animationDelay: `${delayMs}ms` }}
        >
            <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="work-card flex flex-col gap-3 rounded-[12px] px-5 py-4.5 sm:flex-row sm:items-center sm:gap-5 sm:px-6"
            >
                <div className="flex min-w-0 flex-1 items-center gap-4">
                    <FaviconSquircle
                        href={item.href}
                        icon={item.icon}
                        size="lg"
                    />
                    <div className="min-w-0 flex-1">
                        <span className="text-base font-semibold tracking-tight text-foreground">
                            {item.name}
                        </span>
                        <p className="mt-0.5 line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {item.summary}
                        </p>
                    </div>
                </div>
                <span className="shrink-0 pl-16 text-sm text-muted-foreground sm:pl-0 sm:text-right">
                    {item.outcome}
                </span>
            </Link>
        </div>
    )
}

export function WorkList({
    items,
    variant = "row",
}: {
    items: readonly WorkItem[]
    variant?: "row" | "card"
}) {
    return (
        <div
            className={
                variant === "card"
                    ? "space-y-5 print:hidden"
                    : "space-y-1 print:hidden lg:space-y-1.5"
            }
        >
            {items.map((item, index) =>
                variant === "card" ? (
                    <WorkCard
                        key={item.name}
                        item={item}
                        delayMs={index * 50}
                    />
                ) : (
                    <WorkRow
                        key={item.name}
                        item={item}
                        delayMs={index * 50}
                    />
                ),
            )}
        </div>
    )
}
