import { SectionHeading } from "@/components/shared/section-heading"
import { RESUME_DATA, RESUME_PDF_URL } from "@/lib/constants/resume.constant"

export function Home() {
    return (
        <section id="home">
            <SectionHeading hideOnScreen>Home</SectionHeading>
            <div className="space-y-3 text-pretty text-sm sm:text-[15px] leading-relaxed text-foreground/80">
                {RESUME_DATA.about.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                ))}
                <p>
                    For a consolidated overview of my experience, projects, and
                    skills, see my{" "}
                    <a
                        href={RESUME_PDF_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-foreground underline-offset-[3px]"
                    >
                        resume
                    </a>
                    .
                </p>
            </div>
        </section>
    )
}
