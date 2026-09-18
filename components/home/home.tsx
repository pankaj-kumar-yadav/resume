import { HeroVoice } from "@/components/home/hero-voice"
import { HERO } from "@/lib/constants/resume.constant"

export function Home() {
    return (
        <section id="home">
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-brand lg:text-[13px]">
                {HERO.currentLabel} {HERO.currentName}
            </p>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:mt-5 lg:text-5xl lg:tracking-[-0.03em]">
                {HERO.greeting}
            </h1>
            <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-foreground/80 sm:text-[15px] lg:mt-5 lg:max-w-2xl lg:text-lg">
                {HERO.line}
            </p>
            <HeroVoice />
        </section>
    )
}
