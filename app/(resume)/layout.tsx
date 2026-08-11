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
            <div className="relative mx-auto flex max-w-2xl flex-col gap-8 px-5 py-12 sm:px-8 sm:py-16">
                <SettingsPanel />
                <Header />
                <SectionNav />
                {children}
            </div>
        </main>
    )
}
