import { RESUME_DATA } from "@/lib/constants"
import { FONT_FOUC_SCRIPT } from "@/lib/fonts"
import { PHProvider } from "@/lib/posthog-provider"
import { FontProvider } from "@/components/font-provider"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import { Geist, Inter, Schibsted_Grotesk } from "next/font/google"
import type React from "react"
import "./globals.css"

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-schibsted",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: `${RESUME_DATA?.name} Resume`,
  description: RESUME_DATA.about.join(" "),
  openGraph: {
    title: `${RESUME_DATA.name} - Resume`,
    description: RESUME_DATA.about.join(" "),
    type: "profile",
    locale: "en_US",
    // images: [
    //   {
    //     url: "https:///opengraph-image",
    //     width: 1200,
    //     height: 630,
    //     alt: `${RESUME_DATA.name}'s profile picture`,
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${RESUME_DATA.name} - Resume`,
    description: RESUME_DATA.about.join(" "),
    // images: ["https://cv.jarocki.me/opengraph-image"],
  },
  icons: {
    icon: RESUME_DATA.profileImage,
    apple: RESUME_DATA.profileImage,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${schibsted.variable} ${inter.variable} ${geist.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: FONT_FOUC_SCRIPT }} />
      </head>
      <body className="antialiased leading-relaxed">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={false} disableTransitionOnChange>
          <FontProvider>
            <PHProvider>
              {children}
            </PHProvider>
          </FontProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
