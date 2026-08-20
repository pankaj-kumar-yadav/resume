"use client"

import { useState } from "react"
import Image from "next/image"
import { getFaviconUrl } from "@/lib/favicon"
import { cn } from "@/lib/utils"

const SIZES = {
    md: { wrap: "size-8", image: 16, imageClass: "size-4" },
    sm: { wrap: "size-6", image: 12, imageClass: "size-3" },
} as const

const BLUR_DATA_URL =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="

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
                placeholder={isSvg ? "empty" : "blur"}
                blurDataURL={isSvg ? undefined : BLUR_DATA_URL}
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
