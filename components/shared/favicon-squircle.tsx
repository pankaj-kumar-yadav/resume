"use client"

import { useState } from "react"
import Image from "next/image"
import { getFaviconUrl } from "@/lib/favicon"
import { cn } from "@/lib/utils"

const SIZES = {
    md: { wrap: "size-8 p-1", image: 32, imageClass: "size-full object-contain" },
    sm: { wrap: "size-6 p-0.5", image: 24, imageClass: "size-full object-contain" },
} as const

/** Neutral squircle favicon tile for work / inspiration links. */
export function FaviconSquircle({
    href,
    icon,
    size = "md",
    className,
}: {
    href: string
    icon?: string
    size?: keyof typeof SIZES
    className?: string
}) {
    const dimensions = SIZES[size]
    const [loaded, setLoaded] = useState(false)
    const src = icon ?? getFaviconUrl(href)
    const isSvg = /\.svg(?:$|\?)/i.test(src)

    return (
        <span
            className={cn(
                "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[22%] border border-input bg-background print:hidden",
                dimensions.wrap,
                className
            )}
        >
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
                onError={(event) => {
                    event.currentTarget.hidden = true
                }}
            />
        </span>
    )
}
