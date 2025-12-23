import type React from "react"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

interface SocialIconsProps {
    size?: number
    className?: string
}

export function SocialIcons({ size = 40, className = "" }: SocialIconsProps) {
    const icons: Record<string, React.ComponentType<{ size: number; className?: string }>> = {
        github: Github,
        linkedin: Linkedin,
        twitter: Twitter,
        mail: Mail,
    }

    // Get socials from constants
    const socials = [
        {
            label: "GitHub",
            href: "https://github.com/johndoe",
            icon: "github",
        },
        {
            label: "LinkedIn",
            href: "https://linkedin.com/in/johndoe",
            icon: "linkedin",
        },
        {
            label: "Twitter",
            href: "https://twitter.com/johndoe",
            icon: "twitter",
        },
        {
            label: "Email",
            href: "mailto:john.doe@example.com",
            icon: "mail",
        },
    ]

    return (
        <div className={`flex gap-6 ${className}`}>
            {socials.map((social) => {
                const Icon = icons[social.icon]
                return (
                    <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                    >
                        <Icon size={size} className="stroke-current" />
                    </a>
                )
            })}
        </div>
    )
}
