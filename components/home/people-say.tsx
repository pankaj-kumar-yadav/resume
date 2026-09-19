"use client"

import Image from "next/image"
import Link from "next/link"
import { Linkedin } from "lucide-react"
import { useCallback, useRef } from "react"
import { Dot } from "@/components/shared/dot"
import { SectionHeading } from "@/components/shared/section-heading"
import { IconBox } from "@/components/social/icon-box"
import { PEOPLE_SAY, type PersonQuote } from "@/lib/constants/resume.constant"

const HOVER_RATE = 0.08

function canFineHover() {
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches
}

function setTrackRate(track: HTMLDivElement | null, rate: number) {
    track?.getAnimations().forEach((animation) => {
        animation.playbackRate = rate
    })
}

function initials(name: string) {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase()
}

function QuoteText({ text }: { text: string }) {
    const parts = text.split(/(\*\*[^*]+\*\*)/g)

    return (
        <>
            {parts.map((part, index) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                    return (
                        <strong
                            key={index}
                            className="font-medium text-foreground"
                        >
                            {part.slice(2, -2)}
                        </strong>
                    )
                }

                return <span key={index}>{part}</span>
            })}
        </>
    )
}

function QuoteCard({
    person,
    inert,
}: {
    person: PersonQuote
    inert?: boolean
}) {
    return (
        <blockquote className="people-say-card flex h-full min-w-0 w-full flex-col overflow-hidden rounded-[12px]">
            <p className="min-w-0 flex-1 px-5 py-4.5 text-lg font-normal leading-relaxed text-muted-foreground sm:px-6 sm:py-5 lg:text-xl">
                <QuoteText text={person.quote} />
            </p>
            <footer className="people-say-well flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                    {person.image ? (
                        <span className="people-say-avatar relative size-10 shrink-0 overflow-hidden rounded-full border border-input bg-background">
                            <Image
                                src={person.image}
                                alt=""
                                fill
                                sizes="40px"
                                className="object-cover object-[center_20%]"
                            />
                        </span>
                    ) : (
                        <span
                            aria-hidden
                            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-input bg-background text-[11px] font-medium tracking-wide text-foreground"
                        >
                            {initials(person.name)}
                        </span>
                    )}
                    <span className="min-w-0">
                        <cite className="not-italic text-sm font-semibold tracking-tight text-foreground lg:text-[15px]">
                            {person.name}
                        </cite>
                        <span className="mt-0.5 block truncate text-xs leading-snug text-foreground/70 lg:text-sm">
                            {person.role}
                            <Dot />
                            {person.company}
                        </span>
                    </span>
                </div>
                <Link
                    href={person.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={inert ? -1 : undefined}
                    aria-label={`${person.name} on LinkedIn`}
                    className="people-say-in pressable shrink-0"
                >
                    <IconBox tone="blue" size="md">
                        <Linkedin
                            size={16}
                            aria-hidden
                            className="stroke-current drop-shadow-xl drop-shadow-black/40"
                        />
                    </IconBox>
                </Link>
            </footer>
        </blockquote>
    )
}

export function PeopleSay() {
    const trackRef = useRef<HTMLDivElement>(null)
    const loop = [...PEOPLE_SAY, ...PEOPLE_SAY]

    const slow = useCallback(() => {
        if (!canFineHover()) return
        setTrackRate(trackRef.current, HOVER_RATE)
    }, [])

    const fast = useCallback(() => {
        setTrackRate(trackRef.current, 1)
    }, [])

    return (
        <section id="people-say" className="print:hidden">
            <SectionHeading>People say</SectionHeading>
            <div
                className="people-say-viewport"
                data-lenis-prevent
                onPointerEnter={slow}
                onPointerLeave={fast}
                onFocusCapture={slow}
                onBlurCapture={(event) => {
                    if (
                        !event.currentTarget.contains(
                            event.relatedTarget as Node | null
                        )
                    ) {
                        fast()
                    }
                }}
            >
                <div ref={trackRef} className="people-say-track">
                    {loop.map((person, index) => {
                        const duplicate = index >= PEOPLE_SAY.length

                        return (
                            <div
                                key={`${person.href}-${index}`}
                                className="people-say-slide"
                                aria-hidden={duplicate || undefined}
                            >
                                <QuoteCard person={person} inert={duplicate} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
