export default function InterviewLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <main className="min-h-screen bg-background">
            <div className="relative mx-auto flex max-w-2xl flex-col px-5 py-6 sm:px-8 sm:py-10">
                {children}
            </div>
        </main>
    )
}
