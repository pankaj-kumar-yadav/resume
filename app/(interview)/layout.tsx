import { InterviewPrepSwitcher } from "@/components/interview-prep/interview-prep-switcher"

export default function InterviewLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <main className="min-h-screen bg-background">
            <div className="relative mx-auto flex max-w-2xl flex-col px-5 py-6 sm:px-8 sm:py-10">
                <InterviewPrepSwitcher />
                <div className="mt-5">{children}</div>
            </div>
        </main>
    )
}
