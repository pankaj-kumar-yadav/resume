import { cn } from "@/lib/utils"

export function Dot({ className }: { className?: string }) {
    return (
        <span
            className={cn(
                "mx-1 inline-block text-[0.5em] leading-none align-middle",
                className,
            )}
            aria-hidden
        >
            ●
        </span>
    )
}
