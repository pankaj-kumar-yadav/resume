import { notFound } from "next/navigation"
import { CaseStudyView } from "@/components/case-studies/case-study"
import {
    getCaseStudy,
    getCaseStudySlugs,
} from "@/lib/constants/case-studies.constant"
import { getCaseStudyMetadata } from "@/lib/case-study-metadata"

type PageProps = {
    params: Promise<{ slug: string }>
}

export function generateStaticParams() {
    return getCaseStudySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params
    return getCaseStudyMetadata(slug) ?? { title: "Case Study" }
}

export default async function CaseStudyPage({ params }: PageProps) {
    const { slug } = await params
    const study = getCaseStudy(slug)
    if (!study) notFound()
    return <CaseStudyView study={study} />
}
