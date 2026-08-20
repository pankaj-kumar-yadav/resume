import { SectionHeading } from "@/components/shared/section-heading"
import { QuestionAnswerList } from "@/components/interview-prep/question-answer"
import {
    INTERVIEW_PREP,
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
            </section>

            {sections.map((section) => (
                <section key={section.id} id={section.id}>
                    <SectionHeading>{section.title}</SectionHeading>
                    <QuestionAnswerList items={section.items} />
                </section>
            ))}
        </div>
    )
}
