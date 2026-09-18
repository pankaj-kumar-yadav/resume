import { ResumeDocument } from "@/components/resume/resume-document"
import { getSectionMetadata } from "@/lib/metadata"

export const metadata = getSectionMetadata("resume")

export default function ResumePage() {
    return <ResumeDocument />
}