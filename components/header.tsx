"use client"

import Image from "next/image"
import { SocialIcons } from "@/components/social-icons"
import { ThemeToggle } from "@/components/theme-toggle"
import { RESUME_DATA } from "@/lib/constants"
import { MapPin } from "lucide-react"

export function Header() {
    return (
        <header
            className="section-enter flex flex-col gap-6 pb-2"
            style={{ animationDelay: "0ms" }}
        >
            <div className="flex items-start justify-between gap-6">
                <div className="min-w-0">
                    <h1
                        className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-2 print:text-2xl print:mb-1"
                        id="resume-name"
                    >
                        {RESUME_DATA.name}
                    </h1>
                    <p className="text-pretty text-base text-foreground/90 mb-1 print:text-sm">
                        {RESUME_DATA.title}
                    </p>
                    <p className="text-pretty text-sm text-muted-foreground mb-2 print:text-xs print:mb-1">
                        {RESUME_DATA.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5 print:text-xs">
                        <MapPin size={14} className="shrink-0 print:hidden" aria-hidden />
                        {RESUME_DATA.location}
                    </p>

                    <p className="hidden print:block mt-2 text-xs leading-relaxed">
                        {RESUME_DATA.socials.map((social, i) => (
                            <span key={social.label}>
                                {i > 0 && <span className="mx-1.5">·</span>}
                                <a href={social.href}>{social.label}</a>
                            </span>
                        ))}
                    </p>
                </div>

                <div className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-xl border border-border sm:w-24 print:w-16">
                    <Image
                        src={RESUME_DATA.profileImage}
                        alt={`${RESUME_DATA.name} profile photo`}
                        fill
                        priority
                        sizes="(max-width: 640px) 80px, 96px"
                        className="object-cover object-[center_20%]"
                    />
                </div>
            </div>

            <div className="flex items-center gap-1.5 print:hidden">
                <SocialIcons size={15} />
                <ThemeToggle />
            </div>
        </header>
    )
}
