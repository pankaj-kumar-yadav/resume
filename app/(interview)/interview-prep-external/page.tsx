import { InterviewPrepExternal } from "@/components/interview-prep/interview-prep-external"
import { INTERVIEW_PREP_EXTERNAL } from "@/lib/constants/interview-prep-external.constant"
import { RESUME_DATA } from "@/lib/constants/resume.constant"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: `${INTERVIEW_PREP_EXTERNAL.title} | ${RESUME_DATA.name}`,
    description: INTERVIEW_PREP_EXTERNAL.intro,
    robots: {
        index: false,
        follow: false,
    },
}

export default function InterviewPrepExternalPage() {
    return <InterviewPrepExternal />
}
