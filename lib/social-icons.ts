import type React from "react"
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

export const SOCIAL_ICON_MAP: Record<
    string,
    React.ComponentType<{ size?: number; className?: string }>
> = {
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
}
