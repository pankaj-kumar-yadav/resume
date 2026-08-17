import { Home } from "@/components/home"
import { Skills } from "@/components/skills"
import { getSectionMetadata } from "@/lib/metadata"

export const metadata = getSectionMetadata("home")

export default function HomePage() {
    return (
        <div className="flex flex-col gap-10 print:gap-5">
            <Home />
            <Skills />
        </div>
    )
}
