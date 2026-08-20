import { ArrowTextLink } from "@/components/shared/arrow-text-link"
import { INTERVIEW_PREP_UI } from "@/lib/constants/interview-prep.constant"

export function QuestionAnswer({
    n,
    question,
    answer,
    moreHref,
}: {
    n: number
    question: string
    answer: string
    moreHref?: string
}) {
    return (
        <li value={n}>
            <p className="text-sm font-medium text-foreground">
                <span className="mr-1.5 tabular-nums text-muted-foreground">
                    {n}.
                </span>
                {question}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {answer}
            </p>
            {moreHref ? (
                <p className="mt-1.5 text-sm text-muted-foreground">
                    {INTERVIEW_PREP_UI.notEnoughPrefix}{" "}
                    <ArrowTextLink href={moreHref}>
                        {INTERVIEW_PREP_UI.externalLabel}
                    </ArrowTextLink>
                </p>
            ) : null}
        </li>
    )
}

export function QuestionAnswerList({
    items,
    moreHref,
}: {
    items: readonly { n: number; q: string; a: string }[]
    moreHref?: string
}) {
    return (
        <ol className="space-y-6">
            {items.map((item) => (
                <QuestionAnswer
                    key={item.q}
                    n={item.n}
                    question={item.q}
                    answer={item.a}
                    moreHref={moreHref}
                />
            ))}
        </ol>
    )
}
