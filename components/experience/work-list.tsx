"use client"

import Link from "next/link"
import { Dot } from "@/components/shared/dot"
import { FaviconSquircle } from "@/components/shared/favicon-squircle"
import { MotionArrow } from "@/components/shared/motion-arrow"
import { LinkPreview } from "@/components/ui/link-preview"
import type { WorkItem } from "@/lib/constants/resume.constant"
import { cn } from "@/lib/utils"
import { ExternalLink } from "lucide-react"

const rowClassName =
    "social-link pressable hover-accent group/arrow relative flex items-start gap-3 overflow-hidden rounded-md border border-transparent px-2 py-2.5 -mx-2 print:hidden lg:gap-4 lg:px-2.5 lg:py-3"

function externalLinkProps(href: string) {
    return /^https?:\/\//.test(href)
        ? { target: "_blank" as const, rel: "noopener noreferrer" }
        : {}
}

function SummaryWithDot({ text }: { text: string }) {
    return text.split(" · ").map((part, i) => (
        <span key={i}>
            {i > 0 && <Dot />}
            {part}
        </span>
    ))
}

function WorkRow({
    item,
    delayMs,
}: {
    item: WorkItem
    delayMs: number
}) {
    if (!item.href) return null

    const content = (
        <div className="flex min-w-0 flex-1 flex-col text-left">
            <span className="inline-flex min-w-0 flex-wrap items-baseline gap-x-2">
                <span className="text-sm font-medium text-foreground lg:text-[15px]">
                    {item.name}
                </span>
                <span className="text-xs text-muted-foreground lg:text-sm">
                    {item.outcome}
                </span>
            </span>
            <span className="mt-0.5 text-pretty text-sm leading-relaxed text-foreground/70 lg:mt-1 lg:text-[15px]">
                {item.summary}
            </span>
        </div>
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
                <div className="min-w-0 flex-1">
                    {content}
                </div>
                <Link
                    href={item.href}
                    {...externalLinkProps(item.href)}
                    className="ml-2 shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    aria-label={`Visit ${item.name}`}
                >
                    <ExternalLink size={18} />
                </Link>
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
    const className = cn(
        "work-card flex flex-col gap-3 rounded-[12px] px-5 py-4.5 sm:flex-row sm:items-center sm:gap-5 sm:px-6",
        raised && "work-card-raised",
    )
    const body = (
        <>
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
                        <SummaryWithDot text={item.summary} />
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-3 pl-16 sm:pl-0">
                <span className="shrink-0 text-sm text-neutral-500 dark:text-neutral-400">
                    {item.outcome}
                </span>
                {item.href && (
                    <Link
                        href={item.href}
                        {...externalLinkProps(item.href)}
                        className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        aria-label={`Visit ${item.name}`}
                    >
                        <ExternalLink size={18} />
                    </Link>
                )}
            </div>
        </>
    )

    return (
        <div
            className="social-row"
            style={{ animationDelay: `${delayMs}ms` }}
        >
            <div className={className}>{body}</div>
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
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
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
                            <SummaryWithDot text={company.summary} />
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 pl-16 sm:pl-0">
                    <span className="shrink-0 text-sm text-neutral-500 dark:text-neutral-400">
                        {company.outcome}
                    </span>
                    {company.href && (
                        <Link
                            href={company.href}
                            {...externalLinkProps(company.href)}
                            className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                            aria-label={`Visit ${company.name}`}
                        >
                            <ExternalLink size={18} />
                        </Link>
                    )}
                </div>
            </div>
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
