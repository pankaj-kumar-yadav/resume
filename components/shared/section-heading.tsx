import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  children: ReactNode
  className?: string
  /** Hide on screen when the nav already names this section. Still shown in print. */
  hideOnScreen?: boolean
}

export function SectionHeading({
  children,
  className,
  hideOnScreen = false,
}: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "text-xs font-medium uppercase tracking-widest text-muted-foreground print:text-[10px]",
        hideOnScreen
          ? "sr-only print:not-sr-only print:mb-2"
          : "mb-5 print:mb-2",
        className
      )}
    >
      {children}
    </h2>
  )
}
