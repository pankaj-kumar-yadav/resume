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
        mail: Mail,
        phone: Phone,
        globe: Globe,
        twitter: Twitter,
        x: Twitter, // reuse Twitter icon for X
    }

    return (
        <div
            className={`flex gap-x-2 pt-1 print:hidden ${className}`}
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
                        className="
              inline-flex items-center justify-center
              size-8 rounded-md border border-input
              bg-background hover:bg-accent
              text-foreground transition-colors
            "
                    >
                        <Icon size={size} className="stroke-current text-gray-700" />
                    </a>
                )
            })}
        </div>
    )
}
