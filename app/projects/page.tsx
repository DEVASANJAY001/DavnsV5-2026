import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { AuroraBackground } from "@/components/aurora-background"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ClientsProductsSection } from "@/components/clients-products-section"
import { CTABanner } from "@/components/cta-banner"
import type { Metadata } from "next"
import { ArrowUpRight, Factory, Car, BarChart3, Bot } from "lucide-react"

export const metadata: Metadata = {
  title: "Projects, Case Studies & Products | DAVNS Industries",
  description:
    "Explore DAVNS Industries' project portfolio — real-world AI implementations, industrial automation case studies, and our proprietary product catalog including the Split billing platform.",
  keywords: [
    "DAVNS Industries projects",
    "AI case studies India",
    "industrial AI implementation examples",
    "enterprise software portfolio",
    "AI automation results",
    "machine learning project examples",
    "computer vision case study",
    "Split billing platform",
    "automotive AI project",
    "custom software portfolio",
  ],
  alternates: { canonical: "https://davns.com/projects" },
  openGraph: {
    title: "Projects & Case Studies | DAVNS Industries",
    description: "Real-world AI implementations, industrial case studies, and proprietary products from DAVNS Industries.",
    url: "https://davns.com/projects",
  },
}

const projectsSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "DAVNS Industries Projects & Case Studies",
  url: "https://davns.com/projects",
  description: "Portfolio of AI implementations and enterprise software projects delivered by DAVNS Industries.",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://davns.com" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "https://davns.com/projects" },
    ],
  },
}

const caseStudies = [
  {
    icon: Factory,
    category: "Manufacturing · Computer Vision",
    title: "Industrial AI Quality Inspection System",
    description:
      "Deployed a real-time computer vision inspection system on a production line to automatically detect defects in components with 97%+ accuracy — replacing a manual QC team of 5.",
    metrics: [
      { label: "Defect Detection Accuracy", value: "97.3%" },
      { label: "Inspection Speed", value: "4× Faster" },
      { label: "QC Cost Reduction", value: "62%" },
    ],
    tags: ["Computer Vision", "TensorFlow", "Edge AI", "Real-time"],
  },
  {
    icon: Car,
    category: "Automotive · Conversational AI",
    title: "Dealership AI Sales & Lead Qualification Agent",
    description:
      "Built a 24/7 AI agent that handles incoming WhatsApp and web inquiries for a multi-location car dealership — qualifying leads, booking test drives, and syncing data to the CRM automatically.",
    metrics: [
      { label: "Lead Response Time", value: "< 30 sec" },
      { label: "Leads Converted", value: "3× More" },
      { label: "Staff Hours Saved / Month", value: "120+ hrs" },
    ],
    tags: ["WhatsApp AI", "CRM Integration", "NLP", "Next.js"],
  },
  {
    icon: BarChart3,
    category: "Retail · Business Intelligence",
    title: "Real-time Sales & Inventory Analytics Dashboard",
    description:
      "Designed and built a unified business intelligence platform that aggregates sales, inventory, and customer data across 8 retail locations — with predictive restock alerts and revenue forecasting.",
    metrics: [
      { label: "Data Sources Connected", value: "8 Stores" },
      { label: "Reporting Time Saved", value: "15 hrs/wk" },
      { label: "Forecast Accuracy", value: "89%" },
    ],
    tags: ["Analytics", "React", "PostgreSQL", "Predictive AI"],
  },
  {
    icon: Bot,
    category: "Professional Services · Automation",
    title: "Intelligent Document Processing & Workflow Automation",
    description:
      "Automated the document intake, parsing, and routing workflow for a professional services firm — using AI to extract data from forms, contracts, and invoices and update their internal system automatically.",
    metrics: [
      { label: "Processing Time Reduction", value: "75%" },
      { label: "Accuracy Rate", value: "99.1%" },
      { label: "Documents Processed / Mo", value: "2,000+" },
    ],
    tags: ["Document AI", "OCR", "Python", "FastAPI"],
  },
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
      />
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <AuroraBackground colorStops={["#1e293b", "#334155", "#1e293b"]} amplitude={0.9} blend={0.5} speed={0.7} />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />
          <div className="pt-36 pb-0">

            {/* SEO Header */}
            <div className="max-w-4xl mx-auto px-4 md:px-6 text-center mb-16">
              <div className="inline-flex items-center gap-2 text-white/50 text-xs font-medium tracking-widest uppercase mb-6">
                <div className="w-6 h-px bg-white/30" />
                Our Work
                <div className="w-6 h-px bg-white/30" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight text-balance leading-tight">
                Projects &{" "}
                <span className="font-semibold italic bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Case Studies
                </span>
              </h1>
              <div className="h-px w-20 bg-gradient-to-r from-white/60 to-transparent mx-auto mb-8" />
              <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light mb-4">
                From manufacturing automation to automotive AI agents — here&apos;s how we&apos;ve built intelligent systems that delivered measurable results for real businesses.
              </p>
              <p className="text-base text-white/55 max-w-2xl mx-auto leading-relaxed">
                Every project below started with a real problem. We&apos;ll show you the challenge, our solution, and the numbers that followed.
              </p>
            </div>

            {/* Case Study Cards */}
            <section className="py-4 md:py-12 px-4 md:px-6">
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6">
                  {caseStudies.map((study) => {
                    const Icon = study.icon
                    return (
                      <article
                        key={study.title}
                        className="group border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300"
                      >
                        <div className="p-7">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center">
                                <Icon className="w-4 h-4 text-white/80" />
                              </div>
                              <span className="text-xs text-white/40 font-medium">{study.category}</span>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
                          </div>

                          <h2 className="text-xl font-semibold text-white mb-3 leading-snug">{study.title}</h2>
                          <p className="text-white/60 text-sm leading-relaxed mb-6">{study.description}</p>

                          {/* Metrics */}
                          <div className="grid grid-cols-3 gap-3 mb-5">
                            {study.metrics.map((m) => (
                              <div key={m.label} className="text-center bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
                                <div className="text-xl font-bold text-white mb-0.5">{m.value}</div>
                                <div className="text-[10px] text-white/40 leading-tight">{m.label}</div>
                              </div>
                            ))}
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {study.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/50"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </div>
            </section>

            {/* Clients + Products section (existing) */}
            <ClientsProductsSection />

            {/* Testimonials (existing) */}
            <TestimonialsSection />

            {/* CTA */}
            <CTABanner
              title="Want to see what we can build for you?"
              description="Every great project starts with a conversation. Let's talk about your challenges."
              primaryLabel="Start Your Project"
              primaryHref="/get-started"
              secondaryLabel="View Services"
              secondaryHref="/services"
            />
          </div>
          <Footer />
        </div>
      </main>
    </div>
  )
}
