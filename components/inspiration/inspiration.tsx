"use client"

import Link from "next/link"
import { SectionHeading } from "@/components/shared/section-heading"
import { LinkPreview } from "@/components/ui/link-preview"
import { FaviconSquircle } from "@/components/shared/favicon-squircle"
import { MotionArrow } from "@/components/shared/motion-arrow"
import { INSPIRATION_LINKS } from "@/lib/constants/inspiration.constant"
import { cn } from "@/lib/utils"

const rowClassName =
    "social-link pressable hover-accent group/arrow relative flex items-center gap-3 overflow-hidden rounded-md border border-transparent px-2 py-2.5 -mx-2 print:mx-0 print:border-0 print:px-0 print:py-1 lg:gap-4 lg:px-2.5 lg:py-3"

function InspirationRow({
    label,
    href,
    description,
    icon,
}: {
    label: string
    href: string
    description: string
    icon?: string
}) {
    const linkButton = (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${label}`}
            className="pressable hover-accent inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-input bg-background text-muted-foreground print:hidden"
        >
            <MotionArrow size={13} className="size-3.25 text-inherit" />
        </Link>
    )

    return (
        <div className={cn(rowClassName, "pr-1")}>
            <FaviconSquircle href={href} icon={icon} />
            <div className="flex min-w-0 flex-1 items-center gap-2">
                <LinkPreview url={href} className="min-w-0 flex-1">
                    <Link
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pressable flex min-w-0 flex-1 flex-col gap-0.5 text-left print:text-xs sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-2 sm:gap-y-0"
                    >
                        <span className="shrink-0 text-sm font-medium text-foreground lg:text-[15px]">
                            {label}
                        </span>
                        <span className="min-w-0 text-sm text-muted-foreground lg:text-[15px]">
                            <span className="hidden sm:inline" aria-hidden>
                                ·{" "}
                            </span>
                            {description}
                        </span>
                    </Link>
                </LinkPreview>
                {linkButton}
            </div>
        </div>
    )
}

export function Inspiration() {
    return (
        <section id="inspiration">
            <SectionHeading hideOnScreen>Inspiration</SectionHeading>
            <p className="mb-5 text-sm text-muted-foreground print:mb-2 print:text-xs lg:mb-6 lg:text-[15px]">
                A list of websites I admire, tools I use, and everything else
                that follows. I will keep on updating this list as I find more
                inspiration.
            </p>
            <div className="space-y-2 print:space-y-1.5">
                {INSPIRATION_LINKS.map((item, idx) => (
                    <div
                        key={item.href}
                        className="social-row print:break-inside-avoid"
                        style={{ animationDelay: `${idx * 50}ms` }}
                    >
                        <InspirationRow
                            label={item.label}
                            href={item.href}
                            description={item.description}
                            icon={"icon" in item ? item.icon : undefined}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}
