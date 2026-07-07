import type React from "react"
import {
    Github,
    Linkedin,
    Mail,
    Phone,
    Globe,
    Twitter,
} from "lucide-react"
import { RESUME_DATA } from "@/lib/constants"

interface SocialIconsProps {
    size?: number
    className?: string
}

export function SocialIcons({ size = 16, className = "" }: SocialIconsProps) {
    const icons: Record<
        string,
        React.ComponentType<{ size?: number; className?: string }>
    > = {
        github: Github,
        linkedin: Linkedin,
        website: Globe,
        mail: Mail,
        phone: Phone,
        globe: Globe,
        twitter: Twitter,
        x: Twitter,
    }

    return (
        <div
            className={`flex gap-1.5 print:hidden ${className}`}
            role="list"
            aria-label="Contact links"
        >
            {RESUME_DATA.socials.map((social) => {
                const Icon = icons[social.icon]
                if (!Icon) return null

                return (
                    <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pressable hover-accent inline-flex items-center justify-center size-7 rounded-md border border-input bg-background text-foreground"
                    >
                        <Icon size={size} className="stroke-current text-foreground/70" />
                    </a>
                )
            })}
        </div>
    )
}
