"use client"

import { usePathname } from "next/navigation"
import { Tabs } from "@/components/ui/tabs"
import { getSectionFromPath, SECTIONS } from "@/lib/sections"

export function SectionNav() {
    const pathname = usePathname()
    const activeId = getSectionFromPath(pathname)

    return (
        <div className="sticky top-0 z-10 -mx-5 bg-background/90 px-5 py-2 backdrop-blur-sm sm:-mx-8 sm:px-8 print:hidden">
            <Tabs
                items={[...SECTIONS]}
                activeId={activeId}
                ariaLabel="Resume sections"
            />
        </div>
    )
}
