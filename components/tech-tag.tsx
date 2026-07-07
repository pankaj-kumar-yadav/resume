import type { ReactNode } from "react"
import { Badge } from "@/components/ui/badge"
import { getTechIcon } from "@/lib/tech-icons"
import { cn } from "@/lib/utils"

interface TechTagProps {
  children: ReactNode
  className?: string
  showIcon?: boolean
}

export function TechTag({ children, className, showIcon = true }: TechTagProps) {
  const label = typeof children === "string" ? children : null
  const techIcon = label && showIcon ? getTechIcon(label) : undefined
  const Icon = techIcon?.icon

  return (
    <Badge
      variant="secondary"
      className={cn(
        "tech-tag font-mono text-xs rounded-md px-2 py-0.5 font-medium border border-border/60 print:text-[9pt] print:px-1.5 print:py-0",
        className
      )}
    >
      {Icon && (
        <Icon
          className={cn(
            "size-3 shrink-0 print:hidden",
            !techIcon.color && "dark:invert"
          )}
          style={techIcon.color ? { color: techIcon.color } : undefined}
          aria-hidden
        />
      )}
      {children}
    </Badge>
  )
}
