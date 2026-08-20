import { InterviewPrep } from "@/components/interview-prep/interview-prep"
import { INTERVIEW_PREP } from "@/lib/constants/interview-prep.constant"
import { RESUME_DATA } from "@/lib/constants/resume.constant"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: `${INTERVIEW_PREP.title} | ${RESUME_DATA.name}`,
    description: INTERVIEW_PREP.intro,
    robots: {
        index: false,
        follow: false,
    },
}

export default function InterviewPrepPage() {
    return <InterviewPrep />
}
