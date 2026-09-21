import { SectionHeading } from "@/components/shared/section-heading"
import { ArrowTextLink } from "@/components/shared/arrow-text-link"
import { FaviconSquircle } from "@/components/shared/favicon-squircle"
import { TechTag } from "@/components/skill/tech-tag"
import { LinkPreview } from "@/components/ui/link-preview"
import { RESUME_DATA } from "@/lib/constants/resume.constant"

type Project = (typeof RESUME_DATA.projects)[number]

function stripProtocol(url: string) {
    return url.replace(/^https?:\/\//, "")
}

function AchievementText({ achievement }: { achievement: string }) {
    if (!achievement.includes(":")) return achievement

    return (
        <>
            <span className="font-medium text-foreground">
                {achievement.split(":")[0]}:
            </span>
            {achievement.slice(achievement.indexOf(":") + 1)}
        </>
    )
}

function AchievementList({
    achievements,
    className,
}: {
    achievements: string[]
    className?: string
}) {
    return (
        <ul className={className}>
            {achievements.map((achievement) => (
                <li key={achievement} className="flex gap-2">
                    <span className="mt-px shrink-0 text-[1.35em] leading-none text-muted-foreground">
                        •
                    </span>
                    <span className="text-pretty">
                        <AchievementText achievement={achievement} />
                    </span>
                </li>
            ))}
        </ul>
    )
}

function ProjectLinks({
    project,
    variant,
}: {
    project: Project
    variant: "screen" | "print"
}) {
    if (!project.live && !project.github) return null

    if (variant === "print") {
        return (
            <div className="flex items-center gap-3 shrink-0 print:gap-1.5">
                {project.live && (
                    <span className="text-[10px] font-medium text-muted-foreground">
                        {stripProtocol(project.live)}
                    </span>
                )}
                {project.github && (
                    <span className="text-[10px] font-medium text-muted-foreground">
                        {stripProtocol(project.github)}
                    </span>
                )}
            </div>
        )
    }

    return (
        <div className="flex shrink-0 items-center gap-3 pl-16 sm:pl-0">
            {project.live && (
                <LinkPreview url={project.live}>
                    <span className="inline-flex">
                        <ArrowTextLink
                            href={project.live}
                            className="text-sm text-neutral-500 dark:text-neutral-400"
                        >
                            Live
                        </ArrowTextLink>
                    </span>
                </LinkPreview>
            )}
            {project.github && (
                <LinkPreview url={project.github}>
                    <span className="inline-flex">
                        <ArrowTextLink
                            href={project.github}
                            className="text-sm text-neutral-500 dark:text-neutral-400"
                        >
                            GitHub
                        </ArrowTextLink>
                    </span>
                </LinkPreview>
            )}
        </div>
    )
}

function ProjectCard({ project, delayMs }: { project: Project; delayMs: number }) {
    const faviconHref = project.live ?? project.github

    return (
        <div
            className="social-row print:hidden"
            style={{ animationDelay: `${delayMs}ms` }}
        >
            <article className="company-card rounded-[12px] px-5 py-4.5 sm:px-6 sm:py-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                    <div className="flex min-w-0 flex-1 items-center gap-4">
                        <FaviconSquircle href={faviconHref} size="lg" />
                        <h3 className="text-base font-semibold tracking-tight text-neutral-700 dark:text-neutral-200">
                            {project.name}
                        </h3>
                    </div>
                    <ProjectLinks project={project} variant="screen" />
                </div>

                <p className="mt-3 text-sm leading-relaxed text-neutral-500 lg:text-[15px] dark:text-neutral-400">
                    {project.description}
                </p>

                {"achievements" in project && project.achievements && (
                    <div className="company-card-well">
                        <AchievementList
                            achievements={project.achievements}
                            className="space-y-1.5 px-2 py-1.5 text-sm leading-relaxed text-foreground/75 lg:text-[15px]"
                        />
                    </div>
                )}

                <div className="mt-3 flex flex-wrap gap-1.5 lg:mt-4 lg:gap-2">
                    {project.technologies.map((tech) => (
                        <TechTag key={tech}>{tech}</TechTag>
                    ))}
                </div>
            </article>
        </div>
    )
}

function ProjectPrintArticle({ project }: { project: Project }) {
    return (
        <article className="hidden py-3 print:block print:break-inside-avoid">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-sm font-semibold tracking-tight text-foreground">
                    {project.name}
                </h3>
                <ProjectLinks project={project} variant="print" />
            </div>

            <p className="mt-1 text-[10.5pt] leading-snug text-foreground/75">
                {project.description}
            </p>

            {"achievements" in project && project.achievements && (
                <AchievementList
                    achievements={project.achievements}
                    className="mt-1 space-y-0.5 text-[10.5pt] leading-snug text-foreground/75"
                />
            )}

            <div className="mt-2 flex flex-wrap gap-1">
                {project.technologies.map((tech) => (
                    <TechTag key={tech}>{tech}</TechTag>
                ))}
            </div>
        </article>
    )
}

export function Projects() {
    const featuredProjects = RESUME_DATA.projects.filter((p) => p.featured)

    return (
        <section id="projects">
            <SectionHeading hideOnScreen>Projects</SectionHeading>
            <div className="space-y-5 print:hidden">
                {featuredProjects.map((project, index) => (
                    <ProjectCard
                        key={project.name}
                        project={project}
                        delayMs={index * 50}
                    />
                ))}
            </div>
            <div className="hidden print:block print:divide-y print:divide-border">
                {featuredProjects.map((project) => (
                    <ProjectPrintArticle key={project.name} project={project} />
                ))}
            </div>
        </section>
    )
}
