"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { TabNav } from "@/components/navbar/tab-nav"
import { RESUME_DATA } from "@/lib/constants/resume.constant"
import { NAV_SECTIONS } from "@/lib/constants/sections.constant"
import { cn } from "@/lib/utils"

export function SectionNav() {
    const pathname = usePathname()
    const isHome = pathname === "/"

    return (
        <header className="sticky top-0 z-20 mb-8 print:hidden">
            <div className="nav-edge-blur" aria-hidden />
            <div className="relative pt-3 sm:pt-4">
                <div className="flex items-center gap-2 rounded-full border border-border/70 bg-background/80 p-2 pr-3 backdrop-blur-md sm:gap-3 sm:p-2.5 sm:pr-4">
                    <Link
                        href="/"
                        aria-label={`${RESUME_DATA.name}, home`}
                        aria-current={isHome ? "page" : undefined}
                        className={cn(
                            "pressable relative size-8 shrink-0 overflow-hidden rounded-full ring-1 sm:size-9",
                            isHome ? "ring-foreground/30" : "ring-border/40",
                        )}
                    >
                        <Image
                            src={RESUME_DATA.profileImage}
                            alt=""
                            fill
                            priority
                            sizes="36px"
                            className="object-cover object-[center_20%]"
                        />
                    </Link>
                    <TabNav
                        items={NAV_SECTIONS}
                        ariaLabel="Resume sections"
                        scroll={false}
                    />
                </div>
            </div>
        </header>
    )
}
