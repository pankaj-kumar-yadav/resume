"use client"

import { useState } from "react"
import Image from "next/image"
import { getFaviconUrl } from "@/lib/favicon"
import { cn } from "@/lib/utils"

const SIZES = {
    md: { wrap: "size-7", image: 16, imageClass: "size-4" },
    sm: { wrap: "size-5", image: 12, imageClass: "size-3" },
} as const

const BLUR_DATA_URL =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="

export function FaviconSquare({
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
    const imageClassName = cn(dimensions.imageClass, "favicon-square-image")

    return (
        <span
            className={cn(
                "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-input bg-background print:hidden",
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
                className={imageClassName}
                data-loaded={loaded || undefined}
                onLoad={() => setLoaded(true)}
                onError={(event) => {
                    event.currentTarget.hidden = true
                }}
            />
        </span>
    )
}
