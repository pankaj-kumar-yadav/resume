import { PrintHeader } from "@/components/navbar/header"
import { SectionNav } from "@/components/navbar/section-nav"

export default function ResumeLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <main className="min-h-screen bg-background">
            <div className="relative mx-auto flex max-w-2xl flex-col px-5 py-6 sm:px-8 sm:py-10">
                <PrintHeader />
                <SectionNav />
                <div className="print:mt-2">{children}</div>
            </div>
        </main>
    )
}
