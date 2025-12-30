import { RESUME_DATA } from "@/lib/constants"

export function About() {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">About</h2>
            <p className="text-pretty font-mono text-lg text-foreground/80 print:text-[12px]">{RESUME_DATA.about}</p>
        </section>
    )
}
