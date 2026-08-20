"use client"

import { TabNav } from "@/components/navbar/tab-nav"
import { SECTIONS } from "@/lib/constants/sections.constant"

export function SectionNav() {
    return (
        <TabNav
            items={SECTIONS}
            ariaLabel="Resume sections"
            scroll={false}
        />
    )
}
