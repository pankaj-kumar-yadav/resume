import { SectionHeading } from "@/components/shared/section-heading"
import { SkillLogoGrid } from "@/components/skill/skill-logo-grid"
import { RESUME_DATA } from "@/lib/constants/resume.constant"

const SKILL_GROUPS = RESUME_DATA.skills.filter((group) => group.items.length > 0)

export function Skills() {
    return (
        <section id="skills">
            <SectionHeading>Skills</SectionHeading>
            <dl className="space-y-4 print:space-y-2.5 lg:space-y-5">
                {SKILL_GROUPS.map((group) => (
                    <div
                        key={group.category}
                        className="grid grid-cols-1 gap-2 sm:grid-cols-[11rem_1fr] sm:items-start sm:gap-x-6 print:break-inside-avoid lg:grid-cols-[13rem_1fr] lg:gap-x-8"
                    >
                        <dt className="text-sm font-normal tracking-tight text-neutral-700 print:text-xs lg:text-[15px] dark:text-neutral-200">
                            {group.category}
                        </dt>
                        <dd className="m-0 min-w-0">
                            <SkillLogoGrid items={group.items} />
                        </dd>
                    </div>
                ))}
            </dl>
        </section>
    )
}
