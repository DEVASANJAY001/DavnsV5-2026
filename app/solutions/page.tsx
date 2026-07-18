import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { AuroraBackground } from "@/components/aurora-background"
import dynamic from "next/dynamic"
import { FAQSection } from "@/components/faq-section"
import { CTABanner } from "@/components/cta-banner"
import type { Metadata } from "next"
import { Factory, Car, ShoppingCart, HeartPulse, Truck, Building2, TrendingUp, Clock, Users, DollarSign } from "lucide-react"

// Lazy-load heavy animated AI agent demo section
const AITeamSection = dynamic(
  () => import("@/components/ai-team-section").then((m) => ({ default: m.AITeamSection })),
  { loading: () => <div className="min-h-[400px] flex items-center justify-center"><div className="w-8 h-8 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" /></div> }
)


export const metadata: Metadata = {
  title: "AI-Powered Business Solutions for Every Industry | DAVNS Industries",
  description:
    "DAVNS Industries engineers custom AI solutions for manufacturing, automotive, retail, healthcare, and logistics sectors — including 24/7 autonomous agents, predictive analytics, and intelligent workflow automation.",
  keywords: [
    "AI solutions for manufacturing",
    "automotive AI platform",
    "AI for retail automation",
    "healthcare AI systems",
    "logistics AI optimization",
    "enterprise AI solutions India",
    "custom AI agents",
    "24/7 AI customer support",
    "predictive analytics solutions",
    "DAVNS Industries AI",
  ],
  alternates: { canonical: "https://davns.com/solutions" },
  openGraph: {
    title: "Industry-Specific AI Solutions | DAVNS Industries",
    description: "Custom AI solutions for manufacturing, automotive, retail, healthcare, and logistics — engineered for real-world impact.",
    url: "https://davns.com/solutions",
  },
}

const solutionSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AI Solutions by Industry | DAVNS Industries",
  url: "https://davns.com/solutions",
  description: "Custom AI solutions for manufacturing, automotive, retail, healthcare, and logistics sectors.",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://davns.com" },
      { "@type": "ListItem", position: 2, name: "Solutions", item: "https://davns.com/solutions" },
    ],
  },
}

const industries = [
  {
    icon: Factory,
    title: "Manufacturing",
    challenge: "Manual quality control, equipment downtime, slow defect detection.",
    solution: "Computer vision inspection systems, predictive maintenance alerts, and real-time production dashboards.",
    result: "40% faster defect detection, 30% reduction in downtime.",
  },
  {
    icon: Car,
    title: "Automotive Dealerships",
    challenge: "Slow lead response, missed follow-ups, inefficient customer service.",
    solution: "AI sales agents that qualify leads, book test drives, and respond to inquiries 24/7 on WhatsApp and web.",
    result: "3× faster lead response, 50% reduction in lost leads.",
  },
  {
    icon: ShoppingCart,
    title: "Retail & E-Commerce",
    challenge: "High cart abandonment, manual inventory tracking, poor customer personalization.",
    solution: "AI recommendation engines, automated inventory alerts, and intelligent chat support agents.",
    result: "25% increase in conversion rate, 60% reduction in support tickets.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    challenge: "Appointment scheduling overhead, patient data management, slow diagnostic workflows.",
    solution: "Automated appointment booking agents, AI-assisted medical document parsing, and patient portal dashboards.",
    result: "70% reduction in scheduling time, improved patient experience.",
  },
  {
    icon: Truck,
    title: "Logistics & Supply Chain",
    challenge: "Shipment delays, manual route planning, poor inventory visibility.",
    solution: "AI-driven route optimization, real-time GPS tracking dashboards, and automated ETA notifications.",
    result: "20% fuel cost reduction, 35% improvement in delivery accuracy.",
  },
  {
    icon: Building2,
    title: "Professional Services",
    challenge: "Repetitive administrative tasks, slow document processing, client communication overhead.",
    solution: "Intelligent document automation, AI-powered client portals, and automated reporting systems.",
    result: "50% reduction in admin workload, faster client onboarding.",
  },
]

const roi = [
  { icon: TrendingUp, label: "Avg. Efficiency Gain", value: "60%", note: "Across all deployments" },
  { icon: Clock, label: "Time to First Results", value: "4–8 wks", note: "From project kick-off" },
  { icon: Users, label: "Clients Served", value: "6+", note: "Across multiple industries" },
  { icon: DollarSign, label: "Cost Savings Delivered", value: "∞", note: "Compounding over time" },
]

const solutionFAQs = [
  {
    question: "Do your AI solutions work for small businesses, not just enterprises?",
    answer: "Yes. We build right-sized solutions for businesses of all scales — from a single AI agent for a small dealership to full enterprise automation platforms for multi-location manufacturers. We scope the solution to your budget and needs.",
  },
  {
    question: "How does your AI understand our specific industry and workflows?",
    answer: "We start every project with a discovery phase where our team deeply studies your industry, processes, and pain points. We train or fine-tune our AI models on your specific data, ensuring the output is relevant and accurate for your use case.",
  },
  {
    question: "What if our team has no technical experience?",
    answer: "That's completely fine. We design every system for non-technical end users. We provide intuitive dashboards, training sessions, and documentation — so your team can operate the AI tools without needing any coding knowledge.",
  },
  {
    question: "How do your AI agents handle edge cases or unknown queries?",
    answer: "Our AI agents are designed with graceful fallback mechanisms. When confidence is below a threshold, the system escalates to a human operator and logs the interaction for model improvement. Over time, the system learns and handles more edge cases autonomously.",
  },
  {
    question: "Is our business data secure when using your AI systems?",
    answer: "Absolutely. We follow industry-standard security practices including end-to-end encryption, role-based access control, and data isolation. We never use client data to train models for other clients. We can also deploy on-premise if data residency is a concern.",
  },
]

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(solutionSchema) }}
      />
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <AuroraBackground colorStops={["#1e293b", "#334155", "#1e293b"]} amplitude={0.9} blend={0.5} speed={0.7} />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />
          <div className="pt-36 pb-0">

            {/* Hero Header */}
            <div className="max-w-4xl mx-auto px-4 md:px-6 text-center mb-16">
              <div className="inline-flex items-center gap-2 text-white/50 text-xs font-medium tracking-widest uppercase mb-6">
                <div className="w-6 h-px bg-white/30" />
                Industry Solutions
                <div className="w-6 h-px bg-white/30" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight text-balance leading-tight">
                Intelligent{" "}
                <span className="font-semibold italic bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Enterprise Solutions
                </span>
              </h1>
              <div className="h-px w-20 bg-gradient-to-r from-white/60 to-transparent mx-auto mb-8" />
              <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light mb-4">
                We design and deploy custom autonomous AI agents, computer vision systems, and intelligent automation platforms — tailored to the specific demands of your industry.
              </p>
              <p className="text-base text-white/55 max-w-2xl mx-auto leading-relaxed">
                Our solutions integrate seamlessly with your existing CRMs, ERPs, and databases — letting your team offload repetitive workflows and focus on high-value operations.
              </p>
            </div>

            {/* AI Agent Demo Section (existing) */}
            <AITeamSection />

            {/* ROI Stats */}
            <section className="py-14 px-4 md:px-6 border-y border-white/[0.06]">
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  {roi.map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.label}>
                        <Icon className="w-5 h-5 text-white/40 mx-auto mb-2" />
                        <div className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tight">{item.value}</div>
                        <div className="text-sm text-white font-medium mb-1">{item.label}</div>
                        <div className="text-xs text-white/40">{item.note}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>

            {/* Industry Cards */}
            <section className="py-20 md:py-28 px-4 md:px-6">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-14">
                  <div className="inline-flex items-center gap-2 text-white/50 text-xs font-medium tracking-widest uppercase mb-4">
                    <div className="w-6 h-px bg-white/30" />
                    By Industry
                    <div className="w-6 h-px bg-white/30" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">
                    Solutions built for your <span className="font-semibold italic">sector</span>
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {industries.map((industry) => {
                    const Icon = industry.icon
                    return (
                      <div
                        key={industry.title}
                        className="group border border-white/10 rounded-2xl p-6 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-white/80" />
                          </div>
                          <h3 className="text-white font-semibold">{industry.title}</h3>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div>
                            <p className="text-xs text-white/40 uppercase tracking-widest font-medium mb-1">Challenge</p>
                            <p className="text-white/60 text-sm leading-relaxed">{industry.challenge}</p>
                          </div>
                          <div>
                            <p className="text-xs text-white/40 uppercase tracking-widest font-medium mb-1">Our Solution</p>
                            <p className="text-white/60 text-sm leading-relaxed">{industry.solution}</p>
                          </div>
                        </div>

                        <div className="border-t border-white/[0.06] pt-3">
                          <p className="text-xs text-white/40 uppercase tracking-widest font-medium mb-1">Result</p>
                          <p className="text-white/70 text-sm font-medium">{industry.result}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>

            {/* FAQ */}
            <FAQSection
              faqs={solutionFAQs}
              title="AI Solutions FAQ"
              subtitle="Common questions about our approach, AI capabilities, and how we deliver results."
            />

            {/* CTA */}
            <CTABanner
              title="Which industry challenge can we solve for you?"
              description="Let's discuss your specific use case and design an AI solution with measurable ROI."
              primaryLabel="Book a Discovery Call"
              primaryHref="/get-started"
              secondaryLabel="See Our Process"
              secondaryHref="/services"
            />
          </div>
          <Footer />
        </div>
      </main>
    </div>
  )
}
