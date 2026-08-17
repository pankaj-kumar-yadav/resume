import { FaviconSquare } from "@/components/favicon-square"
import { SectionHeading } from "@/components/section-heading"
import { LinkableText } from "@/components/linkable-text"
import { TechTag } from "@/components/tech-tag"
import { RESUME_DATA } from "@/lib/constants"

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
        <section
            id="experience"
            className="section-enter"
            style={{ animationDelay: "100ms" }}
        >
            <SectionHeading hideOnScreen>Experience</SectionHeading>
            <div className="space-y-10 print:space-y-5">
                {RESUME_DATA.experience.map((exp, idx) => (
                    <article key={idx} className="space-y-3 print:space-y-1.5 print:break-inside-avoid">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                                {exp.website && <FaviconSquare href={exp.website} />}
                                <h3 className="text-base font-semibold tracking-tight text-foreground print:text-sm">
                                    {exp.company}
                                </h3>
                            </div>
                            <time className="text-xs text-muted-foreground whitespace-nowrap print:text-[10px]">
                                {exp.duration}
                            </time>
                        </div>

                        <p className="text-sm font-medium text-foreground/90 print:text-xs">
                            {exp.role}
                        </p>

                        <div className="flex flex-wrap gap-1.5 print:gap-1">
                            {exp.technologies.map((tech) => (
                                <TechTag key={tech}>{tech}</TechTag>
                            ))}
                        </div>

                        <p className="text-pretty text-sm leading-relaxed text-foreground/75 print:text-[10.5pt] print:leading-snug">
                            {exp.description}
                        </p>

                        {exp.achievements && (
                            <ul className="space-y-1.5 text-sm leading-relaxed text-foreground/75 print:space-y-0.5 print:text-[10.5pt] print:leading-snug">
                                {exp.achievements.map((achievement, i) => {
                                    const projectLink = getAchievementProjectLink(
                                        achievement,
                                        exp.links
                                    )

                                    return (
                                        <li key={i} className="flex gap-2">
                                            <span className="text-muted-foreground shrink-0">•</span>
                                            {projectLink && (
                                                <FaviconSquare
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
