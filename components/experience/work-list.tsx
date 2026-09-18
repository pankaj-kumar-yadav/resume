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
                {...(/^https?:\/\//.test(item.href)
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
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
    raised = false,
    logoShape = "squircle",
}: {
    item: WorkItem
    delayMs: number
    raised?: boolean
    logoShape?: "squircle" | "circle"
}) {
    return (
        <div
            className="social-row"
            style={{ animationDelay: `${delayMs}ms` }}
        >
            <Link
                href={item.href}
                {...(/^https?:\/\//.test(item.href)
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                className={cn(
                    "work-card flex flex-col gap-3 rounded-[12px] px-5 py-4.5 sm:flex-row sm:items-center sm:gap-5 sm:px-6",
                    raised && "work-card-raised",
                )}
            >
                <div className="flex min-w-0 flex-1 items-center gap-4">
                    <FaviconSquircle
                        href={item.href}
                        icon={item.icon}
                        size="lg"
                        shape={logoShape}
                    />
                    <div className="min-w-0 flex-1">
                        <span className="text-base font-semibold tracking-tight text-neutral-700 dark:text-neutral-200">
                            {item.name}
                        </span>
                        <p className="mt-0.5 line-clamp-2 text-sm leading-snug text-neutral-500 dark:text-neutral-400">
                            {item.summary}
                        </p>
                    </div>
                </div>
                <span className="shrink-0 pl-16 text-sm text-neutral-500 sm:pl-0 sm:text-right dark:text-neutral-400">
                    {item.outcome}
                </span>
            </Link>
        </div>
    )
}

export function CompanyCard({
    company,
    items,
}: {
    company: WorkItem
    items: readonly WorkItem[]
}) {
    return (
        <article className="company-card rounded-[12px] px-5 py-4.5 print:hidden sm:px-6 sm:py-5">
            <Link
                href={company.href}
                {...(/^https?:\/\//.test(company.href)
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                className="pressable flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5"
            >
                <div className="flex min-w-0 flex-1 items-center gap-4">
                    <FaviconSquircle
                        href={company.href}
                        icon={company.icon}
                        size="lg"
                    />
                    <div className="min-w-0 flex-1">
                        <span className="text-base font-semibold tracking-tight text-neutral-700 dark:text-neutral-200">
                            {company.name}
                        </span>
                        <p className="mt-0.5 line-clamp-2 text-sm leading-snug text-neutral-500 dark:text-neutral-400">
                            {company.summary}
                        </p>
                    </div>
                </div>
                <span className="shrink-0 pl-16 text-sm text-neutral-500 sm:pl-0 sm:text-right dark:text-neutral-400">
                    {company.outcome}
                </span>
            </Link>
            {items.length > 0 ? (
                <div className="company-card-well">
                    <WorkList
                        items={items}
                        variant="card"
                        className="space-y-2"
                    />
                </div>
            ) : null}
        </article>
    )
}

export function WorkList({
    items,
    variant = "row",
    raised = false,
    logoShape = "squircle",
    className,
}: {
    items: readonly WorkItem[]
    variant?: "row" | "card"
    raised?: boolean
    logoShape?: "squircle" | "circle"
    className?: string
}) {
    return (
        <div
            className={cn(
                variant === "card"
                    ? "space-y-5 print:hidden"
                    : "space-y-1 print:hidden lg:space-y-1.5",
                className,
            )}
        >
            {items.map((item, index) =>
                variant === "card" ? (
                    <WorkCard
                        key={item.name}
                        item={item}
                        delayMs={index * 50}
                        raised={raised}
                        logoShape={logoShape}
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
