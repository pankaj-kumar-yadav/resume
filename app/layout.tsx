import { HERO, RESUME_DATA } from "@/lib/constants/resume.constant"
import { FONT_FOUC_SCRIPT } from "@/lib/fonts"
import { PHProvider } from "@/lib/providers/posthog.providers"
import { FontProvider } from "@/lib/providers/font.providers"
import { SmoothScrollProvider } from "@/lib/providers/smooth-scroll.providers"
import { ThemeProvider } from "@/lib/providers/theme.providers"
import type { Metadata } from "next"
import { Fraunces, Geist, Geist_Mono, Inter, Schibsted_Grotesk } from "next/font/google"
import type React from "react"
import "./globals.css"

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-schibsted",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
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

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: `${RESUME_DATA?.name} Resume`,
  description: HERO.line,
  openGraph: {
    title: `${RESUME_DATA.name} - Resume`,
    description: HERO.line,
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
    description: HERO.line,
    // images: ["https://cv.jarocki.me/opengraph-image"],
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
      className={`${schibsted.variable} ${inter.variable} ${geist.variable} ${geistMono.variable} ${fraunces.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: FONT_FOUC_SCRIPT }} />
      </head>
      <body className="antialiased leading-relaxed" suppressHydrationWarning>
        <SmoothScrollProvider>
          <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false} disableTransitionOnChange>
            <FontProvider>
              <PHProvider>
                {children}
              </PHProvider>
            </FontProvider>
          </ThemeProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
