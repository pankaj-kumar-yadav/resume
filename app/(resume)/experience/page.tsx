import { Experience } from "@/components/experience/experience"
import { getSectionMetadata } from "@/lib/metadata"

export const metadata = getSectionMetadata("experience")

export default function ExperiencePage() {
    return <Experience />
}
