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
        <div className="flex flex-col gap-12 print:gap-5 lg:gap-16">
            <Home />
            <section id="selected-work" className="print:hidden">
                <div className="mb-5 flex items-baseline justify-between gap-4 lg:mb-6">
                    <SectionHeading className="mb-0 lg:mb-0">Selected work</SectionHeading>
                    <Link
                        href="/experience"
                        className="pressable shrink-0 text-sm underline underline-offset-[3px] lg:text-[15px]"
                    >
                        View all
                    </Link>
                </div>
                <WorkList items={featuredWork} variant="card" />
            </section>
            <Skills />
        </div>
    )
}
