export const SECTIONS = [
    { id: "about", label: "About", href: "/about" },
    { id: "experience", label: "Experience", href: "/experience" },
    { id: "skills", label: "Skills", href: "/skills" },
    { id: "projects", label: "Projects", href: "/projects" },
] as const

export type SectionId = (typeof SECTIONS)[number]["id"]

export function getSectionFromPath(pathname: string): SectionId {
    const match = SECTIONS.find((section) => section.href === pathname)
    return match?.id ?? "about"
}
