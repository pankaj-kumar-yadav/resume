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
      variant="outline"
      className={cn(
        "tech-tag font-mono text-[13px] rounded-[8px] gap-1.5 px-2 py-1 font-medium text-foreground [&>svg]:size-3.5 print:bg-secondary print:text-secondary-foreground print:border-border/60 print:text-[9pt] print:px-1.5 print:py-0 lg:gap-2 lg:px-2.5 lg:py-1 lg:text-sm lg:[&>svg]:size-4",
        className
      )}
    >
      {Icon && (
        <Icon
          className={cn(
            "size-3.5 shrink-0 print:hidden lg:size-4",
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
