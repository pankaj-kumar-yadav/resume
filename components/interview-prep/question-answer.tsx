export function QuestionAnswer({
    n,
    question,
    answer,
    bullets,
}: {
    n: number
    question: string
    answer: string
    bullets: readonly string[]
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
            {bullets.length > 0 && (
                <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                    {bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-2">
                            <span className="shrink-0">•</span>
                            <span>{bullet}</span>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    )
}

export function QuestionAnswerList({
    items,
}: {
    items: readonly {
        n: number
        q: string
        a: string
        bullets: readonly string[]
    }[]
}) {
    return (
        <ol className="space-y-6">
            {items.map((item) => (
                <QuestionAnswer
                    key={item.q}
                    n={item.n}
                    question={item.q}
                    answer={item.a}
                    bullets={item.bullets}
                />
            ))}
        </ol>
    )
}
