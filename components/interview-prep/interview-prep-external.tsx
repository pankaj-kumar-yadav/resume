"use client"

import { ArrowUpRight } from "lucide-react"
import { SectionHeading } from "@/components/shared/section-heading"
import { FaviconSquircle } from "@/components/shared/favicon-squircle"
import { LinkPreview } from "@/components/ui/link-preview"
import {
    INTERVIEW_PREP_EXTERNAL,
    INTERVIEW_PREP_EXTERNAL_UPDATED_AT,
} from "@/lib/constants/interview-prep-external.constant"
import { INTERVIEW_PREP_UI } from "@/lib/constants/interview-prep.constant"
import { cn } from "@/lib/utils"

const rowClassName =
    "social-link pressable hover-accent group relative flex items-center gap-3 overflow-hidden rounded-md border border-transparent px-2 py-2.5 -mx-2"

function PrepRow({
    label,
    href,
    description,
}: {
    label: string
    href: string
    description: string
}) {
    return (
        <div className={cn(rowClassName, "pr-1")}>
            <FaviconSquircle href={href} />
            <div className="flex min-w-0 flex-1 items-center gap-2">
                <LinkPreview url={href} className="min-w-0 flex-1">
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pressable flex min-w-0 flex-1 flex-col gap-0.5 text-left"
                    >
                        <span className="text-sm font-medium text-foreground">
                            {label}
                        </span>
                        <span className="min-w-0 break-all text-xs text-muted-foreground">
                            {description}
                        </span>
                    </a>
                </LinkPreview>
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${label}`}
                    className="pressable hover-accent inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-input bg-background text-muted-foreground"
                >
                    <ArrowUpRight size={13} aria-hidden />
                </a>
            </div>
        </div>
    )
}

export function InterviewPrepExternal() {
    return (
        <div className="flex flex-col gap-10">
            <section>
                <SectionHeading>{INTERVIEW_PREP_EXTERNAL.title}</SectionHeading>
                <p className="text-xs text-muted-foreground">
                    {INTERVIEW_PREP_UI.lastUpdatedPrefix}{" "}
                    <time dateTime={INTERVIEW_PREP_EXTERNAL_UPDATED_AT.iso}>
                        {INTERVIEW_PREP_EXTERNAL_UPDATED_AT.display}
                    </time>
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                    {INTERVIEW_PREP_EXTERNAL.intro}
                </p>
            </section>

            <section>
                <SectionHeading>{INTERVIEW_PREP_UI.sourcesHeading}</SectionHeading>
                <div className="space-y-2">
                    {INTERVIEW_PREP_EXTERNAL.sources.map((item) => (
                        <PrepRow
                            key={item.href}
                            label={item.label}
                            href={item.href}
                            description={item.href}
                        />
                    ))}
                </div>
            </section>

            {INTERVIEW_PREP_EXTERNAL.sections.map((section) => (
                <section key={section.id} id={section.id}>
                    <SectionHeading>{section.title}</SectionHeading>
                    <p className="mb-4 text-sm text-muted-foreground">
                        {section.blurb}
                    </p>
                    <div className="space-y-2">
                        {section.items.map((item) => (
                            <PrepRow
                                key={`${section.id}-${item.q}`}
                                label={item.q}
                                href={item.href}
                                description={item.href}
                            />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    )
}
