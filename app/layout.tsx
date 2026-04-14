import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import "./globals.css"
import { PageTransition } from "@/components/page-transition"
import { NavigationTransition } from "@/components/navigation-transition"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Dancing_Script, Caveat } from "next/font/google"

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  display: "swap",
})

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "DAVNS Industries | Building Intelligent Platforms for the Future",
    template: "%s | DAVNS Industries",
  },
  description:
    "Transform your business with intelligent AI automation solutions. DAVNS Industries specializes in building scalable, future-proof platforms and innovative products for enterprises.",
  keywords: [
    "AI Automation",
    "Enterprise AI",
    "Intelligent Platforms",
    "Machine Learning Solutions",
    "Business Automation",
    "Digital Transformation",
    "DAVNS Industries",
    "Future-proof Technology",
    "Software Development India",
  ],
  authors: [{ name: "DAVNS Industries" }],
  creator: "DAVNS Industries",
  metadataBase: new URL("https://davns.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DAVNS Industries | Building Intelligent Platforms for the Future",
    description: "Transform your business with intelligent AI automation solutions.",
    url: "https://davns.com",
    siteName: "DAVNS Industries",
    images: [
      {
        url: "/favicon.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DAVNS Industries | AI Automation",
    description: "Transform your business with intelligent AI automation solutions.",
    images: ["/favicon.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased ${dancingScript.variable} ${caveat.variable}`}>
        <Suspense fallback={null}>
          <NavigationTransition />
          <PageTransition>{children}</PageTransition>
        </Suspense>
        <SpeedInsights />
      </body>
    </html>
  )
}
