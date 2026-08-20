export function QuestionAnswer({
    n,
    question,
    answer,
}: {
    n: number
    question: string
    answer: string
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
        </li>
    )
}

export function QuestionAnswerList({
    items,
}: {
    items: readonly { n: number; q: string; a: string }[]
}) {
    return (
        <ol className="space-y-6">
            {items.map((item) => (
                <QuestionAnswer
                    key={item.q}
                    n={item.n}
                    question={item.q}
                    answer={item.a}
                />
            ))}
        </ol>
    )
}
