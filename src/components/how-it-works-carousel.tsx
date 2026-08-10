import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Cpu, Code2, Rocket, ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Search,
    color: "#FACC15",
    bg: "#FEFCE8",
    title: "Discovery & Workflow Audit",
    subtitle: "Empirical Analysis",
    desc: "We map every internal friction node, legacy database, and target efficiency benchmark with senior architects.",
    tags: ["Root Cause Analysis", "API Contracts", "Workflow Mapping"],
    code: `// Step 01: Workflow Discovery
const audit = await davns.analyze({
  sources: ["crm", "whatsapp", "cameras"],
  latencyTarget: "< 300ms",
  bottlenecks: "auto_detect"
});
console.log(audit.frictionNodes); // 12 identified`,
  },
  {
    number: "02",
    icon: Cpu,
    color: "#7C3AED",
    bg: "#EDE9FE",
    title: "Neural Prototyping",
    subtitle: "Interactive Validation",
    desc: "Rapid proof-of-concept builds with interactive conversational pipelines and vision model testing in-sprint.",
    tags: ["Custom LLM", "Vision Pipeline", "CRM Sync"],
    code: `// Step 02: Neural Agent Build
const agent = new DavnsAgent({
  model: "custom-fine-tuned-v2",
  tools: [qualifyLead, bookAppointment],
  accuracy: 0.994,
  latency: "< 240ms"
});
await agent.test({ simulate: true });`,
  },
  {
    number: "03",
    icon: Code2,
    color: "#F97316",
    bg: "#FFF7ED",
    title: "Production Engineering",
    subtitle: "Secure Build",
    desc: "Microservices architecture, CI/CD pipelines, automated QA suites, and data isolation with private VPC.",
    tags: ["Microservices", "CI/CD", "Zero-Trust"],
    code: `// Step 03: Production Build
await pipeline.build({
  arch: "microservices",
  dataIsolation: "private_vpc",
  cicd: { provider: "github_actions" },
  testCoverage: "> 90%"
});`,
  },
  {
    number: "04",
    icon: Rocket,
    color: "#10B981",
    bg: "#ECFDF5",
    title: "Live Launch & Scale",
    subtitle: "Autonomous Scaling",
    desc: "Multi-region deployment with 99.98% SLA, staff onboarding, and real-time telemetry monitoring dashboards.",
    tags: ["99.98% SLA", "Multi-Region", "Telemetry"],
    code: `// Step 04: Autonomous Launch
await davns.deploy({
  region: ["ap-south-1", "eu-west-1"],
  sla: "99.98%",
  autoscale: { min: 2, max: 32 },
  monitoring: "realtime_telemetry"
});`,
  },
]

export function HowItWorksCarousel() {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)

  const go = (dir: "next" | "prev") => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setActive((p) => dir === "next" ? (p + 1) % steps.length : (p - 1 + steps.length) % steps.length)
      setAnimating(false)
    }, 200)
  }

  // Auto advance
  useEffect(() => {
    const t = setInterval(() => go("next"), 5000)
    return () => clearInterval(t)
  }, [active])

  const current = steps[active]
  const CurrentIcon = current.icon

  return (
    <section className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden bg-slate-50 border-t border-slate-100">
      
      {/* Background texture */}
      <div className="absolute inset-0 bg-dot-grid opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 text-xs font-mono mb-4 tracking-widest uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
            Engineering Methodology
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
            From idea to{" "}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-[#FACC15] rounded-xl -rotate-1 scale-105" />
              <span className="relative px-2">production</span>
            </span>
            {" "}in 4 weeks
          </h2>
        </motion.div>

        {/* Step Progress Bar */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {steps.map((s, i) => (
            <button
              key={s.number}
              onClick={() => setActive(i)}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <motion.div
                animate={i === active ? { scale: 1.1 } : { scale: 1 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold font-mono transition-all duration-300 ${
                  i === active
                    ? "bg-slate-900 text-white border-slate-900 shadow-md"
                    : i < active
                    ? "bg-slate-200 text-slate-600 border-slate-200"
                    : "bg-white text-slate-400 border-slate-200 hover:border-slate-300"
                }`}
              >
                <span>{s.number}</span>
                <span className="hidden sm:inline">{s.subtitle}</span>
              </motion.div>
              {i < steps.length - 1 && (
                <div className={`w-6 h-px transition-colors duration-300 ${i < active ? "bg-slate-400" : "bg-slate-200"}`} />
              )}
            </button>
          ))}
        </div>

        {/* Main Stage */}
        <div className="relative">
          
          {/* Nav arrows */}
          <button
            onClick={() => go("prev")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-8 z-20 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center hover:bg-slate-50 transition-all hover:scale-110 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-slate-700" />
          </button>
          <button
            onClick={() => go("next")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-8 z-20 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center hover:bg-slate-50 transition-all hover:scale-110 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 text-slate-700" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Left Info Panel */}
              <div
                className="rounded-[32px] p-7 sm:p-10 min-h-[440px] sm:min-h-[480px] flex flex-col justify-between"
                style={{ backgroundColor: current.color }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-black/10 flex items-center justify-center">
                      <CurrentIcon className="w-6 h-6 text-black/70" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold text-black/50">PHASE {current.number}</div>
                      <div className="text-sm font-bold text-black/80">{current.subtitle}</div>
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 leading-tight">
                    {current.title}
                  </h3>

                  <p className="text-slate-700 text-sm sm:text-base font-light leading-relaxed mb-6">
                    {current.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {current.tags.map((tag) => (
                      <span key={tag} className="text-[11px] px-3 py-1 rounded-full bg-black/10 text-black/70 font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-6">
                  {steps.map((_, i) => (
                    <div key={i} className={`rounded-full transition-all duration-300 ${
                      i === active ? "w-8 h-2 bg-black" : "w-2 h-2 bg-black/25"
                    }`} />
                  ))}
                </div>
              </div>

              {/* Right Code Panel */}
              <div className="bg-slate-950 rounded-[32px] overflow-hidden min-h-[440px] sm:min-h-[480px] border border-slate-800 shadow-xl flex flex-col">
                {/* Terminal Bar */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-slate-800 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-[11px] text-slate-400 ml-2 font-mono">davns.pipeline.ts</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold" style={{ color: current.color }}>
                    ● PHASE {current.number}
                  </span>
                </div>

                {/* Code Content */}
                <div className="p-5 flex-1 flex items-center">
                  <pre className="text-[13px] text-emerald-300 font-mono whitespace-pre-wrap leading-relaxed w-full">
                    {current.code}
                  </pre>
                </div>

                {/* Bottom Status */}
                <div className="px-5 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">TypeScript · DAVNS SDK 2.0</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">✓ PRODUCTION READY</span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
