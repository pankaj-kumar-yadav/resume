import { redirect } from "next/navigation"
import { RESUME_PDF_URL } from "@/lib/constants/resume.constant"

export default function ResumePage() {
    redirect(RESUME_PDF_URL)
}
