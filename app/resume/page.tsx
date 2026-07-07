import { redirect } from "next/navigation"
import { RESUME_PDF_URL } from "@/lib/constants"

export default function ResumePage() {
    redirect(RESUME_PDF_URL)
}
