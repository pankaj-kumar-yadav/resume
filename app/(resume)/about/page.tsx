import { About } from "@/components/about"
import { getSectionMetadata } from "@/lib/metadata"

export const metadata = getSectionMetadata("about")

export default function AboutPage() {
    return <About />
}
