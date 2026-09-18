import { Social } from "@/components/social/social"
import { getSectionMetadata } from "@/lib/metadata"

export const metadata = getSectionMetadata("socials")

export default function SocialsPage() {
    return <Social />
}
