"use client"

import { FaviconSquircle } from "@/components/shared/favicon-squircle"
import { HERO_MARKS } from "@/lib/constants/resume.constant"

export function HeroMarks() {
    return (
        <div className="hero-marks print:hidden" role="group" aria-label="Products">
            <div className="hero-marks-well">
                {HERO_MARKS.map((mark) => (
                    <FaviconSquircle
                        key={mark.name}
                        href={mark.href}
                        icon={"icon" in mark ? mark.icon : undefined}
                        size="hero"
                        className="pressable cursor-pointer"
                    />
                ))}
            </div>
        </div>
    )
}
