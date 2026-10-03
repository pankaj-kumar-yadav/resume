import type { Metadata } from "next"
import { getCaseStudy } from "@/lib/constants/case-studies.constant"
import { RESUME_DATA } from "@/lib/constants/resume.constant"

export function getCaseStudyMetadata(slug: string): Metadata | undefined {
    const study = getCaseStudy(slug)
    if (!study) return undefined

    const title = `${study.name} Case Study | ${RESUME_DATA.name}`
    const description = `${study.outcome}. ${study.impact[0] ?? study.context}`.slice(
        0,
        160,
    )

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "article",
        },
    }
}
