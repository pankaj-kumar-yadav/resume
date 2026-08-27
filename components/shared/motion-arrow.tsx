import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function MotionArrow({
    size = 12,
    className,
}: {
    size?: number
    className?: string
}) {
    return (
        <span
            className={cn(
                "motion-arrow relative inline-flex size-3 shrink-0 overflow-hidden text-muted-foreground print:hidden",
                className,
            )}
            aria-hidden
        >
            <span className="motion-arrow-out absolute inset-0 flex items-center justify-center">
                <ArrowUpRight size={size} strokeWidth={2} />
            </span>
            <span className="motion-arrow-in absolute inset-0 flex items-center justify-center">
                <ArrowUpRight size={size} strokeWidth={2} />
            </span>
        </span>
    )
}
