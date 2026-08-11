import { Projects } from "@/components/projects"
import { getSectionMetadata } from "@/lib/metadata"

export const metadata = getSectionMetadata("projects")

export default function ProjectsPage() {
    return <Projects />
}
