import { useState } from "react"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { DualJourneyBento } from "@/components/dual-journey-bento"
import { FAQSection } from "@/components/faq-section"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import {
  Factory, Car, ShoppingCart, HeartPulse, Truck, Building2,
  TrendingUp, Clock, Users, ArrowRight, CheckCircle2, Sparkles,
  Cpu, Shield, Layers, BarChart3, ChevronRight, Activity, Zap
} from "lucide-react"

// ── Industry verticals with comprehensive data ──
const industries = [
  {
    id: "manufacturing",
    icon: Factory,
    title: "Manufacturing & Heavy Industry",
    tag: "Computer Vision & IoT",
    tagColor: "#F97316",
    tagBg: "#FFF7ED",
    cardBg: "#FEF9C3",
    challenge: "High optical defect escape rates, costly manual visual quality checks, and unpredictable assembly line downtime.",
    solution: "Sub-millimeter edge computer vision models running at 60 FPS on edge cameras with real-time PLC reject triggers.",
    metrics: [
      { label: "Defect Detection", val: "99.4%" },
      { label: "Inspection Speed", val: "< 50ms" },
      { label: "Scrap Reduction", val: "-40%" },
    ],
    features: [
      "Sub-millimeter optical flaw classification",
      "Direct PLC & SCADA hardware integration",
      "Automated thermal & acoustic anomaly alerts",
      "Real-time ISO-compliant audit logs",
    ],
  },
  {
    id: "automotive",
    icon: Car,
    title: "Automotive Dealerships & OEMs",
    tag: "Conversational Sales",
    tagColor: "#7C3AED",
    tagBg: "#EDE9FE",
    cardBg: "#EDE9FE",
    challenge: "Lost weekend after-hours leads, slow sales response times (>4 hours), and fragmented CRM pipeline tracking.",
    solution: "24/7 autonomous WhatsApp & web AI sales agents that qualify buyers, appraise trade-ins, and schedule test drives.",
    metrics: [
      { label: "Lead Conversion", val: "3.2×" },
      { label: "Response Latency", val: "< 15s" },
      { label: "After-Hours Bookings", val: "+68%" },
    ],
    features: [
      "Multi-turn inventory matching with live stock lookup",
      "Instant trade-in preliminary valuation AI",
      "Automated WhatsApp test drive appointment booking",
      "Two-way synchronization with Salesforce & CDK",
    ],
  },
  {
    id: "retail",
    icon: ShoppingCart,
    title: "Omnichannel Retail & E-Commerce",
    tag: "Predictive Commerce",
    tagColor: "#10B981",
    tagBg: "#ECFDF5",
    cardBg: "#F0FDF4",
    challenge: "Cart abandonment above 70%, disjointed multi-warehouse fulfillment delays, and generic customer support.",
    solution: "Contextual AI purchase assistants with automated multi-node inventory routing and conversational WhatsApp order tracking.",
    metrics: [
      { label: "Checkout Uplift", val: "+25%" },
      { label: "Dispatch Speed", val: "60% faster" },
      { label: "Ticket Deflection", val: "82%" },
    ],
    features: [
      "Dynamic personalized product recommendation engine",
      "Autonomous inventory rebalancing across warehouses",
      "Zero-touch WhatsApp shipping & exchange concierge",
      "Automated abandoned checkout recovery triggers",
    ],
  },
  {
    id: "healthcare",
    icon: HeartPulse,
    title: "Healthcare & Clinical Operations",
    tag: "Compliant Automation",
    tagColor: "#EC4899",
    tagBg: "#FDF2F8",
    cardBg: "#FDF2F8",
    challenge: "Complex appointment scheduling friction, heavy medical paperwork backlogs, and patient intake verification latency.",
    solution: "HIPAA-aligned intelligent document OCR pipelines paired with multilingual conversational scheduling agents.",
    metrics: [
      { label: "Intake Reduction", val: "-70%" },
      { label: "No-Show Drop", val: "-45%" },
      { label: "OCR Accuracy", val: "99.8%" },
    ],
    features: [
      "Automated patient intake & insurance verification OCR",
      "24/7 multi-channel patient appointment routing",
      "Secure FHIR/HL7 compliant cloud architecture",
      "Automated multilingual prescription reminder notifications",
    ],
  },
  {
    id: "logistics",
    icon: Truck,
    title: "Logistics & Fleet Operations",
    tag: "Routing Intelligence",
    tagColor: "#3B82F6",
    tagBg: "#EFF6FF",
    cardBg: "#EFF6FF",
    challenge: "Sub-optimal route dispatching, manual driver communication, and inaccurate client delivery ETA predictions.",
    solution: "Algorithmic dynamic dispatch optimization with GPS telematics ingestion and proactive WhatsApp client ETA updates.",
    metrics: [
      { label: "Fuel Cost Drop", val: "-22%" },
      { label: "On-Time Rate", val: "98.6%" },
      { label: "Driver Productivity", val: "+35%" },
    ],
    features: [
      "Dynamic multi-stop route optimization AI",
      "Automated proof-of-delivery OCR & billing sync",
      "Real-time GPS geofence alerts for clients",
      "Predictive vehicle maintenance scheduling",
    ],
  },
  {
    id: "finance",
    icon: Building2,
    title: "Financial & Professional Services",
    tag: "Document Intelligence",
    tagColor: "#FACC15",
    tagBg: "#FEFCE8",
    cardBg: "#FFFBEB",
    challenge: "Repetitive manual invoice parsing, slow loan document validation, and cumbersome compliance reporting.",
    solution: "End-to-end financial document ingestion pipelines with automated discrepancy flagging and ERP synchronization.",
    metrics: [
      { label: "Admin Time", val: "-60%" },
      { label: "Processing Speed", val: "10×" },
      { label: "Audit Accuracy", val: "100%" },
    ],
    features: [
      "Multi-format invoice & receipt OCR parsing",
      "Automated fraud & anomaly detection heuristics",
      "Real-time audit trail generation & ERP export",
      "Custom compliance reporting dashboards",
    ],
  },
]

const solutionFAQs = [
  {
    question: "Do your AI solutions scale for mid-market businesses as well as large enterprises?",
    answer: "Yes. Our architecture is modular. We deploy single-agent workflow automations for fast-growing companies up to distributed multi-agent microservices for multi-location manufacturing and retail groups.",
  },
  {
    question: "How do your models adapt to our proprietary industry data and terminology?",
    answer: "During our Discovery Sprint, we fine-tune embeddings and model pipelines using your historical datasets, internal taxonomies, and operational rules under strict private VPC data isolation standards.",
  },
  {
    question: "What is the typical deployment timeline for an industry-specific solution?",
    answer: "Most vertical deployments launch into production within 4 to 8 weeks, following our structured 4-phase engineering sprint methodology.",
  },
  {
    question: "Who owns the code and trained models after deployment?",
    answer: "You own 100% of all intellectual property, source code, fine-tuned weights, database schemas, and documentation. Zero vendor lock-in, ever.",
  },
]

export default function SolutionsPage() {
  const [selectedIndustry, setSelectedIndustry] = useState(0)
  const current = industries[selectedIndustry]
  const CurrentIcon = current.icon

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="min-h-screen relative overflow-hidden">
        <GlassmorphismNav />

        {/* ══════════════════════════════════════════════
            1. HERO SECTION — Clean MNC Design with yellow highlight
        ══════════════════════════════════════════════ */}
        <section className="pt-36 pb-20 px-4 sm:px-6 lg:px-8 bg-white relative">
          <div className="max-w-4xl mx-auto text-center">
            
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700 text-xs font-mono mb-6 tracking-widest uppercase shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
              Tailored Vertical AI
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]"
            >
              Enterprise solutions{" "}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-[#FACC15] rounded-xl -rotate-1 scale-105" />
                <span className="relative px-2">by sector</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-xl text-slate-600 leading-relaxed font-light max-w-2xl mx-auto mb-10"
            >
              We engineer industry-specific autonomous agents, computer vision inspection systems, and intelligent workflow automation platforms designed for high-stakes enterprise environments.
            </motion.p>

            {/* Quick Sector Selector Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto"
            >
              {industries.map((ind, idx) => {
                const Icon = ind.icon
                const isActive = idx === selectedIndustry
                return (
                  <button
                    key={ind.id}
                    onClick={() => setSelectedIndustry(idx)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold font-mono transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-slate-900 text-white shadow-md scale-105"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{ind.title.split(" ")[0]}</span>
                  </button>
                )
              })}
            </motion.div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════
            2. INTERACTIVE SECTOR SPOTLIGHT BENTO
        ══════════════════════════════════════════════ */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="rounded-[36px] p-8 sm:p-12 border border-slate-200 shadow-lg relative overflow-hidden"
              style={{ backgroundColor: current.cardBg }}
            >
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                
                {/* Left: Overview (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center shadow-md shrink-0">
                        <CurrentIcon className="w-7 h-7 text-yellow-400" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-600 block">
                          {current.tag}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                          {current.title}
                        </h2>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="bg-white/80 backdrop-blur rounded-2xl p-4 border border-slate-200/80">
                        <span className="text-[10px] font-mono font-bold text-rose-600 uppercase tracking-widest block mb-1">
                          Operational Bottleneck
                        </span>
                        <p className="text-slate-700 text-sm font-light leading-relaxed">
                          {current.challenge}
                        </p>
                      </div>

                      <div className="bg-white/80 backdrop-blur rounded-2xl p-4 border border-slate-200/80">
                        <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest block mb-1">
                          Autonomous Resolution
                        </span>
                        <p className="text-slate-700 text-sm font-light leading-relaxed">
                          {current.solution}
                        </p>
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="mb-8">
                      <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-3">
                        Architectural Features
                      </span>
                      <div className="grid sm:grid-cols-2 gap-2.5">
                        {current.features.map((feat) => (
                          <div key={feat} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-black shrink-0" />
                            <span className="text-xs text-slate-800 font-medium">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link to="/get-started">
                    <button className="inline-flex items-center gap-2 bg-black text-white hover:bg-slate-800 rounded-full px-7 py-3 text-xs font-bold transition-all hover:scale-105 cursor-pointer shadow-md">
                      Deploy for {current.title.split(" ")[0]}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>

                {/* Right: Metrics Cards (5 cols) */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                    Verified Outcomes
                  </span>
                  {current.metrics.map((m, i) => (
                    <motion.div
                      key={m.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                      className="bg-white rounded-[24px] p-6 border border-slate-200/90 shadow-sm flex items-center justify-between"
                    >
                      <div>
                        <span className="text-xs text-slate-500 font-medium">{m.label}</span>
                        <div className="text-3xl font-extrabold text-slate-900 font-mono mt-0.5">
                          {m.val}
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-slate-700" />
                      </div>
                    </motion.div>
                  ))}

                  {/* Architecture guarantee */}
                  <div className="bg-slate-900 text-white rounded-[24px] p-5 shadow-md">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-yellow-400 mb-1">
                      <Zap className="w-3.5 h-3.5" />
                      ENTERPRISE SLA
                    </div>
                    <p className="text-xs text-slate-300 font-light leading-relaxed">
                      99.98% High Availability · Private VPC · Dedicated Lead Architect Support.
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* ══════════════════════════════════════════════
            3. FULL 6-SECTOR GRID
        ══════════════════════════════════════════════ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-slate-50 rounded-[48px] border border-slate-100 mb-24">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Explore all industry deployments
            </h2>
            <p className="text-slate-500 text-base max-w-xl mx-auto font-light">
              Click any sector to inspect architecture blueprints and verified business results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, idx) => {
              const Icon = ind.icon
              const isSelected = idx === selectedIndustry
              return (
                <motion.button
                  key={ind.id}
                  onClick={() => {
                    setSelectedIndustry(idx)
                    window.scrollTo({ top: 400, behavior: "smooth" })
                  }}
                  whileHover={{ y: -4 }}
                  className={`text-left p-7 rounded-[32px] border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-white border-slate-900 shadow-xl ring-2 ring-slate-900/10"
                      : "bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-md"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs" style={{ backgroundColor: ind.tagBg }}>
                        <Icon className="w-6 h-6" style={{ color: ind.tagColor }} />
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: ind.tagBg, color: ind.tagColor }}>
                        {ind.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">{ind.title}</h3>
                    <p className="text-slate-500 text-xs font-light leading-relaxed mb-6 line-clamp-2">{ind.solution}</p>
                  </div>

                  <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono uppercase block">Primary Impact</span>
                      <span className="text-sm font-extrabold font-mono text-slate-900">{ind.metrics[0].val} {ind.metrics[0].label}</span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-slate-600" />
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            4. DUAL JOURNEY & FAQ
        ══════════════════════════════════════════════ */}
        <DualJourneyBento />

        <FAQSection
          faqs={solutionFAQs}
          title="AI Solutions FAQ"
          subtitle="Common questions regarding deployment architectures, model accuracy, and security standards."
        />

        <Footer />
      </main>
    </div>
  )
}
