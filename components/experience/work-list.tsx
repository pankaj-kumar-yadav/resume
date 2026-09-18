"use client"

import Link from "next/link"
import { FaviconSquircle } from "@/components/shared/favicon-squircle"
import { MotionArrow } from "@/components/shared/motion-arrow"
import { LinkPreview } from "@/components/ui/link-preview"
import type { WorkItem } from "@/lib/constants/resume.constant"
import { cn } from "@/lib/utils"

const rowClassName =
    "social-link pressable hover-accent group/arrow relative flex items-start gap-3 overflow-hidden rounded-md border border-transparent px-2 py-2.5 -mx-2 print:hidden"

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
                <span className="text-sm font-medium text-foreground">
                    {item.name}
                </span>
                <span className="text-xs text-muted-foreground">
                    {item.outcome}
                </span>
                <MotionArrow />
            </span>
            <span className="mt-0.5 text-pretty text-sm leading-relaxed text-foreground/70">
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

export function WorkList({ items }: { items: readonly WorkItem[] }) {
    return (
        <div className="space-y-1 print:hidden">
            {items.map((item, index) => (
                <WorkRow
                    key={item.name}
                    item={item}
                    delayMs={index * 50}
                />
            ))}
        </div>
    )
}
