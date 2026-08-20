import { Inspiration } from "@/components/inspiration/inspiration"
import { getSectionMetadata } from "@/lib/metadata"

export const metadata = getSectionMetadata("inspiration")

export default function InspirationPage() {
    return <Inspiration />
}
