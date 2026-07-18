import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact DAVNS Industries | AI Development Enquiries",
  description:
    "Get in touch with DAVNS Industries for AI automation, enterprise software development, computer vision, or custom platform enquiries. We respond within 24 hours.",
  keywords: [
    "contact DAVNS Industries",
    "AI development enquiry",
    "hire AI company India",
    "software development contact",
    "enterprise AI consultation",
    "DAVNS email",
  ],
  alternates: { canonical: "https://davns.com/contact" },
  openGraph: {
    title: "Contact DAVNS Industries",
    description: "Reach out to discuss your AI automation or custom software development project.",
    url: "https://davns.com/contact",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
