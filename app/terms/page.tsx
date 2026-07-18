import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { AuroraBackground } from "@/components/aurora-background"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | DAVNS Industries",
  description:
    "Review DAVNS Industries' Terms of Service governing the use of our website, AI automation services, and software development engagements.",
  alternates: { canonical: "https://davns.com/terms" },
  robots: { index: true, follow: true },
}

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "By accessing davns.com or engaging DAVNS Industries for services, you agree to be bound by these Terms of Service.",
      "If you do not agree to these terms, please discontinue use of our website and services immediately.",
      "These terms apply to all visitors, clients, and prospective clients of DAVNS Industries.",
      "We may update these terms at any time. Continued use of our services constitutes acceptance of any revised terms.",
    ],
  },
  {
    title: "2. Description of Services",
    content: [
      "DAVNS Industries provides AI automation systems, computer vision platforms, conversational AI agents, enterprise software development, analytics dashboards, and mobile application development.",
      "Services are provided under separate written project agreements or statements of work that supplement these terms.",
      "We reserve the right to modify, suspend, or discontinue any service with reasonable notice.",
      "Service availability is subject to technical factors, force majeure events, and planned maintenance windows.",
    ],
  },
  {
    title: "3. Client Obligations",
    content: [
      "Clients must provide accurate, complete, and timely information required for project delivery.",
      "Clients are responsible for providing access to necessary systems, credentials, and documentation as agreed.",
      "Clients must ensure that any third-party data or assets shared with DAVNS Industries are provided with proper authorization.",
      "Clients shall designate a primary point of contact for project communications and approvals.",
    ],
  },
  {
    title: "4. Intellectual Property",
    content: [
      "All proprietary frameworks, tools, libraries, and methodologies developed by DAVNS Industries prior to or independent of any client engagement remain the exclusive intellectual property of DAVNS Industries.",
      "Custom deliverables (code, designs, systems) developed specifically for a client project transfer to the client upon full payment, as specified in the project agreement.",
      "DAVNS Industries retains the right to display project work in its portfolio unless otherwise agreed in writing.",
      "Third-party software, APIs, and open-source components remain subject to their respective licenses.",
    ],
  },
  {
    title: "5. Confidentiality",
    content: [
      "Both parties agree to maintain strict confidentiality of proprietary business information shared during project engagements.",
      "DAVNS Industries will not disclose client data, trade secrets, or technical specifications to unauthorized third parties.",
      "Confidentiality obligations survive the termination of the project agreement for a period of 3 years.",
      "Non-disclosure agreements (NDAs) may be executed separately for projects requiring enhanced confidentiality terms.",
    ],
  },
  {
    title: "6. Payment Terms",
    content: [
      "Payment terms are defined in individual project agreements or invoices issued by DAVNS Industries.",
      "Standard payment schedule: a percentage deposit upon project commencement, with the remainder due upon milestone completion or delivery.",
      "Late payments beyond 30 days may incur interest charges at a rate of 1.5% per month on the outstanding balance.",
      "DAVNS Industries reserves the right to pause project delivery for payments overdue by more than 14 days.",
    ],
  },
  {
    title: "7. Limitation of Liability",
    content: [
      "DAVNS Industries' total liability for any claim arising from a service engagement shall not exceed the total fees paid for that specific project.",
      "We are not liable for indirect, consequential, incidental, or punitive damages arising from the use or inability to use our services.",
      "We are not responsible for delays or failures caused by client-provided information, third-party system outages, or events beyond our reasonable control.",
      "We make no warranties that software will be completely error-free; however, we commit to addressing defects within agreed support terms.",
    ],
  },
  {
    title: "8. Website Use",
    content: [
      "You may browse davns.com for informational purposes. You may not scrape, reproduce, or commercially exploit its content without permission.",
      "You must not use our website in any way that causes damage, disruption, or impairs its availability.",
      "Unauthorized attempts to access restricted areas of our systems are strictly prohibited and may result in legal action.",
      "We reserve the right to restrict access to our website for users who violate these terms.",
    ],
  },
  {
    title: "9. Governing Law & Dispute Resolution",
    content: [
      "These Terms of Service are governed by and construed in accordance with the laws of India.",
      "Any disputes arising from these terms or service engagements shall first be attempted to be resolved through good-faith negotiation.",
      "If negotiation fails, disputes shall be submitted to binding arbitration in accordance with applicable Indian arbitration law.",
      "For matters not resolved through arbitration, the courts of India shall have exclusive jurisdiction.",
    ],
  },
  {
    title: "10. Termination",
    content: [
      "Either party may terminate a service engagement with 30 days' written notice, subject to the terms of the specific project agreement.",
      "DAVNS Industries may terminate access to services immediately if a client violates these terms or fails to remit payment after due notice.",
      "Upon termination, outstanding fees for work completed remain payable. Deliverables completed to date will be provided upon full payment.",
      "Sections relating to intellectual property, confidentiality, and limitation of liability survive termination.",
    ],
  },
]

export default function TermsPage() {
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
                  Terms of{" "}
                  <span className="font-semibold italic bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Service
                  </span>
                </h1>
                <div className="h-px w-16 bg-gradient-to-r from-white/60 to-transparent mb-6" />
                <p className="text-lg text-white/70 leading-relaxed mb-3">
                  These Terms of Service govern your use of davns.com and any engagement with DAVNS Industries for software development, AI automation, and consulting services.
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
                <h2 className="text-xl font-semibold text-white mb-3">Questions About These Terms?</h2>
                <p className="text-white/65 text-sm leading-relaxed mb-3">
                  If you have questions about these Terms of Service or any aspect of our service agreements, please reach out:
                </p>
                <a
                  href="mailto:davnsindustries@gmail.com"
                  className="text-white font-medium hover:text-white/80 transition-colors text-sm"
                >
                  davnsindustries@gmail.com
                </a>
                <p className="text-white/40 text-xs mt-3">DAVNS Industries · India</p>
              </section>

            </div>
          </div>
          <Footer />
        </div>
      </main>
    </div>
  )
}
