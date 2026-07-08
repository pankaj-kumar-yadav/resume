"use client"

import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import { encode } from "qss"
import React from "react"
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
} from "motion/react"

import { cn } from "@/lib/utils"

type LinkPreviewProps = {
    children: React.ReactElement
    url: string
    className?: string
    width?: number
    height?: number
    quality?: number
} & (
    | { isStatic: true; imageSrc: string }
    | { isStatic?: false; imageSrc?: never }
)

export function LinkPreview({
    children,
    url,
    className,
    width = 200,
    height = 125,
    quality = 50,
    isStatic = false,
    imageSrc = "",
}: LinkPreviewProps) {
    const shouldReduceMotion = useReducedMotion()
    const [isOpen, setOpen] = React.useState(false)
    const [isMounted, setIsMounted] = React.useState(false)
    const canParallax = React.useRef(false)

    React.useEffect(() => {
        setIsMounted(true)
        canParallax.current = window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches
    }, [])

    const src = React.useMemo(() => {
        if (isStatic) return imageSrc

        const params = encode({
            url,
            screenshot: true,
            meta: false,
            embed: "screenshot.url",
            colorScheme: "dark",
            "viewport.isMobile": true,
            "viewport.deviceScaleFactor": 1,
            "viewport.width": width * 3,
            "viewport.height": height * 3,
        })

        return `https://api.microlink.io/?${params}`
    }, [height, imageSrc, isStatic, quality, url, width])

    const x = useMotionValue(0)
    const translateX = useSpring(x, { stiffness: 100, damping: 15 })
    const transform = useTransform(
        translateX,
        (value) => `translateX(${value}px)`
    )

    const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
        if (!canParallax.current || shouldReduceMotion) return

        const targetRect = event.currentTarget.getBoundingClientRect()
        const eventOffsetX = event.clientX - targetRect.left
        const offsetFromCenter =
            (eventOffsetX - targetRect.width / 2) / 2
        x.set(offsetFromCenter)
    }

    const enterTransition = shouldReduceMotion
        ? { duration: 0.15 }
        : { duration: 0.2, ease: [0.23, 1, 0.32, 1] as const }

    const exitTransition = shouldReduceMotion
        ? { duration: 0.1 }
        : { duration: 0.15, ease: [0.23, 1, 0.32, 1] as const }

    return (
        <>
            {isMounted ? (
                <div className="hidden" aria-hidden>
                    <img src={src} width={width} height={height} alt="" />
                </div>
            ) : null}

            <HoverCardPrimitive.Root
                openDelay={200}
                closeDelay={100}
                onOpenChange={setOpen}
            >
                <HoverCardPrimitive.Trigger
                    asChild
                    onMouseMove={handleMouseMove}
                    className={className}
                >
                    {children}
                </HoverCardPrimitive.Trigger>

                <HoverCardPrimitive.Portal>
                    <HoverCardPrimitive.Content
                        className={cn(
                            "link-preview-content z-50 outline-none print:hidden",
                            "[transform-origin:var(--radix-hover-card-content-transform-origin)]"
                        )}
                        side="top"
                        align="center"
                        sideOffset={8}
                        avoidCollisions
                    >
                        <AnimatePresence>
                            {isOpen ? (
                                <motion.div
                                    key="preview"
                                    initial={
                                        shouldReduceMotion
                                            ? { opacity: 0 }
                                            : {
                                                  opacity: 0,
                                                  y: 8,
                                                  scale: 0.95,
                                              }
                                    }
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                    }}
                                    transition={enterTransition}
                                    exit={
                                        shouldReduceMotion
                                            ? { opacity: 0 }
                                            : {
                                                  opacity: 0,
                                                  y: 4,
                                                  scale: 0.97,
                                                  transition: exitTransition,
                                              }
                                    }
                                    className="overflow-hidden rounded-xl border border-border bg-popover shadow-lg"
                                    style={
                                        shouldReduceMotion
                                            ? undefined
                                            : { transform }
                                    }
                                >
                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="pressable block p-1"
                                        style={{ fontSize: 0 }}
                                    >
                                        <img
                                            src={isStatic ? imageSrc : src}
                                            width={width}
                                            height={height}
                                            className="rounded-lg"
                                            alt=""
                                        />
                                    </a>
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </HoverCardPrimitive.Content>
                </HoverCardPrimitive.Portal>
            </HoverCardPrimitive.Root>
        </>
    )
}
