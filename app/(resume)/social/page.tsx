import { Social } from "@/components/social/social"
import { getSectionMetadata } from "@/lib/metadata"

export const metadata = getSectionMetadata("social")

export default function SocialPage() {
    return <Social />
}
