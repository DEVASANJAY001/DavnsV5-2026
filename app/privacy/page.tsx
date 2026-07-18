import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { AuroraBackground } from "@/components/aurora-background"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | DAVNS Industries",
  description:
    "Read the DAVNS Industries Privacy Policy to understand how we collect, use, and protect your personal information in compliance with applicable data protection laws.",
  alternates: { canonical: "https://davns.com/privacy" },
  robots: { index: true, follow: true },
}

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      "Contact information: name, email address, phone number, and company name when provided through our contact forms or enquiry processes.",
      "Usage data: IP address, browser type, pages visited, time spent, and referral source — collected automatically via analytics tools.",
      "Communication data: messages, project details, and other information you voluntarily share with us via email or web forms.",
      "Technical data: device type, operating system, and browser version for website optimization purposes.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "To respond to enquiries, proposals, and support requests submitted through our website or email.",
      "To deliver, maintain, and improve our software development and AI services.",
      "To send service-related communications such as project updates, proposals, and invoices.",
      "To analyze website traffic and improve the user experience on davns.com.",
      "To comply with legal obligations and prevent fraudulent or unauthorized activity.",
    ],
  },
  {
    title: "3. Legal Basis for Processing",
    content: [
      "Contractual necessity: processing required to deliver services you have engaged us for.",
      "Legitimate interests: analyzing website usage and improving our services.",
      "Consent: where you have explicitly opted in to receive marketing communications.",
      "Legal compliance: where processing is required to fulfill legal or regulatory obligations.",
    ],
  },
  {
    title: "4. Data Sharing & Third-Party Services",
    content: [
      "We do not sell, trade, or rent your personal information to third parties.",
      "We may share data with trusted service providers (e.g., email platforms, hosting services, analytics tools) who act as data processors under our instructions.",
      "Third-party tools we may use include: Vercel (hosting), EmailJS (contact form), Google Analytics (website analytics), and Vercel Speed Insights.",
      "All service providers are contractually required to handle your data securely and only for the stated purpose.",
    ],
  },
  {
    title: "5. Data Retention",
    content: [
      "We retain contact form submissions and enquiry data for up to 2 years from the date of last communication.",
      "Client project data is retained for as long as the professional relationship is active and up to 5 years after project completion for audit purposes.",
      "You may request deletion of your personal data at any time by contacting us at davnsindustries@gmail.com.",
    ],
  },
  {
    title: "6. Data Security",
    content: [
      "We implement industry-standard security measures including HTTPS encryption for all data transmissions.",
      "Access to personal data is restricted to authorized DAVNS team members on a need-to-know basis.",
      "We regularly review our security practices and update them to address new threats.",
      "While we take appropriate precautions, no internet transmission can be guaranteed 100% secure.",
    ],
  },
  {
    title: "7. Your Rights",
    content: [
      "Access: you have the right to request a copy of the personal data we hold about you.",
      "Correction: you can request correction of any inaccurate or incomplete data.",
      "Deletion: you can request deletion of your personal data, subject to legal retention requirements.",
      "Portability: you can request your data in a structured, machine-readable format.",
      "Objection: you can object to certain types of processing, including direct marketing.",
      "To exercise any of these rights, contact us at davnsindustries@gmail.com.",
    ],
  },
  {
    title: "8. Cookies",
    content: [
      "Our website may use essential cookies to ensure proper functionality.",
      "Analytics cookies (where enabled) help us understand how visitors use our site.",
      "We do not use third-party advertising or tracking cookies.",
      "You can disable cookies in your browser settings; some website features may be affected.",
    ],
  },
  {
    title: "9. Children's Privacy",
    content: [
      "Our website and services are not directed to individuals under the age of 16.",
      "We do not knowingly collect personal data from children.",
      "If you believe we have inadvertently collected data from a minor, please contact us immediately.",
    ],
  },
  {
    title: "10. Policy Updates",
    content: [
      "This Privacy Policy may be updated to reflect changes in our practices or applicable law.",
      "Material changes will be communicated via a notice on our website.",
      "The date at the bottom of this policy indicates when it was last updated.",
      "Continued use of our website after updates constitutes acceptance of the revised policy.",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black">
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <AuroraBackground colorStops={["#1e293b", "#334155", "#1e293b"]} amplitude={0.7} blend={0.4} speed={0.5} />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />
          <div className="pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4 md:px-6">

              {/* Header */}
              <section className="mb-14">
                <div className="inline-flex items-center gap-2 text-white/50 text-xs font-medium tracking-widest uppercase mb-6">
                  <div className="w-6 h-px bg-white/30" />
                  Legal
                  <div className="w-6 h-px bg-white/30" />
                </div>
                <h1 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">
                  Privacy <span className="font-semibold italic bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Policy</span>
                </h1>
                <div className="h-px w-16 bg-gradient-to-r from-white/60 to-transparent mb-6" />
                <p className="text-lg text-white/70 leading-relaxed mb-3">
                  This Privacy Policy describes how DAVNS Industries (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) collects, uses, and protects personal information when you use our website (davns.com) or engage with our services.
                </p>
                <p className="text-sm text-white/40">
                  Last updated: January 1, 2024 &nbsp;·&nbsp; Effective date: January 1, 2024
                </p>
              </section>

              {/* Sections */}
              <div className="space-y-10">
                {sections.map((section) => (
                  <section key={section.title} className="border border-white/[0.07] rounded-xl p-7 bg-white/[0.02]">
                    <h2 className="text-xl font-semibold text-white mb-4">{section.title}</h2>
                    <ul className="space-y-2.5">
                      {section.content.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/65 text-sm leading-relaxed">
                          <span className="w-1 h-1 rounded-full bg-white/30 mt-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>

              {/* Contact */}
              <section className="mt-10 border border-white/15 rounded-xl p-7 bg-white/[0.03]">
                <h2 className="text-xl font-semibold text-white mb-3">Contact Us Regarding This Policy</h2>
                <p className="text-white/65 text-sm leading-relaxed mb-3">
                  For any privacy-related questions, data subject requests, or concerns, please contact our data team:
                </p>
                <a
                  href="mailto:davnsindustries@gmail.com"
                  className="text-white font-medium hover:text-white/80 transition-colors text-sm"
                >
                  davnsindustries@gmail.com
                </a>
                <p className="text-white/40 text-xs mt-3">DAVNS Industries · India · We aim to respond to all privacy requests within 5 business days.</p>
              </section>

            </div>
          </div>
          <Footer />
        </div>
      </main>
    </div>
  )
}
