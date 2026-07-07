import { SectionHeading } from "@/components/section-heading"
import { TechTag } from "@/components/tech-tag"
import { RESUME_DATA } from "@/lib/constants"

export function Skills() {
    return (
        <section
            id="skills"
            className="section-enter"
            style={{ animationDelay: "150ms" }}
        >
            <SectionHeading>Skills</SectionHeading>
            <div className="flex flex-wrap gap-1.5 print:gap-1">
                {RESUME_DATA.skills.map((skill) => (
                    <TechTag key={skill}>{skill}</TechTag>
                ))}
            </div>
        </section>
    )
}
