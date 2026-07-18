import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { AuroraBackground } from "@/components/aurora-background"
import dynamic from "next/dynamic"
import { FAQSection } from "@/components/faq-section"
import { ProcessSection } from "@/components/process-section"
import { CTABanner } from "@/components/cta-banner"
import type { Metadata } from "next"
import { Bot, Eye, BarChart3, Smartphone, Cpu, MessageSquare } from "lucide-react"

// Lazy-load the heavy animated FeaturesSection so the page shell renders instantly
const FeaturesSection = dynamic(
  () => import("@/components/features-section").then((m) => ({ default: m.FeaturesSection })),
  {
    loading: () => (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" />
      </div>
    ),
  }
)

export const metadata: Metadata = {
  title: "AI & Custom Software Development Services | DAVNS Industries",
  description:
    "DAVNS Industries offers AI automation, computer vision, conversational AI agents, custom enterprise software, analytics dashboards, and mobile app development services for businesses across India and globally.",
  keywords: [
    "AI consulting services India",
    "custom software development company",
    "workflow automation platform",
    "industrial computer vision inspection",
    "AI chatbot development company",
    "enterprise analytics dashboard",
    "business intelligence software",
    "mobile app development India",
    "machine learning integration",
    "DAVNS Industries services",
  ],
  alternates: { canonical: "https://davns.com/services" },
  openGraph: {
    title: "AI & Custom Software Services | DAVNS Industries",
    description: "End-to-end AI automation, computer vision, conversational AI, and enterprise software development.",
    url: "https://davns.com/services",
  },
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI & Enterprise Software Development",
  provider: {
    "@type": "Organization",
    name: "DAVNS Industries",
    url: "https://davns.com",
  },
  description: "Custom AI automation, computer vision, conversational AI agents, and enterprise software development services.",
  areaServed: ["IN", "US", "GB", "AU"],
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://davns.com" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://davns.com/services" },
    ],
  },
}

const serviceFAQs = [
  {
    question: "What types of businesses does DAVNS Industries work with?",
    answer: "We work with SMEs, mid-market enterprises, and fast-scaling startups across manufacturing, automotive, retail, healthcare, and logistics sectors. Our solutions are tailored to each client's specific workflow and technical environment.",
  },
  {
    question: "How long does a typical AI automation project take?",
    answer: "Most projects range from 4 to 16 weeks depending on complexity. A focused automation module (e.g., an AI scheduling agent) can be delivered in 4–6 weeks. A full enterprise platform with multiple integrations typically takes 10–16 weeks.",
  },
  {
    question: "Do you integrate with existing software like CRMs and ERPs?",
    answer: "Yes. We specialize in seamless integrations with popular CRMs (Salesforce, HubSpot, Zoho), ERPs (SAP, Odoo), and custom databases. Our API-first architecture ensures your new AI system works alongside existing tools without disruption.",
  },
  {
    question: "Can you build mobile apps alongside the web platform?",
    answer: "Absolutely. We develop cross-platform mobile applications using React Native that are fully synchronized with the backend systems we build — so your team has access to intelligent tools whether on desktop or mobile.",
  },
  {
    question: "Do you provide post-launch support and maintenance?",
    answer: "Yes. Every project includes a handover period with documentation, training, and support. We also offer ongoing maintenance retainers to keep your systems optimized, secure, and updated as your business evolves.",
  },
  {
    question: "What makes DAVNS different from a typical software agency?",
    answer: "We are an AI-first engineering company, not a traditional dev shop. We begin every engagement with research and system design — not immediately coding. This means fewer rework cycles, more strategic solutions, and measurable outcomes.",
  },
]

const serviceCards = [
  {
    icon: Bot,
    title: "AI Automation & Workflow Intelligence",
    description: "We automate repetitive business processes using custom-trained AI models — from document processing and data extraction to intelligent scheduling and predictive task routing. Free your team for high-value work.",
    deliverables: ["Process automation pipelines", "Intelligent form parsing", "Predictive routing systems", "Email & task automation agents"],
  },
  {
    icon: Eye,
    title: "Computer Vision & Quality Inspection",
    description: "We deploy real-time image and video analysis systems for industrial quality control, defect detection, object recognition, and safety compliance monitoring on factory floors and production lines.",
    deliverables: ["Defect detection models", "Visual quality grading", "Object counting & tracking", "Safety compliance monitoring"],
  },
  {
    icon: MessageSquare,
    title: "Conversational AI Agents",
    description: "We build 24/7 AI-powered chat and voice agents that handle customer inquiries, lead qualification, appointment booking, and support tickets — with human-level natural language understanding.",
    deliverables: ["WhatsApp & SMS chatbots", "Website live-chat agents", "Voice assistant integration", "CRM-connected lead scoring"],
  },
  {
    icon: BarChart3,
    title: "Enterprise Analytics & Dashboards",
    description: "We design and build real-time business intelligence dashboards that surface the metrics that matter — from operational KPIs to predictive sales forecasting, all in one unified view.",
    deliverables: ["Custom BI dashboards", "Real-time KPI tracking", "Predictive analytics models", "Data pipeline engineering"],
  },
  {
    icon: Smartphone,
    title: "Mobile & Web Application Development",
    description: "We engineer high-performance web platforms and cross-platform mobile applications using Next.js, React, and React Native — built for speed, SEO, and exceptional user experience.",
    deliverables: ["Next.js web platforms", "React Native mobile apps", "API & backend development", "UI/UX design & prototyping"],
  },
  {
    icon: Cpu,
    title: "Industrial IoT & Real-time Systems",
    description: "We connect physical hardware to intelligent cloud systems — enabling remote monitoring, predictive maintenance, automated alerts, and data-driven operational decisions in industrial environments.",
    deliverables: ["IoT sensor integration", "Real-time telemetry dashboards", "Predictive maintenance alerts", "Edge AI deployment"],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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
                What We Build
                <div className="w-6 h-px bg-white/30" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight text-balance leading-tight">
                Our{" "}
                <span className="font-semibold italic bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Capabilities
                </span>{" "}
                &{" "}
                <span className="font-semibold italic bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Services
                </span>
              </h1>
              <div className="h-px w-20 bg-gradient-to-r from-white/60 to-transparent mx-auto mb-8" />
              <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light mb-6">
                DAVNS Industries builds industrial-grade AI systems, real-time automated workflows, and high-performance custom applications for modern enterprises.
              </p>
              <p className="text-base text-white/55 max-w-2xl mx-auto leading-relaxed">
                We don&apos;t just write code — we engineer intelligent systems grounded in research, designed for scalability, and optimized for measurable business outcomes.
              </p>
            </div>

            {/* Features Section (existing component) */}
            <FeaturesSection />

            {/* Detailed Service Cards */}
            <section className="py-20 md:py-28 px-4 md:px-6">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-14">
                  <div className="inline-flex items-center gap-2 text-white/50 text-xs font-medium tracking-widest uppercase mb-4">
                    <div className="w-6 h-px bg-white/30" />
                    Service Details
                    <div className="w-6 h-px bg-white/30" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">
                    What&apos;s included in each <span className="font-semibold italic">engagement</span>
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {serviceCards.map((service) => {
                    const Icon = service.icon
                    return (
                      <div
                        key={service.title}
                        className="group border border-white/10 rounded-2xl p-7 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-white/80" />
                          </div>
                          <h3 className="text-lg font-semibold text-white leading-snug">{service.title}</h3>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed mb-5">{service.description}</p>
                        <div className="border-t border-white/[0.06] pt-4">
                          <p className="text-xs text-white/40 font-medium uppercase tracking-widest mb-3">Key Deliverables</p>
                          <div className="grid grid-cols-2 gap-2">
                            {service.deliverables.map((d) => (
                              <div key={d} className="flex items-start gap-2">
                                <span className="w-1 h-1 rounded-full bg-white/30 mt-2 flex-shrink-0" />
                                <span className="text-xs text-white/55">{d}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>

            {/* Process Section */}
            <ProcessSection />

            {/* FAQ Section */}
            <FAQSection
              faqs={serviceFAQs}
              title="Services FAQ"
              subtitle="Common questions about how we work and what to expect."
            />

            {/* CTA */}
            <CTABanner
              title="Ready to transform your operations?"
              description="Book a free discovery call and let's explore what AI can do for your specific business challenges."
              primaryLabel="Get Started"
              primaryHref="/get-started"
              secondaryLabel="View Case Studies"
              secondaryHref="/projects"
            />
          </div>
          <Footer />
        </div>
      </main>
    </div>
  )
}
