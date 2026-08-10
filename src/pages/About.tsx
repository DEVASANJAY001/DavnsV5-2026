import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { DualJourneyBento } from "@/components/dual-journey-bento"
import { Brain, Target, Users, TrendingUp, ShieldCheck, Zap, Globe, Sparkles } from "lucide-react"

const values = [
  {
    icon: Brain,
    title: "Research-First Engineering",
    description: "Every deployment begins with deep operational analysis. We model your workflows and user behavior before architecting code.",
    color: "#EDE9FE",
  },
  {
    icon: Target,
    title: "Measurable ROI & Outcomes",
    description: "We evaluate our deliverables by real business impact — reduced cycle times, eliminated manual overhead, and heightened conversion rates.",
    color: "#FEF08A",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Code Integrity",
    description: "We enforce rigorous software engineering standards. Every pipeline is documented, unit-tested, and built for scalable multi-tenant execution.",
    color: "#FFFFFF",
  },
  {
    icon: Zap,
    title: "Rapid Agile Iteration",
    description: "We move with startup agility without sacrificing reliability. Continuous deployment sprints with real-time client feedback loops.",
    color: "#F8FAFC",
  },
  {
    icon: Users,
    title: "Collaborative Partnership",
    description: "We function as an embedded engineering extension of your team with transparent communication and ongoing maintenance retainers.",
    color: "#EDE9FE",
  },
  {
    icon: Globe,
    title: "Global Scalability",
    description: "Engineered in India, architected for global scale. Our platforms are localized and compliant for operations across IN, US, GB, and AE.",
    color: "#FEF08A",
  },
]

const milestones = [
  {
    year: "2025",
    title: "Inception & Research Lab",
    event: "DAVNS Industries was founded on February 14 in Chennai, India. Core AI researchers assembled to build next-generation automation frameworks.",
  },
  {
    year: "2025",
    title: "Enterprise Automotive Deployments",
    event: "Deployed custom 24/7 conversational sales & lead qualification platforms across major automotive dealerships, achieving 3× lead conversion.",
  },
  {
    year: "2025",
    title: "Computer Vision & Split App Launch",
    event: "Expanded into industrial computer vision defect inspection and launched the Split mobile application on Google Play Store and Web.",
  },
  {
    year: "2026",
    title: "Global Autonomous Expansion",
    event: "Scaled global delivery footprint across India, US, UK, and UAE, delivering multi-agent intelligence and real-time business telemetry.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-purple-500/20 selection:text-purple-900">
      <main className="min-h-screen relative overflow-hidden">
        <GlassmorphismNav />
        
        <div className="pt-36 pb-20">

          {/* Hero Section with Selection Box */}
          <section className="max-w-5xl mx-auto px-4 md:px-6 mb-24 text-center">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1] break-words">
              Engineering{" "}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-[#FACC15] rounded-xl -rotate-1 scale-105" />
                <span className="relative px-2">intelligent systems</span>
              </span>
              <br />
              built for real impact
            </h1>
            
            <p className="text-base md:text-xl text-slate-600 leading-relaxed font-light max-w-3xl mx-auto mb-10">
              DAVNS Industries was established to eliminate operational friction and replace cumbersome legacy software with streamlined autonomous agents and custom-engineered platforms.
            </p>
          </section>

          {/* Telemetry Stats Grid */}
          <section className="border-y border-slate-100 bg-[#F8FAFC] py-14 mb-24">
            <div className="max-w-5xl mx-auto px-4 md:px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { value: "2025", label: "Founded in Chennai" },
                  { value: "15+", label: "Enterprise Projects" },
                  { value: "6+", label: "Clients Globally" },
                  { value: "4", label: "Regions (IN, US, GB, AE)" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-1 tracking-tight font-mono">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-500 font-mono uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Mission & Vision Bento */}
          <section className="max-w-5xl mx-auto px-4 md:px-6 mb-24">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#EDE9FE] rounded-[36px] p-8 sm:p-10 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#7C3AED] mb-6 shadow-2xs">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-normal text-slate-900 mb-3">Our Mission</h2>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-light">
                  To engineer autonomous systems that eliminate repetitive operational bottlenecks, unlock hidden efficiencies, and provide enterprises with sustainable competitive advantages.
                </p>
              </div>

              <div className="bg-[#FEF08A] rounded-[36px] p-8 sm:p-10 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white mb-6 shadow-2xs">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-normal text-slate-900 mb-3">Our Vision</h2>
                <p className="text-slate-800 leading-relaxed text-sm sm:text-base font-light">
                  To become the global AI engineering partner of choice for forward-thinking enterprises — recognized for architectural depth, measurable ROI, and rapid execution.
                </p>
              </div>
            </div>
          </section>

          {/* Core Values */}
          <section className="max-w-5xl mx-auto px-4 md:px-6 mb-24">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-5xl font-normal text-slate-900 tracking-tight">
                Our core values
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((v) => {
                const Icon = v.icon
                return (
                  <div
                    key={v.title}
                    style={{ backgroundColor: v.color }}
                    className="rounded-[32px] p-7 border border-slate-200/60 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-4 text-slate-900">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-slate-900 font-bold mb-2">{v.title}</h3>
                      <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-light">{v.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Timeline */}
          <section className="max-w-5xl mx-auto px-4 md:px-6 mb-24">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-5xl font-normal text-slate-900 tracking-tight">
                Company timeline
              </h2>
            </div>

            <div className="space-y-4">
              {milestones.map((m, i) => (
                <div
                  key={i}
                  className="bg-slate-50 border border-slate-200/90 rounded-[28px] p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="px-4 py-1.5 rounded-full bg-black text-white font-mono text-xs font-bold">
                      {m.year}
                    </div>
                    <div>
                      <h3 className="text-slate-900 font-bold text-base">{m.title}</h3>
                      <p className="text-slate-600 text-xs sm:text-sm font-light mt-0.5">{m.event}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Dual Journey Bento */}
          <DualJourneyBento />

        </div>

        <Footer />
      </main>
    </div>
  )
}
