"use client"

import { useState } from "react"
import Image from "next/image"
import { Globe } from "lucide-react"
import { getFaviconUrl } from "@/lib/favicon"
import { cn } from "@/lib/utils"

const SIZES = {
    lg: { wrap: "size-12 border-0 bg-secondary p-1.5", image: 48, imageClass: "size-full object-contain" },
    md: { wrap: "size-8 p-1 lg:size-9 lg:p-1.5", image: 36, imageClass: "size-full object-contain" },
    sm: { wrap: "size-6 p-0.5", image: 24, imageClass: "size-full object-contain" },
    hero: { wrap: "size-12 p-1.5 lg:size-14 lg:p-2", image: 56, imageClass: "size-full object-contain" },
} as const

/** Neutral squircle favicon tile for work / inspiration links. */
export function FaviconSquircle({
    href,
    icon,
    size = "md",
    shape = "squircle",
    className,
}: {
    href: string
    icon?: string
    size?: keyof typeof SIZES
    shape?: "squircle" | "circle"
    className?: string
}) {
    const dimensions = SIZES[size]
    const [loaded, setLoaded] = useState(false)
    const [failed, setFailed] = useState(false)
    const src = icon ?? getFaviconUrl(href)
    const showFallback = failed || !src
    const isSvg = src ? /\.svg(?:$|\?)/i.test(src) : false
    const isCircle = shape === "circle"

    return (
        <span
            className={cn(
                "inline-flex shrink-0 items-center justify-center overflow-hidden bg-background print:hidden",
                isCircle
                    ? "rounded-full border border-input"
                    : "rounded-[22%] border border-input",
                dimensions.wrap,
                isCircle && "border border-input",
                className
            )}
        >
            {showFallback ? (
                <Globe
                    aria-hidden
                    strokeWidth={1.75}
                    className="size-[55%] text-muted-foreground"
                />
            ) : (
                <Image
                    src={src}
                    alt=""
                    width={dimensions.image}
                    height={dimensions.image}
                    unoptimized={isSvg}
                    placeholder="empty"
                    className={cn(
                        dimensions.imageClass,
                        "transition-opacity duration-150",
                        loaded ? "opacity-100" : "opacity-70"
                    )}
                    onLoad={() => setLoaded(true)}
                    onError={() => setFailed(true)}
                />
            )}
        </span>
    )
}
