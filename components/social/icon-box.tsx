import type { ReactNode } from "react"
import {
    ICON_BOX_BASE,
    ICON_BOX_TONES,
    type IconBoxTone,
} from "@/lib/icon-box"
import { cn } from "@/lib/utils"

const SIZES = {
    md: "size-8",
    sm: "size-6",
} as const

/** Gradient icon tile for SVG / React icons (social). */
export function IconBox({
    children,
    tone = "blue",
    size = "md",
    className,
}: {
    children: ReactNode
    tone?: IconBoxTone
    size?: keyof typeof SIZES
    className?: string
}) {
    return (
        <span
            className={cn(
                ICON_BOX_BASE,
                "rounded-sm text-white",
                ICON_BOX_TONES[tone],
                SIZES[size],
                className
            )}
        >
            {children}
        </span>
    )
}
