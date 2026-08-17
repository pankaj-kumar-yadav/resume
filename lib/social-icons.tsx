import type React from "react"
import type { IconType } from "react-icons"
import {
    Github,
    Gitlab,
    Globe,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Twitter,
} from "lucide-react"
import { SiGeeksforgeeks, SiHackerrank, SiLeetcode } from "react-icons/si"

type SocialIcon = React.ComponentType<{ size?: number; className?: string }>

function brandIcon(Icon: IconType): SocialIcon {
    return function BrandIcon({ size, className }) {
        return (
            <Icon
                size={size}
                className={["fill-current stroke-none", className]
                    .filter(Boolean)
                    .join(" ")}
            />
        )
    }
}

export const SOCIAL_ICON_MAP: Record<string, SocialIcon> = {
    github: Github,
    gitlab: Gitlab,
    linkedin: Linkedin,
    website: Globe,
    mail: Mail,
    phone: Phone,
    location: MapPin,
    globe: Globe,
    twitter: Twitter,
    x: Twitter,
    leetcode: brandIcon(SiLeetcode),
    geeksforgeeks: brandIcon(SiGeeksforgeeks),
    hackerrank: brandIcon(SiHackerrank),
}
