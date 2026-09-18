import { ArrowTextLink } from "@/components/shared/arrow-text-link"
import {
    HERO,
    RESUME_DATA,
    RESUME_PDF_URL,
} from "@/lib/constants/resume.constant"

export function Home() {
    return (
        <section id="home">
            <p className="flex flex-wrap items-baseline gap-x-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                <span>{HERO.currentLabel}</span>
                <ArrowTextLink
                    href={HERO.currentHref}
                    className="text-xs font-medium normal-case tracking-normal text-muted-foreground"
                >
                    {HERO.currentName}
                </ArrowTextLink>
            </p>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {HERO.greeting}
            </h1>
            <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
                {HERO.line}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">{HERO.voice}</p>
            <p className="mt-6 text-sm text-foreground/80">
                <ArrowTextLink href={RESUME_PDF_URL}>Resume</ArrowTextLink>
                <span className="mx-2 text-muted-foreground">·</span>
                <ArrowTextLink href={`mailto:${RESUME_DATA.email}`}>
                    Email
                </ArrowTextLink>
            </p>
        </section>
    )
}
