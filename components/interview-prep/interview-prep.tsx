import { SectionHeading } from "@/components/shared/section-heading"
import { ArrowTextLink } from "@/components/shared/arrow-text-link"
import { QuestionAnswerList } from "@/components/interview-prep/question-answer"
import {
    INTERVIEW_PREP,
    INTERVIEW_PREP_EXTERNAL_PATH,
    INTERVIEW_PREP_MORE_HREF,
    INTERVIEW_PREP_UI,
    INTERVIEW_PREP_UPDATED_AT,
    getNumberedInterviewPrepSections,
} from "@/lib/constants/interview-prep.constant"

export function InterviewPrep() {
    const sections = getNumberedInterviewPrepSections()

    return (
        <div className="flex flex-col gap-10">
            <section>
                <SectionHeading>{INTERVIEW_PREP.title}</SectionHeading>
                <p className="text-xs text-muted-foreground">
                    {INTERVIEW_PREP_UI.lastUpdatedPrefix}{" "}
                    <time dateTime={INTERVIEW_PREP_UPDATED_AT.iso}>
                        {INTERVIEW_PREP_UPDATED_AT.display}
                    </time>
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                    {INTERVIEW_PREP.intro}
                </p>
                <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                    {INTERVIEW_PREP.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2">
                            <span className="shrink-0">•</span>
                            <span>{bullet}</span>
                        </li>
                    ))}
                    <li className="flex gap-2">
                        <span className="shrink-0">•</span>
                        <span>
                            {INTERVIEW_PREP_UI.moreBulletBefore}
                            <ArrowTextLink href={INTERVIEW_PREP_EXTERNAL_PATH}>
                                {INTERVIEW_PREP_UI.externalLabel}
                            </ArrowTextLink>
                            {INTERVIEW_PREP_UI.moreBulletAfter}
                        </span>
                    </li>
                </ul>
            </section>

            {sections.map((section) => (
                <section key={section.id} id={section.id}>
                    <SectionHeading>{section.title}</SectionHeading>
                    <QuestionAnswerList
                        items={section.items}
                        moreHref={INTERVIEW_PREP_MORE_HREF[section.id]}
                    />
                </section>
            ))}
        </div>
    )
}
