"use client"

import Link from "next/link"
import { FaviconSquircle } from "@/components/shared/favicon-squircle"
import { HERO_MARKS } from "@/lib/constants/resume.constant"

export function HeroMarks() {
    return (
        <div className="hero-marks print:hidden" role="group" aria-label="Products">
            <div className="hero-marks-well">
                {HERO_MARKS.map((mark) => (
                    <Link
                        key={mark.name}
                        href={mark.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={mark.name}
                        className="pressable"
                    >
                        <FaviconSquircle
                            href={mark.href}
                            icon={"icon" in mark ? mark.icon : undefined}
                            size="hero"
                        />
                    </Link>
                ))}
            </div>
        </div>
    )
}
