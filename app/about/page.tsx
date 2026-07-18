import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { AuroraBackground } from "@/components/aurora-background"
import { CTABanner } from "@/components/cta-banner"
import type { Metadata } from "next"
import { Brain, Target, Users, TrendingUp, ShieldCheck, Zap, Globe, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "About DAVNS Industries | AI Company Story, Mission & Team",
  description:
    "Learn how DAVNS Industries was founded to build intelligent AI automation systems. Discover our mission, values, technology approach, and the team driving real-world innovation.",
  keywords: [
    "about DAVNS Industries",
    "AI company India",
    "AI startup story",
    "machine learning company team",
    "AI automation mission",
    "DAVNS Industries history",
    "intelligent software development team",
    "technology company values",
  ],
  alternates: { canonical: "https://davns.com/about" },
  openGraph: {
    title: "About DAVNS Industries | Our Story & Mission",
    description: "From a research-driven idea to a full-stack AI company — learn how DAVNS Industries builds intelligent systems that matter.",
    url: "https://davns.com/about",
  },
}

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About DAVNS Industries",
  url: "https://davns.com/about",
  description: "The story, mission, and values of DAVNS Industries — an AI-driven software development company.",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://davns.com" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://davns.com/about" },
    ],
  },
}

const values = [
  {
    icon: Brain,
    title: "Research-First",
    description: "Every solution begins with deep research. We study your industry, workflows, and user behavior before writing a single line of code.",
  },
  {
    icon: Target,
    title: "Outcome-Driven",
    description: "We measure success by the measurable impact we deliver — reduced costs, faster processes, and better user experiences.",
  },
  {
    icon: ShieldCheck,
    title: "Engineering Integrity",
    description: "We maintain the highest code quality standards. Every system we build is documented, tested, and built to last.",
  },
  {
    icon: Zap,
    title: "Rapid Innovation",
    description: "We move fast without cutting corners. Our agile teams ship production-ready features in tight sprints with continuous feedback loops.",
  },
  {
    icon: Users,
    title: "Client Partnership",
    description: "We don't disappear after launch. We build long-term relationships with transparent communication throughout every engagement.",
  },
  {
    icon: Globe,
    title: "Global Thinking",
    description: "Built in India, designed for the world. Our platforms are architected for international scale from day one.",
  },
]

const milestones = [
  { year: "2025", event: "DAVNS Industries founded on February 14 in Chennai, India — core team assembled, initial AI research and development phase launched." },
  { year: "2025", event: "Acquired first automotive enterprise clients. Deployed custom 24/7 conversational sales platforms." },
  { year: "2025", event: "Expanded services to computer vision inspection and custom dashboard analytics systems." },
  { year: "2026", event: "Scaled global reach, delivering intelligent workflow automation systems to clients globally." },
]

const techStack = [
  "React / Next.js", "Python / FastAPI", "TensorFlow / PyTorch",
  "Node.js", "PostgreSQL", "AWS / GCP", "Docker / Kubernetes",
  "OpenAI APIs", "LangChain", "Computer Vision",
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <AuroraBackground colorStops={["#1e293b", "#334155", "#1e293b"]} amplitude={0.8} blend={0.5} speed={0.6} />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />
          <div className="pt-32 pb-0">

            {/* ─── Hero ─────────────────────────────── */}
            <section className="max-w-5xl mx-auto px-4 md:px-6 mb-20">
              <div className="inline-flex items-center gap-2 text-white/50 text-xs font-medium tracking-widest uppercase mb-6">
                <div className="w-6 h-px bg-white/30" />
                Our Story
                <div className="w-6 h-px bg-white/30" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight leading-tight text-balance">
                Building intelligent systems<br />
                <span className="font-semibold italic bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  that actually work
                </span>
              </h1>
              <div className="h-px w-20 bg-gradient-to-r from-white/60 to-transparent mb-8" />
              <div className="grid md:grid-cols-2 gap-8">
                <p className="text-lg text-white/70 leading-relaxed">
                  DAVNS Industries was born from a simple but urgent observation: most enterprise software is overcomplicated, underperforming, and built without truly understanding the end user. We set out to change that.
                </p>
                <p className="text-lg text-white/70 leading-relaxed">
                  Founded on February 14, 2025 in Chennai, India, we are an AI-driven technology company specializing in intelligent automation platforms, computer vision systems, conversational AI agents, and custom enterprise software — built from first principles.
                </p>
              </div>
            </section>

            {/* ─── Stats Bar ────────────────────────── */}
            <section className="border-y border-white/[0.06] py-12 mb-20">
              <div className="max-w-5xl mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  {[
                    { value: "2025", label: "Founded" },
                    { value: "15+", label: "Projects Delivered" },
                    { value: "6+", label: "Clients Worldwide" },
                    { value: "3+", label: "Countries Served" },
                  ].map((stat) => (

                    <div key={stat.label}>
                      <div className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tight">{stat.value}</div>
                      <div className="text-sm text-white/50">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ─── Mission & Vision ─────────────────── */}
            <section className="max-w-5xl mx-auto px-4 md:px-6 mb-20">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 overflow-hidden">
                  <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-white/20 rounded-tl-2xl" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <Target className="w-4 h-4 text-white/80" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">Our Mission</h2>
                  </div>
                  <p className="text-white/60 leading-relaxed text-base">
                    To engineer intelligent systems that eliminate operational bottlenecks, unlock hidden efficiencies, and give businesses the technological edge they need to compete in a fast-changing world.
                  </p>
                </div>
                <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 overflow-hidden">
                  <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-white/20 rounded-tr-2xl" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-white/80" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">Our Vision</h2>
                  </div>
                  <p className="text-white/60 leading-relaxed text-base">
                    To become the most trusted AI engineering partner for forward-thinking enterprises globally — recognized not for size, but for the depth of impact our solutions create.
                  </p>
                </div>
              </div>
            </section>

            {/* ─── Values ──────────────────────────── */}
            <section className="max-w-5xl mx-auto px-4 md:px-6 mb-20">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 text-white/50 text-xs font-medium tracking-widest uppercase mb-4">
                  <div className="w-6 h-px bg-white/30" />
                  What We Stand For
                  <div className="w-6 h-px bg-white/30" />
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">
                  Our core <span className="font-semibold italic">values</span>
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {values.map((v) => {
                  const Icon = v.icon
                  return (
                    <div
                      key={v.title}
                      className="group border border-white/10 rounded-xl p-6 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center mb-4 group-hover:bg-white/15 transition-colors">
                        <Icon className="w-4 h-4 text-white/80" />
                      </div>
                      <h3 className="text-white font-semibold mb-2">{v.title}</h3>
                      <p className="text-white/55 text-sm leading-relaxed">{v.description}</p>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* ─── Timeline ────────────────────────── */}
            <section className="max-w-5xl mx-auto px-4 md:px-6 mb-20">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 text-white/50 text-xs font-medium tracking-widest uppercase mb-4">
                  <div className="w-6 h-px bg-white/30" />
                  Company Timeline
                  <div className="w-6 h-px bg-white/30" />
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">
                  Our <span className="font-semibold italic">journey</span> so far
                </h2>
              </div>
              <div className="relative">
                <div className="absolute left-14 top-0 bottom-0 w-px bg-white/10 hidden md:block" />
                <div className="space-y-6">
                  {milestones.map((m, i) => (
                    <div key={i} className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-28 text-right hidden md:block">
                        <span className="text-sm font-mono text-white/40">{m.year}</span>
                      </div>
                      <div className="relative hidden md:flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-white/30 border border-white/50 relative z-10" />
                      </div>
                      <div className="flex-1 border border-white/10 rounded-xl p-5 bg-white/[0.02]">
                        <span className="text-xs text-white/40 font-mono md:hidden">{m.year}</span>
                        <p className="text-white/70 text-base leading-relaxed">{m.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ─── Tech Stack ──────────────────────── */}
            <section className="max-w-5xl mx-auto px-4 md:px-6 mb-20">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 text-white/50 text-xs font-medium tracking-widest uppercase mb-4">
                  <div className="w-6 h-px bg-white/30" />
                  Technology
                  <div className="w-6 h-px bg-white/30" />
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">
                  The stack we <span className="font-semibold italic">master</span>
                </h2>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-white/60 text-sm font-medium hover:border-white/25 hover:text-white/80 transition-all duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* ─── What We Do ─────────────────────── */}
            <section className="max-w-5xl mx-auto px-4 md:px-6 mb-20">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 text-white/50 text-xs font-medium tracking-widest uppercase mb-6">
                    <div className="w-6 h-px bg-white/30" />
                    What We Do
                  </div>
                  <h2 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-tight">
                    End-to-end <span className="font-semibold italic">AI engineering</span>
                  </h2>
                  <p className="text-white/60 leading-relaxed text-base mb-6">
                    We handle the full lifecycle — from research and system design to development, deployment, and long-term support. Our teams are embedded with your team until the solution delivers real results.
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    "AI-powered automation platforms",
                    "Computer vision & quality inspection systems",
                    "Conversational AI agents (chatbots, voice assistants)",
                    "Custom enterprise dashboards & analytics",
                    "Industrial IoT & real-time monitoring systems",
                    "Mobile & web application development",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 border border-white/10 rounded-lg px-4 py-3 bg-white/[0.02]">
                      <Award className="w-4 h-4 text-white/50 mt-0.5 flex-shrink-0" />
                      <span className="text-white/70 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ─── CTA ─────────────────────────────── */}
            <CTABanner
              title="Ready to work with us?"
              description="Let's discuss how we can build intelligent solutions tailored for your business challenges."
              primaryLabel="Start a Project"
              primaryHref="/get-started"
              secondaryLabel="View Our Work"
              secondaryHref="/projects"
            />
          </div>
          <Footer />
        </div>
      </main>
    </div>
  )
}
