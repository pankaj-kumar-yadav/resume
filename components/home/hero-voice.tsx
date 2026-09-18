"use client"

import { useLayoutEffect, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { HeroMarks } from "@/components/home/hero-marks"
import { HERO } from "@/lib/constants/resume.constant"

const EASE_OUT = [0.23, 1, 0.32, 1] as const
const EASE_OUT_SINE = [0.39, 0.575, 0.565, 1] as const
const FINE_HOVER_DESKTOP =
    "(hover: hover) and (pointer: fine) and (min-width: 1024px)"

export function HeroVoice() {
    const reduceMotion = useReducedMotion()
    const [fineHoverDesktop, setFineHoverDesktop] = useState(false)
    const [hovered, setHovered] = useState(false)

    useLayoutEffect(() => {
        const media = window.matchMedia(FINE_HOVER_DESKTOP)
        const sync = () => setFineHoverDesktop(media.matches)
        sync()
        media.addEventListener("change", sync)
        return () => media.removeEventListener("change", sync)
    }, [])

    const revealed = !fineHoverDesktop || reduceMotion || hovered

    return (
        <div
            className="hero-voice"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocusCapture={() => setHovered(true)}
            onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    setHovered(false)
                }
            }}
        >
            <p className="mt-4 overflow-hidden text-sm text-muted-foreground lg:mt-6 lg:text-base">
                <motion.span
                    className="inline-block"
                    initial={false}
                    animate={{
                        opacity: revealed ? 1 : 0,
                        transform: revealed
                            ? "translate3d(0, 0, 0)"
                            : "translate3d(-36px, 0, 0)",
                    }}
                    transition={
                        reduceMotion
                            ? { duration: 0 }
                            : {
                                  opacity: {
                                      duration: 0.7,
                                      ease: EASE_OUT,
                                  },
                                  transform: {
                                      duration: 0.9,
                                      ease: EASE_OUT_SINE,
                                  },
                              }
                    }
                >
                    {HERO.voice}
                </motion.span>
            </p>
            <HeroMarks />
        </div>
    )
}
