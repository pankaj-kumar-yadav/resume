import { Skills } from "@/components/skills"
import { getSectionMetadata } from "@/lib/metadata"

export const metadata = getSectionMetadata("skills")

export default function SkillsPage() {
    return <Skills />
}
