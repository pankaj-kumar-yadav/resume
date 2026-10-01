"use client"

import { HeroBgCircuit } from "@/components/home/hero-bg-circuit"

export function HeroBackground() {
    return (
        <div
            className="hero-bg-layer pointer-events-none absolute inset-y-0 left-[calc(50%-50vw)] z-0 hidden w-screen overflow-hidden md:block print:hidden"
            aria-hidden="true"
        >
            <HeroBgCircuit />
        </div>
    )
}
