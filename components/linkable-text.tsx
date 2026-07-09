"use client"

import { LinkPreview } from "@/components/ui/link-preview"

type ExperienceLink = {
    label: string
    url: string
}

function escapeRegExp(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

export function LinkableText({
    text,
    links,
}: {
    text: string
    links?: ExperienceLink[]
}) {
    if (!links?.length) return <>{text}</>

    const pattern = [...links]
        .sort((a, b) => b.label.length - a.label.length)
        .map((link) => escapeRegExp(link.label))
        .join("|")

    const segments = text.split(new RegExp(`(${pattern})`, "g"))

    return (
        <>
            {segments.map((segment, index) => {
                const link = links.find((item) => item.label === segment)
                if (!link) return segment

                return (
                    <LinkPreview key={`${link.url}-${index}`} url={link.url}>
                        <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-[3px] hover:text-foreground print:no-underline"
                        >
                            {segment}
                        </a>
                    </LinkPreview>
                )
            })}
        </>
    )
}
