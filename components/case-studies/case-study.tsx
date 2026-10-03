import Link from "next/link"
import { ExternalLink } from "lucide-react"
import type { CaseStudy } from "@/lib/constants/case-studies.constant"
import { CaseStudyFigureView } from "@/components/case-studies/case-study-figure"
import { BackLink } from "@/components/shared/back-link"
import { FaviconSquircle } from "@/components/shared/favicon-squircle"

function Section({
    title,
    children,
}: {
    title: string
    children: React.ReactNode
}) {
    return (
        <section className="space-y-3 lg:space-y-3.5">
            <h2 className="text-sm font-semibold tracking-tight text-foreground lg:text-base">
                {title}
            </h2>
            <div className="space-y-3 text-pretty text-sm leading-relaxed text-foreground/75 lg:space-y-3.5 lg:text-[15px] lg:leading-relaxed">
                {children}
            </div>
        </section>
    )
}

export function CaseStudyView({ study }: { study: CaseStudy }) {
    return (
        <article className="space-y-8 print:space-y-5 lg:space-y-12">
            <BackLink href="/experience">Back to experience</BackLink>

            <header className="space-y-5 lg:space-y-6">
                <div className="flex items-start gap-3.5 sm:gap-4 lg:gap-5">
                    <FaviconSquircle
                        href={study.liveUrl}
                        icon={study.icon}
                        size="lg"
                        className="mt-1 lg:mt-1.5"
                    />
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                            <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl lg:text-3xl">
                                {study.name}
                            </h1>
                            <Link
                                href={study.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="pressable inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground lg:text-sm"
                            >
                                {study.liveLabel}
                                <ExternalLink size={12} className="lg:size-3.5" aria-hidden />
                            </Link>
                        </div>
                        <p className="mt-0.5 text-sm text-foreground/70 lg:mt-1 lg:text-base">
                            {study.outcome}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground lg:text-sm">
                            {study.company} · {study.contextLabel}
                        </p>
                    </div>
                </div>

                <section
                    aria-labelledby="case-study-summary"
                    className="company-card rounded-[12px] px-5 py-4.5 sm:px-6 sm:py-5"
                >
                    <h2
                        id="case-study-summary"
                        className="text-xs font-medium tracking-wide text-muted-foreground lg:text-sm"
                    >
                        Summary
                    </h2>
                    <p className="mt-2 text-sm leading-snug text-foreground/85 lg:text-[15px] lg:leading-relaxed">
                        {study.role}
                    </p>
                    <ul className="company-card-well gap-2 text-sm leading-snug text-foreground/70 lg:gap-2.5 lg:text-[15px] lg:leading-relaxed">
                        {study.impact.map((item) => (
                            <li key={item} className="flex gap-2.5 px-1.5 py-0.5">
                                <span
                                    className="mt-2 size-1 shrink-0 rounded-full bg-foreground/35 lg:mt-2.5 lg:size-1.5"
                                    aria-hidden
                                />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </header>

            <Section title="Introduction">
                <p>{study.context}</p>
            </Section>

            <Section title="Problem">
                <p>{study.problem}</p>
            </Section>

            <Section title="What I owned">
                <p>{study.owned}</p>
                {study.notOwned ? (
                    <p className="text-muted-foreground">{study.notOwned}</p>
                ) : null}
            </Section>

            <Section title="Approach">
                <ol className="list-decimal space-y-3 pl-5">
                    {study.approach.map((item) => (
                        <li key={item.title}>
                            <span className="font-medium text-foreground">
                                {item.title}.
                            </span>{" "}
                            {item.body}
                        </li>
                    ))}
                </ol>
            </Section>

            <Section title="Build highlights">
                <ul className="space-y-3">
                    {study.highlights.map((item) => (
                        <li key={item.title}>
                            <p className="font-medium text-foreground">
                                {item.title}
                            </p>
                            <p>{item.body}</p>
                        </li>
                    ))}
                </ul>
            </Section>

            {study.figures.length > 0 ? (
                <div className="space-y-10 lg:space-y-14">
                    {study.figures.map((figure) => (
                        <CaseStudyFigureView key={figure.src} figure={figure} />
                    ))}
                </div>
            ) : null}

            <Section title="Outcome">
                <p>{study.outcomeDetail}</p>
                {study.quote ? (
                    <blockquote className="border-l-2 border-border pl-4 text-foreground/80">
                        <p>“{study.quote.text}”</p>
                        <footer className="mt-2 text-xs text-muted-foreground lg:text-sm">
                            — {study.quote.attribution}
                        </footer>
                    </blockquote>
                ) : null}
            </Section>

            <Section title="Reflection">
                <p>{study.reflection}</p>
                {study.talkTracks.length > 0 ? (
                    <div>
                        <p className="font-medium text-foreground">
                            Topics I can discuss in interview
                        </p>
                        <ul className="mt-2 list-disc space-y-1 pl-5">
                            {study.talkTracks.map((track) => (
                                <li key={track}>{track}</li>
                            ))}
                        </ul>
                    </div>
                ) : null}
            </Section>
        </article>
    )
}
