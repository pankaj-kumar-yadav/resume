import { FaviconSquircle } from "@/components/shared/favicon-squircle"
import { SectionHeading } from "@/components/shared/section-heading"
import { LinkableText } from "@/components/shared/linkable-text"
import { CompanyCard } from "@/components/experience/work-list"
import { TechTag } from "@/components/skill/tech-tag"
import { EXPERIENCE_WORK, RESUME_DATA, WORK } from "@/lib/constants/resume.constant"

function getAchievementProjectLink(
    achievement: string,
    links?: { label: string; url: string; icon?: string }[]
) {
    if (!links?.length || !achievement.includes(":")) return undefined
    const label = achievement.split(":")[0]
    return links.find((link) => link.label === label)
}

function normalizeUrl(url: string) {
    return url.replace(/\/$/, "")
}

function workItemsForExperience(
    exp: (typeof RESUME_DATA.experience)[number]
) {
    const urls = new Set(
        (exp.links ?? []).map((link) => normalizeUrl(link.url))
    )
    return WORK.filter(
        (item) => item.href && urls.has(normalizeUrl(item.href))
    )
}

export function Experience() {
    return (
        <section id="experience">
            <SectionHeading hideOnScreen>Experience</SectionHeading>
            <div className="space-y-10 print:space-y-5 lg:space-y-12">
                {RESUME_DATA.experience.map((exp, idx) => (
                    <article key={idx} className="space-y-3 print:space-y-1.5 print:break-inside-avoid lg:space-y-4">
                        <div className="hidden print:block">
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                <h3 className="text-base font-semibold tracking-tight text-foreground print:text-sm">
                                    {exp.company}
                                </h3>
                                <time className="text-xs text-muted-foreground whitespace-nowrap print:text-[10px]">
                                    {exp.duration}
                                </time>
                            </div>
                            <p className="text-sm text-muted-foreground print:text-xs print:font-medium print:text-foreground/90">
                                {exp.role}
                            </p>
                        </div>

                        {EXPERIENCE_WORK[idx] ? (
                            <CompanyCard
                                company={EXPERIENCE_WORK[idx]}
                                items={workItemsForExperience(exp)}
                            />
                        ) : null}

                        <div className="hidden flex-wrap gap-1.5 print:flex print:gap-1" aria-hidden="true">
                            {exp.technologies.map((tech) => (
                                <TechTag key={tech}>{tech}</TechTag>
                            ))}
                        </div>

                        <p className="hidden text-pretty text-sm leading-relaxed text-foreground/75 print:block print:text-[10.5pt] print:leading-snug" aria-hidden="true">
                            <LinkableText
                                text={exp.description}
                                links={exp.links}
                            />
                        </p>

                        {exp.achievements && (
                            <ul className="hidden space-y-1.5 text-sm leading-relaxed text-foreground/75 print:block print:space-y-0.5 print:text-[10.5pt] print:leading-snug" aria-hidden="true">
                                {exp.achievements.map((achievement, i) => {
                                    const projectLink = getAchievementProjectLink(
                                        achievement,
                                        exp.links
                                    )

                                    return (
                                        <li key={i} className="flex gap-2">
                                            <span className="mt-px shrink-0 text-[1.35em] leading-none text-muted-foreground">•</span>
                                            {projectLink && (
                                                <FaviconSquircle
                                                    href={projectLink.url}
                                                    icon={projectLink.icon}
                                                    size="sm"
                                                    className="mt-0.5"
                                                />
                                            )}
                                            <span className="text-pretty">
                                                {achievement.includes(":") ? (
                                                    <>
                                                        <span className="font-medium text-foreground">
                                                            <LinkableText
                                                                text={`${achievement.split(":")[0]}:`}
                                                                links={exp.links}
                                                            />
                                                        </span>
                                                        <LinkableText
                                                            text={achievement.slice(
                                                                achievement.indexOf(":") + 1
                                                            )}
                                                            links={exp.links}
                                                        />
                                                    </>
                                                ) : (
                                                    <LinkableText
                                                        text={achievement}
                                                        links={exp.links}
                                                    />
                                                )}
                                            </span>
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                    </article>
                ))}
            </div>
        </section>
    )
}
