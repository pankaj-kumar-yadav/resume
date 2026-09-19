"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { TabNav } from "@/components/navbar/tab-nav"
import { RESUME_DATA } from "@/lib/constants/resume.constant"
import { NAV_SECTIONS } from "@/lib/constants/sections.constant"

export function SectionNav() {
    const pathname = usePathname()
    const isHome = pathname === "/"

    return (
        <>
            <div className="nav-rest-inset print:hidden" aria-hidden />
            <header className="sticky top-0 z-20 mb-8 isolate print:hidden lg:mb-12">
                <div className="nav-edge-blur" aria-hidden />
                <div className="relative pt-4 sm:pt-5">
                    <div className="flex items-center gap-3 rounded-full border border-black/[0.04] bg-background/90 p-1.5 pr-3 shadow-[0_4px_18px_rgba(0,0,0,0.05)] backdrop-blur-md sm:gap-4 sm:p-2 sm:pr-4 lg:gap-6 lg:p-2.5 lg:pr-6">
                        <Link
                            href="/"
                            aria-label={`${RESUME_DATA.name}, home`}
                            aria-current={isHome ? "page" : undefined}
                            className="pressable relative size-8 shrink-0 rounded-full shadow-[0_1px_1px_rgba(0,0,0,0.06),0_4px_10px_rgba(0,0,0,0.12)] sm:size-9 lg:size-10"
                        >
                            <span className="absolute inset-0 overflow-hidden rounded-full">
                                <Image
                                    src={RESUME_DATA.profileImage}
                                    alt=""
                                    fill
                                    priority
                                    sizes="(min-width: 1024px) 40px, 36px"
                                    className="object-cover object-[center_20%]"
                                />
                            </span>
                        </Link>
                        <TabNav
                            items={NAV_SECTIONS}
                            ariaLabel="Resume sections"
                            scroll={false}
                        />
                    </div>
                </div>
            </header>
        </>
    )
}
