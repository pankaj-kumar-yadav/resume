import Link from "next/link"
import { FaviconSquircle } from "@/components/shared/favicon-squircle"
import { LinkPreview } from "@/components/ui/link-preview"
import { ArrowTextLink } from "@/components/shared/arrow-text-link"
import { RESUME_DATA } from "@/lib/constants/resume.constant"
import { ExternalLink, Github } from "lucide-react"

type Project = (typeof RESUME_DATA.projects)[number]

function externalLinkProps(href: string) {
    return /^https?:\/\//.test(href)
        ? { target: "_blank" as const, rel: "noopener noreferrer" }
        : {}
}

export function FeaturedProjectCard({ project }: { project: Project }) {
    const faviconHref = project.live ?? project.github

    return (
        <div className="social-row print:hidden">
            <article className="company-card rounded-[12px] px-5 py-4.5 sm:px-6 sm:py-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                    <div className="flex min-w-0 flex-1 items-center gap-4">
                        <FaviconSquircle href={faviconHref} size="lg" />
                        <div className="min-w-0 flex-1">
                            <h3 className="text-base font-semibold tracking-tight text-neutral-700 dark:text-neutral-200">
                                {project.name}
                            </h3>
                            <p className="mt-0.5 line-clamp-2 text-sm leading-snug text-neutral-500 dark:text-neutral-400">
                                {project.description}
                            </p>
                        </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-3 pl-16 sm:pl-0">
                        {project.live && (
                            <Link
                                href={project.live}
                                {...externalLinkProps(project.live)}
                                className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                                aria-label={`Visit ${project.name} live site`}
                            >
                                <ExternalLink size={18} />
                            </Link>
                        )}
                        {project.github && (
                            <Link
                                href={project.github}
                                {...externalLinkProps(project.github)}
                                className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                                aria-label={`Visit ${project.name} GitHub repository`}
                            >
                                <Github size={18} />
                            </Link>
                        )}
                    </div>
                </div>
            </article>
        </div>
    )
}
