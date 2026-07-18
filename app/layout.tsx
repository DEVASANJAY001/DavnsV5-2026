import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import "./globals.css"
import { PageTransition } from "@/components/page-transition"
import { NavigationTransition } from "@/components/navigation-transition"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Dancing_Script, Caveat, Inter } from "next/font/google"
import { Toaster } from "sonner"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

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
    default: "DAVNS Industries | AI Automation & Intelligent Platform Development",
    template: "%s | DAVNS Industries",
  },
  description:
    "DAVNS Industries is an AI-driven software company building intelligent automation platforms, custom enterprise software, and real-time AI solutions for businesses across India and globally.",
  keywords: [
    "AI automation company India",
    "enterprise AI software development",
    "intelligent platforms",
    "machine learning solutions India",
    "business automation software",
    "custom AI development",
    "DAVNS Industries",
    "AI startup India",
    "workflow automation platform",
    "computer vision inspection",
    "AI chatbot development",
    "digital transformation consulting",
    "Next.js development India",
    "React development company",
  ],
  authors: [{ name: "DAVNS Industries", url: "https://davns.com" }],
  creator: "DAVNS Industries",
  publisher: "DAVNS Industries",
  metadataBase: new URL("https://davns.com"),
  alternates: {
    canonical: "https://davns.com",
  },
  openGraph: {
    title: "DAVNS Industries | AI Automation & Intelligent Platforms",
    description: "We build AI-powered automation systems, intelligent platforms, and enterprise software that solve real business problems.",
    url: "https://davns.com",
    siteName: "DAVNS Industries",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DAVNS Industries - Building Intelligent Platforms",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DAVNS Industries | AI Automation",
    description: "AI-powered automation platforms and intelligent enterprise solutions.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "davns-google-site-verification",
  },
  category: "technology",
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DAVNS Industries",
  url: "https://davns.com",
  logo: "https://davns.com/images/davns-logo-alt.png",
  description: "DAVNS Industries is an AI-driven technology company building intelligent automation platforms and enterprise software solutions.",
  email: "davnsindustries@gmail.com",
  foundingDate: "2025-02-14",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN"
  },
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 5, maxValue: 20 },
  areaServed: ["IN", "US", "GB", "AU"],
  sameAs: [
    "https://www.linkedin.com/company/davnsindustriesoffi",
    "https://instagram.com/@davnsindustries",
    "https://www.youtube.com/@davns",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "davnsindustries@gmail.com",
    availableLanguage: ["English", "Tamil"],
  },
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Software Development",
    "Business Automation",
    "Computer Vision",
    "Natural Language Processing",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`font-sans antialiased ${inter.variable} ${dancingScript.variable} ${caveat.variable}`}>
        <Toaster position="bottom-right" theme="dark" richColors />
        <Suspense fallback={null}>
          <NavigationTransition />
          <PageTransition>{children}</PageTransition>
        </Suspense>
        <SpeedInsights />
      </body>
    </html>
  )
}

