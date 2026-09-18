import { Home } from "@/components/home/home"
import { WorkList } from "@/components/experience/work-list"
import { SectionHeading } from "@/components/shared/section-heading"
import { Skills } from "@/components/skill/skills"
import { WORK } from "@/lib/constants/resume.constant"
import { getSectionMetadata } from "@/lib/metadata"
import Link from "next/link"

export const metadata = getSectionMetadata("home")

const featuredWork = WORK.filter((item) => item.featured)

export default function HomePage() {
    return (
        <div className="flex flex-col gap-12 print:gap-5">
            <Home />
            <section id="selected-work" className="print:hidden">
                <SectionHeading>Selected work</SectionHeading>
                <WorkList items={featuredWork} />
                <p className="mt-4 text-sm">
                    <Link
                        href="/experience"
                        className="pressable underline underline-offset-[3px]"
                    >
                        All experience
                    </Link>
                </p>
            </section>
            <Skills />
        </div>
    )
}
