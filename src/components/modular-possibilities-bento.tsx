import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, ChevronLeft, ChevronRight, Bot, Eye, Sparkles, ArrowRight, CheckCircle2, Zap } from "lucide-react"
import { Link } from "react-router-dom"

const modules = [
  {
    id: "01",
    title: "Autonomous AI Sales Agent",
    tag: "Conversational AI",
    tagColor: "#7C3AED",
    tagBg: "#EDE9FE",
    description: "Deploy 24/7 WhatsApp sales agents that qualify leads, schedule appointments, and sync every interaction to your CRM — fully automated.",
    visual: "chat",
    bg: "#FACC15",
    stat: { value: "3×", label: "faster lead conversion" },
  },
  {
    id: "02",
    title: "Computer Vision Quality Control",
    tag: "Edge Vision",
    tagColor: "#F97316",
    tagBg: "#FFF7ED",
    description: "Sub-millimeter optical inspection detects micro-defects in real-time on production lines, eliminating human error with 99.4% accuracy.",
    visual: "vision",
    bg: "#EDE9FE",
    stat: { value: "99.4%", label: "defect detection accuracy" },
  },
  {
    id: "03",
    title: "Zero-Touch Workflow Automation",
    tag: "Automation",
    tagColor: "#10B981",
    tagBg: "#ECFDF5",
    description: "Orchestrate your entire operational pipeline — from inbound lead triage to invoice processing — with zero manual intervention.",
    visual: "pipeline",
    bg: "#F0FDF4",
    stat: { value: "80%", label: "manual workload eliminated" },
  },
  {
    id: "04",
    title: "Custom Enterprise Dashboards",
    tag: "Analytics",
    tagColor: "#3B82F6",
    tagBg: "#EFF6FF",
    description: "Real-time telemetry dashboards tailored to your operations — track KPIs, pipeline throughput, and AI agent performance live.",
    visual: "dashboard",
    bg: "#DBEAFE",
    stat: { value: "< 4ms", label: "data ingestion latency" },
  },
]

function ChatVisual() {
  const messages = [
    { from: "user", text: "Hi, I'm interested in the Tesla Model 3." },
    { from: "ai", text: "Great choice! I've pulled your budget preference. Would Saturday 11:00 AM work for a test drive?" },
    { from: "user", text: "Yes, that works!" },
    { from: "ai", text: "✅ Booked! CRM updated. You'll receive a WhatsApp confirmation." },
  ]
  return (
    <div className="bg-slate-950 rounded-2xl p-4 h-48 flex flex-col gap-2 overflow-hidden border border-slate-800">
      <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1.5 mb-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        WHATSAPP AI AGENT · LIVE
      </div>
      {messages.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: m.from === "user" ? 12 : -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.2, duration: 0.4 }}
          className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
        >
          <div className={`text-[10px] px-3 py-1.5 rounded-xl max-w-[80%] leading-relaxed ${
            m.from === "user" ? "bg-[#25D366] text-white" : "bg-slate-800 text-slate-200"
          }`}>
            {m.text}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function VisionVisual() {
  return (
    <div className="bg-slate-950 rounded-2xl h-48 overflow-hidden relative border border-slate-800 flex items-center justify-center">
      {/* Simulated scan lines */}
      <motion.div
        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-80"
        animate={{ top: ["10%", "90%", "10%"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="grid grid-cols-4 gap-2 p-4 w-full">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className={`h-10 rounded-lg border ${
              i === 2 || i === 5 ? "border-rose-500 bg-rose-900/30" : "border-slate-700 bg-slate-900"
            } flex items-center justify-center`}
            animate={i === 2 || i === 5 ? { borderColor: ["#ef4444", "#f97316", "#ef4444"] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {(i === 2 || i === 5) && (
              <span className="text-[8px] text-rose-400 font-mono font-bold">DEFECT</span>
            )}
          </motion.div>
        ))}
      </div>
      <div className="absolute bottom-2 right-3 text-[9px] font-mono text-emerald-400">
        99.4% ACCURACY
      </div>
    </div>
  )
}

function PipelineVisual() {
  const steps = ["Intake", "Parse", "Enrich", "Route", "Execute"]
  return (
    <div className="bg-slate-950 rounded-2xl h-48 overflow-hidden border border-slate-800 p-4">
      <div className="text-[10px] text-slate-400 font-mono mb-3">LIVE PIPELINE STATUS</div>
      <div className="space-y-2">
        {steps.map((step, i) => (
          <motion.div
            key={step}
            initial={{ width: "0%" }}
            whileInView={{ width: `${100 - i * 8}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
            className="flex items-center gap-2"
          >
            <div className="text-[9px] text-slate-400 font-mono w-12 shrink-0">{step}</div>
            <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ backgroundColor: ["#7C3AED", "#FACC15", "#10B981", "#3B82F6", "#F97316"][i] }}
              />
            </div>
            <div className="text-[9px] text-emerald-400 font-mono shrink-0">✓</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function DashboardVisual() {
  return (
    <div className="bg-slate-950 rounded-2xl h-48 overflow-hidden border border-slate-800 p-4 flex gap-3">
      <div className="flex-1 space-y-2">
        {[{ label: "Leads Today", value: "247", color: "#7C3AED" }, { label: "Defects Caught", value: "12", color: "#F97316" }, { label: "Tasks Automated", value: "1,842", color: "#10B981" }].map((m) => (
          <div key={m.label} className="bg-slate-900 rounded-xl p-2.5 border border-slate-800">
            <div className="text-[9px] text-slate-500 font-mono">{m.label}</div>
            <div className="text-sm font-extrabold font-mono mt-0.5" style={{ color: m.color }}>{m.value}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col justify-end gap-1.5">
        <div className="text-[9px] text-slate-500 font-mono mb-1">THROUGHPUT</div>
        <div className="flex items-end gap-1 h-24">
          {[35, 55, 45, 70, 60, 85, 95].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="flex-1 rounded-t"
              style={{ backgroundColor: i === 6 ? "#FACC15" : "#1e293b" }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const visuals: Record<string, () => React.ReactElement> = {
  chat: ChatVisual,
  vision: VisionVisual,
  pipeline: PipelineVisual,
  dashboard: DashboardVisual,
}

export function ModularPossibilitiesBento() {
  const [activeIdx, setActiveIdx] = useState(0)
  const active = modules[activeIdx]
  const Visual = visuals[active.visual]

  return (
    <section className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden bg-white">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700 text-xs font-mono mb-4 tracking-widest uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
            Platform Capabilities
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
            One platform,{" "}
            <span className="text-gradient-violet">endless possibilities</span>
          </h2>
        </motion.div>

        {/* ── Main Split Bento ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left: Module Selector List (4 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 space-y-3"
          >
            {modules.map((mod, idx) => {
              const isActive = idx === activeIdx
              return (
                <motion.button
                  key={mod.id}
                  onClick={() => setActiveIdx(idx)}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left p-5 rounded-[24px] border-2 transition-all duration-300 cursor-pointer group ${
                    isActive
                      ? "bg-slate-900 border-slate-900 shadow-xl"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-mono font-bold text-slate-400">{mod.id}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ 
                          color: isActive ? "#fff" : mod.tagColor,
                          backgroundColor: isActive ? "rgba(255,255,255,0.12)" : mod.tagBg
                        }}>
                          {mod.tag}
                        </span>
                      </div>
                      <h3 className={`text-sm font-bold leading-tight ${isActive ? "text-white" : "text-slate-900"}`}>
                        {mod.title}
                      </h3>
                    </div>
                    <ArrowRight className={`w-4 h-4 shrink-0 mt-1 transition-transform group-hover:translate-x-1 ${
                      isActive ? "text-white/60" : "text-slate-400"
                    }`} />
                  </div>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 pt-3 border-t border-white/15"
                    >
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-extrabold text-white font-mono">{mod.stat.value}</div>
                        <div className="text-[10px] text-white/50 font-medium">{mod.stat.label}</div>
                      </div>
                    </motion.div>
                  )}
                </motion.button>
              )
            })}
          </motion.div>

          {/* Right: Active Module Display (8 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="rounded-[32px] p-7 sm:p-10 min-h-[480px] sm:min-h-[520px] h-full flex flex-col justify-between relative overflow-hidden"
                style={{ backgroundColor: active.bg }}
              >
                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
                  style={{ backgroundColor: active.bg === "#FACC15" ? "#FDE047" : "#A78BFA" }} />

                <div>
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className="inline-block text-[10px] px-3 py-1 rounded-full font-bold mb-3 font-mono"
                        style={{ backgroundColor: "rgba(0,0,0,0.1)", color: "rgba(0,0,0,0.7)" }}>
                        {active.tag}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-sm">
                        {active.title}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, -8, 8, -8, 0] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                      className="w-12 h-12 rounded-2xl bg-black/10 flex items-center justify-center shrink-0"
                    >
                      <Bell className="w-5 h-5 fill-black/50" />
                    </motion.div>
                  </div>

                  <p className="text-slate-700 text-sm sm:text-base font-light leading-relaxed mb-6 max-w-lg">
                    {active.description}
                  </p>

                  {/* Visual Preview */}
                  <Visual />
                </div>

                {/* Bottom action */}
                <div className="flex items-center justify-between mt-6">
                  <Link to="/services">
                    <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-xs font-bold hover:bg-slate-800 transition-all hover:scale-105 cursor-pointer shadow-md">
                      See full capability
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                  
                  {/* Step dots */}
                  <div className="flex items-center gap-2">
                    {modules.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIdx(i)}
                        className={`rounded-full transition-all duration-200 cursor-pointer ${
                          i === activeIdx ? "w-6 h-2 bg-black" : "w-2 h-2 bg-black/25 hover:bg-black/40"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>

        {/* ── Bottom Bento Row: 3 Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-6">
          {[
            {
              icon: Bot,
              color: "#7C3AED",
              bg: "#EDE9FE",
              title: "AI Model Fine-Tuning",
              desc: "Custom LLMs trained on your data and business logic — never leaking to public training sets."
            },
            {
              icon: Zap,
              color: "#F97316",
              bg: "#FFF7ED",
              title: "4-Week Sprint Delivery",
              desc: "Discovery → Prototype → Production → Launch. Structured, transparent, and rapid."
            },
            {
              icon: CheckCircle2,
              color: "#10B981",
              bg: "#ECFDF5",
              title: "100% IP Ownership",
              desc: "All code, models, and documentation belong to you — zero vendor lock-in, ever."
            },
          ].map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-slate-50 border border-slate-200 rounded-[24px] p-6 card-lift flex flex-col gap-4"
              >
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: card.bg }}>
                  <Icon className="w-5 h-5" style={{ color: card.color }} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{card.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">{card.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
