import type { Metadata } from "next"
import { RESUME_DATA } from "@/lib/constants"
import { SECTIONS, type SectionId } from "@/lib/sections"

const DESCRIPTION_MAX = 160

function truncate(text: string, max = DESCRIPTION_MAX): string {
    const normalized = text.replace(/\s+/g, " ").trim()
    if (normalized.length <= max) return normalized
    return `${normalized.slice(0, max - 1).trimEnd()}…`
}

function homeDescription(): string {
    return truncate(RESUME_DATA.about.join(" "))
}

function experienceDescription(): string {
    const job = RESUME_DATA.experience[0]
    if (!job) {
        return truncate(`${RESUME_DATA.name} — ${RESUME_DATA.title}.`)
    }
    return truncate(`${job.role} at ${job.company}. ${job.description}`)
}

function projectsDescription(): string {
    const names = RESUME_DATA.projects.map((project) => project.name).join(", ")
    return truncate(
        `${RESUME_DATA.name} — ${RESUME_DATA.title}. Projects: ${names}.`,
    )
}

function socialDescription(): string {
    const labels = RESUME_DATA.socials
        .filter((social) => social.label !== "Email" && social.label !== "Phone")
        .map((social) => social.label)
        .join(", ")
    return truncate(
        `${RESUME_DATA.name} — ${RESUME_DATA.title} in ${RESUME_DATA.location}. Connect via ${labels}.`,
    )
}

function inspirationDescription(): string {
    const names = ["BEUI", "Interior", "Beautiful UI", "Checklist Design"].join(
        ", ",
    )
    return truncate(
        `Websites, tools, and resources I admire for design and engineering craft — including ${names}.`,
    )
}

const DESCRIPTION_BY_SECTION: Record<SectionId, () => string> = {
    home: homeDescription,
    experience: experienceDescription,
    projects: projectsDescription,
    inspiration: inspirationDescription,
    social: socialDescription,
}

export function getSectionMetadata(sectionId: SectionId): Metadata {
    const section = SECTIONS.find((entry) => entry.id === sectionId)
    const label = section?.label ?? "Home"
    const title = `${label} | ${RESUME_DATA.name}`
    const description = DESCRIPTION_BY_SECTION[sectionId]()

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "profile",
            locale: "en_US",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    }
}
