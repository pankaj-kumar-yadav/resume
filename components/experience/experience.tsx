import { FaviconSquircle } from "@/components/shared/favicon-squircle"
import { SectionHeading } from "@/components/shared/section-heading"
import { LinkableText } from "@/components/shared/linkable-text"
import { WorkList } from "@/components/experience/work-list"
import { TechTag } from "@/components/skill/tech-tag"
import { RESUME_DATA, WORK } from "@/lib/constants/resume.constant"

function getAchievementProjectLink(
    achievement: string,
    links?: { label: string; url: string; icon?: string }[]
) {
    if (!links?.length || !achievement.includes(":")) return undefined
    const label = achievement.split(":")[0]
    return links.find((link) => link.label === label)
}

export function Experience() {
    return (
        <section id="experience">
            <SectionHeading hideOnScreen>Experience</SectionHeading>
            <div className="space-y-10 print:space-y-5 lg:space-y-12">
                {RESUME_DATA.experience.map((exp, idx) => (
                    <article key={idx} className="space-y-3 print:space-y-1.5 print:break-inside-avoid lg:space-y-4">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                                {exp.website && (
                                    <FaviconSquircle
                                        href={exp.website}
                                        icon={exp.icon}
                                    />
                                )}
                                <h3 className="text-base font-semibold tracking-tight text-foreground print:text-sm lg:text-lg">
                                    {exp.website ? (
                                        <LinkableText
                                            text={exp.company}
                                            links={[
                                                {
                                                    label: exp.company,
                                                    url: exp.website,
                                                },
                                            ]}
                                        />
                                    ) : (
                                        exp.company
                                    )}
                                </h3>
                            </div>
                            <time className="text-xs text-muted-foreground whitespace-nowrap print:text-[10px] lg:text-sm">
                                {exp.duration}
                            </time>
                        </div>

                        <p className="text-sm text-muted-foreground print:text-xs print:font-medium print:text-foreground/90 lg:text-[15px]">
                            {exp.role}
                        </p>

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

                        <WorkList items={WORK} />

                        {exp.achievements && (
                            <ul className="hidden space-y-1.5 text-sm leading-relaxed text-foreground/75 print:block print:space-y-0.5 print:text-[10.5pt] print:leading-snug" aria-hidden="true">
                                {exp.achievements.map((achievement, i) => {
                                    const projectLink = getAchievementProjectLink(
                                        achievement,
                                        exp.links
                                    )

                                    return (
                                        <li key={i} className="flex gap-2">
                                            <span className="text-muted-foreground shrink-0">•</span>
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
