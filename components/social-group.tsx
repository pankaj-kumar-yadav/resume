import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SocialGroupProps {
    id: string
    title: string
    children: ReactNode
    headingDelayMs?: number
    className?: string
}

export function SocialGroup({
    id,
    title,
    children,
    headingDelayMs = 0,
    className,
}: SocialGroupProps) {
    const headingId = `${id}-heading`

    return (
        <section
            id={id}
            aria-labelledby={headingId}
            className={cn("print:break-inside-avoid", className)}
        >
            <h3
                id={headingId}
                className="social-row mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground print:mb-1.5 print:text-[10px]"
                style={{ animationDelay: `${headingDelayMs}ms` }}
            >
                {title}
            </h3>
            <dl className="space-y-2 print:space-y-1.5">{children}</dl>
        </section>
    )
}
