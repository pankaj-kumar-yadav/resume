import { Header } from "@/components/header"
import { SectionNav } from "@/components/section-nav"
import { SettingsPanel } from "@/components/settings-panel"

export default function ResumeLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <main className="min-h-screen bg-background">
            <div className="relative mx-auto flex max-w-2xl flex-col px-5 py-6 sm:px-8 sm:py-10">
                <SettingsPanel />
                <Header />
                <SectionNav />
                <div className="mt-5 print:mt-2">{children}</div>
            </div>
        </main>
    )
}
