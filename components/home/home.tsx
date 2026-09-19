import { HeroCta } from "@/components/home/hero-cta"
import { HeroVoice } from "@/components/home/hero-voice"
import { HERO } from "@/lib/constants/resume.constant"

export function Home() {
    return (
        <section id="home" className="hero-screen">
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-brand lg:text-[13px]">
                {HERO.currentLabel} {HERO.currentName}
            </p>
            <h1 className="mt-3 font-serif text-2xl font-normal leading-[1.15] tracking-[0.02em] text-foreground sm:text-3xl lg:mt-5 lg:text-5xl">
                {HERO.greeting}
            </h1>
            <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-foreground/80 sm:text-[15px] lg:mt-5 lg:max-w-2xl lg:text-lg">
                {HERO.line}
            </p>
            <HeroCta />
            <HeroVoice />
        </section>
    )
}
