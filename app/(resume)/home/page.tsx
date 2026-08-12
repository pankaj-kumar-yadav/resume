import { Home } from "@/components/home"
import { Skills } from "@/components/skills"
import { getSectionMetadata } from "@/lib/metadata"

export const metadata = getSectionMetadata("home")

export default function HomePage() {
    return (
        <>
            <Home />
            <Skills />
        </>
    )
}
