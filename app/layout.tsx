import { RESUME_DATA } from "@/lib/constants"
import { PHProvider } from "@/lib/posthog-provider"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import "./globals.css"

const inter = Inter({ display: "swap" })

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased leading-relaxed`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <PHProvider>
            {children}
          </PHProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
