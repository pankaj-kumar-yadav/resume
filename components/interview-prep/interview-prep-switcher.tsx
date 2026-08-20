"use client"

import { TabNav } from "@/components/navbar/tab-nav"
import { INTERVIEW_PREP_NAV } from "@/lib/constants/interview-prep.constant"

export function InterviewPrepSwitcher() {
    return (
        <TabNav items={INTERVIEW_PREP_NAV} ariaLabel="Interview prep pages" />
    )
}
