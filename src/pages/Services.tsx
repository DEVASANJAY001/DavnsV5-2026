import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  Bot, Eye, Smartphone, MessageSquare, CheckCircle2,
  ArrowRight, Cpu, Shield, Zap, Clock, BarChart3,
  Layers, Terminal, Wrench, Package, Globe, Lock
} from "lucide-react"

// ── Service detail cards ──
const serviceCards = [
  {
    icon: Bot,
    id: "01",
    title: "AI Automation & Workflow Intelligence",
    description: "Automate complex, repetitive operational processes using custom-trained AI pipelines — from document ingestion and data parsing to autonomous task dispatching.",
    deliverables: ["Process automation pipelines", "Intelligent document OCR", "Predictive routing engines", "Zero-touch email agents"],
    color: "#EDE9FE",
    accent: "#7C3AED",
  },
  {
    icon: Eye,
    id: "02",
    title: "Industrial Computer Vision",
    description: "Deploy real-time optical analysis models for industrial manufacturing, sub-millimeter component defect identification, and safety compliance monitoring.",
    deliverables: ["Sub-millimeter defect detection", "Visual grading algorithms", "Edge camera telemetry", "Safety zone monitoring"],
    color: "#FEF9C3",
    accent: "#CA8A04",
  },
  {
    icon: MessageSquare,
    id: "03",
    title: "Autonomous Conversational Agents",
    description: "24/7 AI agents that conduct natural, multi-turn sales qualification, appointment booking, and customer support with automated CRM syncing.",
    deliverables: ["WhatsApp & Web chatbots", "Live voice agent routing", "CRM lead qualification", "Multi-language NLP models"],
    color: "#ECFDF5",
    accent: "#059669",
  },
  {
    icon: Smartphone,
    id: "04",
    title: "Full-Stack Web & Mobile Engineering",
    description: "High-performance React web applications and React Native mobile apps engineered with modern design systems and enterprise scalability.",
    deliverables: ["React 19 / Vite web platforms", "React Native mobile apps", "REST & GraphQL APIs", "Design system architectures"],
    color: "#EFF6FF",
    accent: "#2563EB",
  },
]

// ── Process / methodology steps ──
const processSteps = [
  { icon: Wrench, step: "01", title: "Discovery Audit", desc: "We map every friction node, API contract, and operational gap in your current stack." },
  { icon: Cpu,    step: "02", title: "Neural Prototype", desc: "Rapid in-sprint POC builds with interactive agent testing and vision model benchmarking." },
  { icon: Terminal, step: "03", title: "Production Build", desc: "Microservices, CI/CD, zero-trust data isolation, and >90% automated test coverage." },
  { icon: Globe,  step: "04", title: "Live Launch & Scale", desc: "Multi-region deploy, staff onboarding, real-time telemetry dashboards, 99.98% SLA." },
]

// ── Tech stack badges ──
const techStack = [
  "Python", "PyTorch", "OpenCV", "FastAPI", "React", "Next.js",
  "React Native", "Node.js", "PostgreSQL", "Redis", "Docker", "Kubernetes",
  "AWS", "GCP", "LangChain", "OpenAI", "Whisper", "WhatsApp API",
]

// ── Service FAQs ──
const serviceFAQs = [
  {
    q: "What types of businesses does DAVNS work with?",
    a: "Fast-scaling startups, mid-market enterprises, and industrial manufacturers across automotive, manufacturing, retail, healthcare, and logistics.",
  },
  {
    q: "How long does a typical AI automation project take?",
    a: "Most projects range from 4 to 10 weeks. A focused conversational agent or workflow automation module can launch in 4–6 weeks; a full enterprise integration platform takes 8–12 weeks.",
  },
  {
    q: "Do you integrate with existing CRMs and ERPs?",
    a: "Yes. We engineer seamless API adapters for Salesforce, HubSpot, Zoho, SAP, Odoo, custom SQL databases, and legacy proprietary systems without workflow disruption.",
  },
  {
    q: "Can you build mobile apps alongside the web platform?",
    a: "Absolutely. We develop unified cross-platform mobile apps using React Native synchronized in real-time with your cloud database and AI microservices.",
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="border-b border-slate-100 py-6"
    >
      <div className="flex items-start gap-4">
        <div className="w-6 h-6 rounded-full bg-[#FACC15] flex items-center justify-center shrink-0 mt-0.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-slate-900" />
        </div>
        <div>
          <div className="font-bold text-slate-900 mb-2">{q}</div>
          <div className="text-slate-500 text-sm font-light leading-relaxed">{a}</div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="relative overflow-hidden">
        <GlassmorphismNav />

        {/* ══════════════════════════════════════════════
            1. UNIQUE HERO — Split layout (left text + right terminal)
        ══════════════════════════════════════════════ */}
        <section className="pt-36 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-950 relative overflow-hidden">
          {/* Background orbs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-700/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-500/8 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/70 text-xs font-mono mb-6 tracking-widest uppercase">
                <Layers className="w-3.5 h-3.5 text-yellow-400" />
                Services & Capabilities
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                Engineering the AI<br />
                infrastructure of<br />
                <span className="text-[#FACC15]">tomorrow</span>
              </h1>

              <p className="text-slate-400 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-lg">
                We architect custom autonomous systems — from real-time computer vision pipelines to conversational sales AI — built for the scale and security your business demands.
              </p>

              {/* Key numbers */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { val: "4 wks", sub: "Avg. to production" },
                  { val: "15+", sub: "Live deployments" },
                  { val: "99.98%", sub: "Uptime SLA" },
                ].map((s) => (
                  <div key={s.val} className="text-center p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-2xl font-extrabold text-white font-mono">{s.val}</div>
                    <div className="text-[11px] text-slate-500 mt-1 font-medium">{s.sub}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Link to="/get-started">
                  <button className="group inline-flex items-center gap-2 bg-[#FACC15] text-slate-900 hover:bg-yellow-400 rounded-full px-7 py-3.5 text-sm font-extrabold transition-all hover:scale-105 cursor-pointer shadow-md">
                    Start your project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/15 rounded-full px-7 py-3.5 text-sm font-semibold transition-all hover:bg-white/15 cursor-pointer">
                    Talk to an engineer
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Right: Animated terminal / live output panel */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="bg-slate-900 rounded-[28px] border border-white/10 shadow-2xl overflow-hidden"
            >
              {/* Terminal bar */}
              <div className="flex items-center gap-1.5 px-5 py-3.5 bg-slate-800 border-b border-white/8">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-xs font-mono text-slate-400">davns.services.ts</span>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {[
                  { label: "AI Workflow Automation", color: "#7C3AED", tag: "ACTIVE", latency: "< 240ms" },
                  { label: "Computer Vision Pipeline", color: "#F97316", tag: "ACTIVE", latency: "99.4% acc." },
                  { label: "Conversational Sales Agent", color: "#10B981", tag: "LIVE", latency: "24/7" },
                  { label: "Full-Stack Engineering", color: "#3B82F6", tag: "READY", latency: "4 wk sprint" },
                ].map((svc, i) => (
                  <motion.div
                    key={svc.label}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.12, duration: 0.4 }}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/8"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: svc.color }} />
                      <span className="text-white text-sm font-medium">{svc.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full" style={{ color: svc.color, backgroundColor: svc.color + "20" }}>
                        {svc.tag}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">{svc.latency}</span>
                    </div>
                  </motion.div>
                ))}

                {/* Bottom line */}
                <div className="mt-2 pt-3 border-t border-white/8 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">4 services · All operational</span>
                  <span className="text-[11px] text-emerald-400 font-mono font-bold">● SYSTEM READY</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            2. SERVICE CARDS — Unique: number + side color strip layout
        ══════════════════════════════════════════════ */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
                What we build for you
              </h2>
              <p className="text-slate-500 text-base max-w-xl font-light">
                Every solution is custom-engineered — no templates, no off-the-shelf SaaS. Pure proprietary code owned entirely by you.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {serviceCards.map((svc, i) => {
                const Icon = svc.icon
                return (
                  <motion.div
                    key={svc.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="rounded-[32px] p-8 border border-slate-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between gap-6 card-lift"
                    style={{ backgroundColor: svc.color }}
                  >
                    <div>
                      <div className="flex items-start justify-between mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                          <Icon className="w-5 h-5" style={{ color: svc.accent }} />
                        </div>
                        <span className="text-sm font-black font-mono text-slate-300">{svc.id}</span>
                      </div>
                      <h3 className="text-xl font-extrabold text-slate-900 mb-3 leading-snug">{svc.title}</h3>
                      <p className="text-slate-600 text-sm font-light leading-relaxed mb-5">{svc.description}</p>

                      <div className="border-t border-black/10 pt-4">
                        <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-3 font-semibold">Deliverables</p>
                        <div className="grid grid-cols-2 gap-2">
                          {svc.deliverables.map((d) => (
                            <div key={d} className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: svc.accent }} />
                              <span className="text-xs text-slate-700 font-medium">{d}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Link to="/get-started" className="self-start">
                      <button
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-900 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200 cursor-pointer shadow-sm"
                      >
                        Start this service <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            3. TECH STACK — Marquee badge strip (unique to services page)
        ══════════════════════════════════════════════ */}
        <section className="py-16 bg-slate-50 border-y border-slate-100 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">Our engineering toolchain</h2>
            <p className="text-slate-500 text-sm font-light">Battle-tested technologies powering every system we ship.</p>
          </div>
          <div className="relative overflow-x-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="flex gap-4 w-max"
            >
              {[...techStack, ...techStack].map((tech, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-sm font-semibold text-slate-700 shadow-sm whitespace-nowrap"
                >
                  {tech}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            4. PROCESS STEPS — Horizontal timeline (unique to services page)
        ══════════════════════════════════════════════ */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
                Our delivery process
              </h2>
              <p className="text-slate-500 text-base max-w-lg mx-auto font-light">
                Structured, transparent, and predictable. Each phase delivers tangible output — no black boxes.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {processSteps.map((step, i) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative bg-slate-50 border border-slate-200 rounded-[28px] p-7 flex flex-col gap-4 card-lift"
                  >
                    {/* Connector line */}
                    {i < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-10 -right-3 w-6 h-px bg-slate-300 z-10" />
                    )}

                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-2xl bg-[#FACC15] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-slate-900" />
                      </div>
                      <span className="text-3xl font-black text-slate-100 font-mono">{step.step}</span>
                    </div>

                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 mb-2">{step.title}</h3>
                      <p className="text-xs text-slate-500 font-light leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            5. FAQ — Minimal expandable list
        ══════════════════════════════════════════════ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Services FAQ</h2>
              <p className="text-slate-500 text-sm font-light">Common questions about our engineering deliverables and timelines.</p>
            </motion.div>

            {serviceFAQs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  )
}
