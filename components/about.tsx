import { RESUME_DATA } from "@/lib/constants"

export function About() {
    return (
        <section className="mb-12">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-4">About</h2>
            <p className="text-pretty text-base sm:text-lg leading-8 text-foreground/80 print:text-[12px]">{RESUME_DATA.about}</p>
        </section>
    )
}
