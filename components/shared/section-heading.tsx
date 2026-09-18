import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  children: ReactNode
  className?: string
  /** Hide on screen when the nav already names this section. Still shown in print. */
  hideOnScreen?: boolean
  dash?: boolean
}

export function SectionHeading({
  children,
  className,
  hideOnScreen = false,
  dash = true,
}: SectionHeadingProps) {
  const Tag = hideOnScreen ? "h1" : "h2"

  return (
    <Tag
      className={cn(
        "inline-flex items-center text-xs font-medium uppercase tracking-widest text-muted-foreground print:text-[10px] lg:text-[13px]",
        hideOnScreen
          ? "sr-only print:not-sr-only print:mb-2"
          : "mb-5 print:mb-2 lg:mb-6",
        className
      )}
    >
      {children}
      {dash && !hideOnScreen && (
        <span
          className="ml-2 inline-block text-lg font-normal leading-none tracking-normal text-foreground/35 print:hidden lg:text-xl"
          aria-hidden
        >
          —
        </span>
      )}
    </Tag>
  )
}
