import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { HeroSection } from "@/components/hero-section"
import { ProblemSolutionSection } from "@/components/problem-solution-section"
import { AuroraBackground } from "@/components/aurora-background"
import { ProcessSection } from "@/components/process-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

// Lazy-load heavy animated sections below the fold
const FeaturesSection = dynamic(
  () => import("@/components/features-section").then((m) => ({ default: m.FeaturesSection })),
  { loading: () => <div className="min-h-[300px]" /> }
)
const AITeamSection = dynamic(
  () => import("@/components/ai-team-section").then((m) => ({ default: m.AITeamSection })),
  { loading: () => <div className="min-h-[300px]" /> }
)
const TestimonialsSection = dynamic(
  () => import("@/components/testimonials-section").then((m) => ({ default: m.TestimonialsSection })),
  { loading: () => <div className="min-h-[300px]" /> }
)
const ClientsProductsSection = dynamic(
  () => import("@/components/clients-products-section").then((m) => ({ default: m.ClientsProductsSection })),
  { loading: () => <div className="min-h-[200px]" /> }
)


export const metadata: Metadata = {
  title: "DAVNS Industries | AI Automation & Intelligent Platform Development Company",
  description:
    "DAVNS Industries is an AI-driven software company building intelligent automation systems, computer vision platforms, conversational AI agents, and custom enterprise software for businesses in India and globally.",
  keywords: [
    "AI automation company",
    "intelligent platform development",
    "enterprise AI software",
    "custom AI automation India",
    "workflow automation systems",
    "computer vision software",
    "AI chatbot development",
    "business intelligence dashboard",
    "AI startup India 2024",
    "DAVNS Industries",
  ],
  alternates: { canonical: "https://davns.com" },
  openGraph: {
    title: "DAVNS Industries | AI Automation & Intelligent Platform Development",
    description: "We build AI-powered automation systems, intelligent platforms, and enterprise software that solve real business problems.",
    url: "https://davns.com",
  },
}

const homepageFAQs = [
  {
    question: "What does DAVNS Industries do?",
    answer: "DAVNS Industries is an AI-driven technology company that builds intelligent automation systems, computer vision platforms, conversational AI agents, and custom enterprise software. We help businesses eliminate manual workflows, improve efficiency, and make data-driven decisions.",
  },
  {
    question: "What industries do you serve?",
    answer: "We serve businesses across manufacturing, automotive, retail, healthcare, logistics, and professional services. Our AI solutions are adapted to the specific challenges of each sector — from quality inspection on factory floors to lead qualification for car dealerships.",
  },
  {
    question: "How is DAVNS different from a typical software agency?",
    answer: "We are an AI-first engineering company. Every project starts with deep research into your workflows and user needs — not immediately coding. We build long-term solutions with measurable ROI, not one-size-fits-all software.",
  },
  {
    question: "How long does a project take?",
    answer: "Most projects are delivered in 4–12 weeks depending on scope. A focused AI automation module can launch in 4–6 weeks. A full enterprise platform typically takes 10–14 weeks. We work in agile sprints with frequent milestone check-ins.",
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer: "Yes. Every project includes a post-launch support period, full documentation, and team training. We also offer ongoing maintenance and optimization retainers to ensure your systems continue delivering value as your business evolves.",
  },
  {
    question: "Can I see examples of your work?",
    answer: "Yes — visit our Projects page to explore case studies with real metrics from our AI implementations across manufacturing, automotive, retail, and professional services sectors.",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <AuroraBackground colorStops={["#475569", "#64748b", "#475569"]} amplitude={1.2} blend={0.6} speed={0.8} />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />
          <HeroSection />
          <ProblemSolutionSection />
          <FeaturesSection />
          <ProcessSection />
          <AITeamSection />
          <TestimonialsSection />
          <ClientsProductsSection />
          <FAQSection
            faqs={homepageFAQs}
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about working with DAVNS Industries."
          />
          <CTASection />
          <Footer />
        </div>
      </main>
    </div>
  )
}
