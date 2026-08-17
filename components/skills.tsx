import { SectionHeading } from "@/components/section-heading"
import { TechTag } from "@/components/tech-tag"
import { RESUME_DATA } from "@/lib/constants"

const SKILL_GROUPS = RESUME_DATA.skills.filter((group) => group.items.length > 0)

export function Skills() {
    return (
        <section id="skills">
            <SectionHeading>Skills</SectionHeading>
            <dl className="space-y-4 print:space-y-2.5">
                {SKILL_GROUPS.map((group) => (
                    <div
                        key={group.category}
                        className="grid grid-cols-1 gap-2 sm:grid-cols-[11rem_1fr] sm:items-start sm:gap-x-6 print:break-inside-avoid"
                    >
                        <dt className="text-sm font-medium text-foreground/75 print:text-xs">
                            {group.category}
                        </dt>
                        <dd className="m-0 flex flex-wrap gap-1.5 print:gap-1">
                            {group.items.map((skill) => (
                                <TechTag key={skill}>{skill}</TechTag>
                            ))}
                        </dd>
                    </div>
                ))}
            </dl>
        </section>
    )
}
