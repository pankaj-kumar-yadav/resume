"use client"

import Link from "next/link"
import { LinkPreview } from "@/components/ui/link-preview"

type ExperienceLink = {
    label: string
    url: string
}

function escapeRegExp(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function HighlightedText({ text }: { text: string }) {
    const parts = text.split(/(\*\*[^*]+\*\*)/g)

    return (
        <>
            {parts.map((part, index) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                    return (
                        <strong
                            key={index}
                            className="font-normal text-foreground"
                        >
                            {part.slice(2, -2)}
                        </strong>
                    )
                }

                return part
            })}
        </>
    )
}

export function LinkableText({
    text,
    links,
}: {
    text: string
    links?: ExperienceLink[]
}) {
    if (!links?.length) return <HighlightedText text={text} />

    const pattern = [...links]
        .sort((a, b) => b.label.length - a.label.length)
        .map((link) => escapeRegExp(link.label))
        .join("|")

    const segments = text.split(new RegExp(`(${pattern})`, "g"))

    return (
        <>
            {segments.map((segment, index) => {
                const link = links.find((item) => item.label === segment)
                if (!link) {
                    return <HighlightedText key={index} text={segment} />
                }

                return (
                    <LinkPreview key={`${link.url}-${index}`} url={link.url}>
                        <Link
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pressable hover:text-foreground"
                        >
                            {segment}
                        </Link>
                    </LinkPreview>
                )
            })}
        </>
    )
}
