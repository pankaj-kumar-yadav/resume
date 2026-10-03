import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function BackLink({
    href,
    children,
}: {
    href: string
    children: React.ReactNode
}) {
    return (
        <Link
            href={href}
            className="pressable inline-flex items-center gap-2.5 text-sm text-foreground lg:text-[15px]"
        >
            <span className="inline-flex size-8 items-center justify-center rounded-lg border border-black/[0.04] bg-background shadow-[0_1px_2px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.04)] dark:border-white/[0.08]">
                <ArrowLeft size={14} strokeWidth={2} aria-hidden />
            </span>
            {children}
        </Link>
    )
}
