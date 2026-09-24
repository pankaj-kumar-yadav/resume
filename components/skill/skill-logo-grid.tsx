import { getTechIcon } from "@/lib/tech-icons"
import { cn } from "@/lib/utils"

interface SkillLogoGridProps {
  items: string[]
  className?: string
}

export function SkillLogoGrid({ items, className }: SkillLogoGridProps) {
  return (
    <ul className={cn("skill-logo-grid", className)}>
      {items.map((skill) => {
        const techIcon = getTechIcon(skill)
        const Icon = techIcon?.icon

        return (
          <li key={skill} className="skill-logo-cell pressable cursor-pointer" tabIndex={0}>
            {Icon ? (
              <Icon
                className={cn(
                  "skill-logo-cell-icon size-5 shrink-0 print:hidden sm:size-6",
                  !techIcon.color && "dark:invert"
                )}
                style={techIcon.color ? { color: techIcon.color } : undefined}
                aria-hidden
              />
            ) : null}
            <span className="skill-logo-cell-label">{skill}</span>
          </li>
        )
      })}
    </ul>
  )
}
