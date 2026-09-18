export default function ResumeViewerLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <main className="min-h-screen bg-muted">
            <div className="relative mx-auto flex max-w-2xl flex-col px-5 py-6 sm:px-8 sm:py-10 lg:max-w-[1000px] lg:py-14">
                {children}
            </div>
        </main>
    )
}