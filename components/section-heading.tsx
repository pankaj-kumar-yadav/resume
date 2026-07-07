import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  children: ReactNode
  className?: string
}

export function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "text-xs font-medium uppercase tracking-widest text-muted-foreground mb-5 print:mb-2 print:text-[10px]",
        className
      )}
    >
      {children}
    </h2>
  )
}
