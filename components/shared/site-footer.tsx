import Link from "next/link"
import { SectionHeading } from "@/components/shared/section-heading"
import { RESUME_DATA } from "@/lib/constants/resume.constant"

const FOOTER_LINKS = [
    RESUME_DATA.socials.find((social) => social.label === "LinkedIn"),
    RESUME_DATA.socials.find((social) => social.label === "GitHub"),
    { label: "Resume", href: "/resume" },
].filter((link): link is { label: string; href: string } => Boolean(link))

export function SiteFooter() {
    return (
        <footer className="mt-16 border-t border-border pt-8 print:hidden lg:mt-24 lg:pt-10">
            <SectionHeading>Elsewhere</SectionHeading>
            <nav
                aria-label="Elsewhere"
                className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground/80 lg:text-[15px]"
            >
                {FOOTER_LINKS.map((link) => {
                    const isExternal = /^https?:\/\//.test(link.href)

                    return (
                        <Link
                            key={link.label}
                            href={link.href}
                            {...(isExternal
                                ? {
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                  }
                                : {})}
                            className="pressable whitespace-nowrap"
                        >
                            {link.label}
                        </Link>
                    )
                })}
            </nav>
        </footer>
    )
}
