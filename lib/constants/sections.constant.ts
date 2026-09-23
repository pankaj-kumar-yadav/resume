import { RESUME_PDF_URL } from "@/lib/constants/resume.constant"

export const SECTIONS = [
    { id: "home", label: "Home", href: "/" },
    { id: "experience", label: "Experience", href: "/experience" },
    { id: "projects", label: "Projects", href: "/projects" },
    { id: "socials", label: "Socials", href: "/socials" },
    { id: "inspiration", label: "Inspiration", href: "/inspiration" },
    { id: "resume", label: "Resume", href: RESUME_PDF_URL },
] as const

export const NAV_SECTIONS = SECTIONS.filter(
    (section) => section.id !== "home" && section.id !== "inspiration",
)

export type SectionId = (typeof SECTIONS)[number]["id"]

export function getSectionFromPath(pathname: string): SectionId {
    const match = SECTIONS.find((section) => section.href === pathname)
    return match?.id ?? "home"
}
