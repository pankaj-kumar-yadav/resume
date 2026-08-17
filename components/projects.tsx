import { ExternalLink, Github } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { TechTag } from "@/components/tech-tag"
import { LinkPreview } from "@/components/ui/link-preview"
import { RESUME_DATA } from "@/lib/constants"

export function Projects() {
    const featuredProjects = RESUME_DATA.projects.filter((p) => p.featured)

    return (
        <section
            id="projects"
            className="section-enter"
            style={{ animationDelay: "200ms" }}
        >
            <SectionHeading hideOnScreen>Projects</SectionHeading>
            <div className="divide-y divide-border">
                {featuredProjects.map((proj, idx) => (
                    <article
                        key={idx}
                        className="section-enter py-6 first:pt-0 last:pb-0 print:py-3 print:break-inside-avoid"
                        style={{ animationDelay: `${230 + idx * 30}ms` }}
                    >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between print:gap-1">
                            <h3 className="text-base font-semibold tracking-tight text-foreground print:text-sm">
                                {proj.name}
                            </h3>
                            {(proj.live || proj.github) && (
                                <div className="flex items-center gap-3 shrink-0 print:gap-1.5">
                                    {proj.live && (
                                        <LinkPreview url={proj.live}>
                                            <a
                                                href={proj.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`View ${proj.name} live`}
                                                className="project-link pressable inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-150 print:text-[10px]"
                                                style={{ transitionTimingFunction: "var(--ease-out)" }}
                                            >
                                                <ExternalLink size={13} className="shrink-0 print:hidden" aria-hidden />
                                                <span className="print:hidden">Live</span>
                                                <span className="hidden print:inline">{proj.live.replace("https://", "")}</span>
                                            </a>
                                        </LinkPreview>
                                    )}
                                    {proj.github && (
                                        <LinkPreview url={proj.github}>
                                            <a
                                                href={proj.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`View ${proj.name} on GitHub`}
                                                className="project-link pressable inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-150 print:text-[10px]"
                                                style={{ transitionTimingFunction: "var(--ease-out)" }}
                                            >
                                                <Github size={13} className="shrink-0 print:hidden" aria-hidden />
                                                <span className="print:hidden">GitHub</span>
                                                <span className="hidden print:inline">{proj.github.replace("https://", "")}</span>
                                            </a>
                                        </LinkPreview>
                                    )}
                                </div>
                            )}
                        </div>

                        <p className="mt-2 text-sm leading-relaxed text-foreground/75 print:mt-1 print:text-[10.5pt] print:leading-snug">
                            {proj.description}
                        </p>

                        {"achievements" in proj && proj.achievements && (
                            <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-foreground/75 print:space-y-0.5 print:text-[10.5pt] print:leading-snug">
                                {proj.achievements.map((achievement, i) => (
                                    <li key={i} className="flex gap-2">
                                        <span className="text-muted-foreground shrink-0">•</span>
                                        <span className="text-pretty">
                                            {achievement.includes(":") ? (
                                                <>
                                                    <span className="font-medium text-foreground">
                                                        {achievement.split(":")[0]}:
                                                    </span>
                                                    {achievement.slice(achievement.indexOf(":") + 1)}
                                                </>
                                            ) : (
                                                achievement
                                            )}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="mt-3 flex flex-wrap gap-1.5">
                            {proj.technologies.map((tech) => (
                                <TechTag key={tech}>{tech}</TechTag>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}
