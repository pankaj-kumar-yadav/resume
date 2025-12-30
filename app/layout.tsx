import { RESUME_DATA } from "@/lib/constants"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import "./globals.css"

const inter = Inter({ display: "swap" })

export const metadata: Metadata = {
  title: `${RESUME_DATA?.name} Resume`,
  description: RESUME_DATA?.about,
  openGraph: {
    title: `${RESUME_DATA.name} - Resume`,
    description: RESUME_DATA.about,
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
    description: RESUME_DATA.about,
    // images: ["https://cv.jarocki.me/opengraph-image"],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
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
        className={`${inter.className} **:antialiased bg-white text-black dark:bg-black dark:text-white`}
      >
        {children}
      </body>
    </html>
  )
}
