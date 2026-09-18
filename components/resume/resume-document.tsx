"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SectionHeading } from "@/components/shared/section-heading"

const ResumePdfViewer = dynamic(
    () =>
        import("@/components/resume/resume-pdf-viewer").then(
            (module) => module.ResumePdfViewer,
        ),
    {
        ssr: false,
        loading: () => (
            <div className="h-[min(90vh,1100px)] rounded-3xl border border-border bg-background" />
        ),
    },
)

export function ResumeDocument() {
    return (
        <section id="resume" className="print:hidden">
            <SectionHeading hideOnScreen>Resume</SectionHeading>
            <Link
                href="/"
                className="pressable mb-5 inline-flex items-center gap-2.5 text-sm text-foreground lg:mb-6 lg:text-[15px]"
            >
                <span className="inline-flex size-8 items-center justify-center rounded-lg border border-black/[0.04] bg-background shadow-[0_1px_2px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.04)]">
                    <ArrowLeft size={14} strokeWidth={2} aria-hidden />
                </span>
                Back to home
            </Link>
            <ResumePdfViewer />
        </section>
    )
}