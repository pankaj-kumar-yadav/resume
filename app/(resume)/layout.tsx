import { PrintHeader } from "@/components/navbar/header"
import { SectionNav } from "@/components/navbar/section-nav"
import { SiteFooter } from "@/components/shared/site-footer"

export default function ResumeLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <main className="min-h-screen bg-background">
            <div className="relative mx-auto flex max-w-2xl flex-col px-5 pb-6 pt-0 sm:px-8 sm:pb-10 lg:max-w-[1000px] lg:pb-14">
                <PrintHeader />
                <SectionNav />
                <div className="print:mt-2">{children}</div>
                <SiteFooter />
            </div>
        </main>
    )
}
