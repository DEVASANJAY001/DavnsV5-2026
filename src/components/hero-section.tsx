import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, Eye, Workflow, Server, Smartphone, Cpu, Sparkles, ArrowRight, TrendingUp, Zap } from "lucide-react"
import { Link } from "react-router-dom"

const capabilities = [
  { id: "01", label: "AI Agents", sub: "24/7 Sales & Support", icon: Bot, color: "#7C3AED", bg: "#EDE9FE" },
  { id: "02", label: "Vision QC", sub: "Optical Defect Check", icon: Eye, color: "#F97316", bg: "#FFF7ED" },
  { id: "03", label: "Workflows", sub: "Zero-Touch CRM Sync", icon: Workflow, color: "#10B981", bg: "#ECFDF5" },
  { id: "04", label: "Cloud Core", sub: "FastAPI & PostgreSQL", icon: Server, color: "#3B82F6", bg: "#EFF6FF" },
  { id: "05", label: "Mobile Apps", sub: "React Native & PWA", icon: Smartphone, color: "#EC4899", bg: "#FDF2F8" },
  { id: "06", label: "IoT Systems", sub: "Factory Telemetry", icon: Cpu, color: "#FACC15", bg: "#FEFCE8" },
]

const metrics = [
  { value: "99.4%", label: "Vision Accuracy", trend: "+2.1%" },
  { value: "<4ms", label: "Ingestion Latency", trend: "↓ 60%" },
  { value: "99.98%", label: "System Uptime", trend: "SLA Backed" },
]

const liveLog = [
  "Lead qualified via WhatsApp → CRM synced",
  "Defect detected on camera line 3 → Flagged",
  "Invoice OCR complete → ERP updated",
  "Sales agent booked 11:00 AM test drive",
  "Vision pipeline: 2847 items inspected",
]

const rotatingWords = ["enterprise", "startup", "dealership", "factory", "workflows", "scale"]

export function HeroSection() {
  const [activeCapability, setActiveCapability] = useState(0)
  const [logIdx, setLogIdx] = useState(0)
  const [wordIdx, setWordIdx] = useState(0)
  const [metricAnim, setMetricAnim] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveCapability((p) => (p + 1) % 6)
    }, 3400)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  useEffect(() => {
    const t = setInterval(() => setWordIdx((p) => (p + 1) % rotatingWords.length), 2800)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setLogIdx((p) => (p + 1) % liveLog.length), 2500)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    setMetricAnim(false)
    const t = setTimeout(() => setMetricAnim(true), 100)
    return () => clearTimeout(t)
  }, [])

  const active = capabilities[activeCapability]
  const ActiveIcon = active.icon

  return (
    <section className="relative min-h-screen flex flex-col justify-start items-center px-4 sm:px-6 lg:px-8 pt-36 sm:pt-44 pb-24 sm:pb-32 overflow-hidden bg-white">
      
      {/* Subtle dot-grid background */}
      <div className="absolute inset-0 bg-dot-grid opacity-40 pointer-events-none" />

      {/* Soft radial gradient glow top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(237,233,254,0.6),transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">

        {/* ── Top Pill Badge ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EDE9FE] text-[#7C3AED] text-xs font-semibold tracking-wide border border-purple-200 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse" />
            Next-Gen AI Automation Platform
            <Sparkles className="w-3 h-3" />
          </span>
        </motion.div>

        {/* ── Hero Headline with Smooth Morphing Highlight Word ── */}
        <motion.h1
          layout
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-[5.2rem] font-extrabold text-slate-900 tracking-tight leading-[1.15] text-center mb-6 max-w-5xl mx-auto px-2"
        >
          Intelligent systems{" "}
          <span className="relative inline-block">
            <span className="text-gradient-violet">built for</span>
          </span>
          <br />
          <motion.span
            layout
            transition={{
              layout: { type: "spring", stiffness: 280, damping: 28, mass: 0.8 },
            }}
            className="relative inline-flex items-center justify-center flex-wrap gap-x-2"
          >
            <motion.span
              layout
              transition={{
                layout: { type: "spring", stiffness: 280, damping: 28, mass: 0.8 },
              }}
            >
              your
            </motion.span>
            {" "}
            <motion.span
              layout
              transition={{
                layout: { type: "spring", stiffness: 280, damping: 28, mass: 0.8 },
              }}
              className="relative inline-flex items-center justify-center align-baseline py-1"
            >
              {/* Yellow Morphing Background */}
              <motion.span
                layout
                transition={{
                  layout: { type: "spring", stiffness: 280, damping: 28, mass: 0.8 },
                }}
                className="absolute inset-0 bg-[#FACC15] rounded-xl sm:rounded-2xl -rotate-1 shadow-sm"
              />

              {/* Word Animated Container */}
              <motion.span
                layout
                transition={{
                  layout: { type: "spring", stiffness: 280, damping: 28, mass: 0.8 },
                }}
                className="relative inline-block px-3 sm:px-5 py-0.5 overflow-hidden text-slate-900"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingWords[wordIdx]}
                    initial={{ y: 22, opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -22, opacity: 0, filter: "blur(4px)" }}
                    transition={{
                      y: { type: "spring", stiffness: 320, damping: 26 },
                      opacity: { duration: 0.22 },
                      filter: { duration: 0.22 },
                    }}
                    className="inline-block font-extrabold whitespace-nowrap"
                  >
                    {rotatingWords[wordIdx]}
                  </motion.span>
                </AnimatePresence>
              </motion.span>
            </motion.span>
          </motion.span>
        </motion.h1>

        {/* ── Subheadline ── */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-base sm:text-lg text-slate-500 text-center max-w-xl mx-auto mb-10 font-light leading-relaxed"
        >
          DAVNS engineers autonomous AI agents, computer vision pipelines, and full-stack platforms — deployed in 4 weeks.
        </motion.p>

        {/* ── CTA Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14"
        >
          <Link to="/get-started">
            <button className="group bg-slate-900 text-white hover:bg-slate-800 rounded-full px-8 py-4 text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg">
              Start a project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <Link to="/solutions">
            <button className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300 rounded-full px-8 py-4 text-sm font-medium transition-all duration-200 shadow-sm">
              Explore capabilities
            </button>
          </Link>
        </motion.div>

        {/* ── Three-Card Bento Hero ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">

          {/* ── LEFT: Capability Grid (Lilac Squircle) ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="lg:col-span-4"
          >
            <div className="bg-[#EDE9FE] rounded-[32px] p-5 h-full relative overflow-hidden">
              {/* Soft background blob */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-200/40 blur-2xl pointer-events-none" />
              
              <div className="text-xs font-bold text-[#7C3AED] uppercase tracking-widest mb-4 pl-1 font-mono">
                Platform Modules
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {capabilities.map((cap, idx) => {
                  const CapIcon = cap.icon
                  const isActive = idx === activeCapability
                  return (
                    <motion.button
                      key={cap.id}
                      onClick={() => {
                        setActiveCapability(idx)
                        if (intervalRef.current) clearInterval(intervalRef.current)
                      }}
                      animate={isActive ? { scale: 1.03 } : { scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className={`relative p-3.5 rounded-2xl text-left transition-all cursor-pointer overflow-hidden ${
                        isActive
                          ? "bg-[#7C3AED] text-white shadow-lg"
                          : "bg-white text-slate-800 hover:bg-white/90 shadow-sm"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-white/10 rounded-2xl"
                          initial={{ scale: 0, opacity: 0.5 }}
                          animate={{ scale: 2, opacity: 0 }}
                          transition={{ duration: 0.6 }}
                        />
                      )}
                      <CapIcon className={`w-4 h-4 mb-2 ${isActive ? "text-purple-200" : "text-slate-500"}`} />
                      <div className="text-xs font-bold leading-tight">{cap.label}</div>
                      <div className={`text-[10px] mt-0.5 leading-tight ${isActive ? "text-purple-200" : "text-slate-400"}`}>
                        {cap.sub}
                      </div>
                    </motion.button>
                  )
                })}
              </div>

              {/* Active Module Animated Indicator */}
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-4 bg-white/70 backdrop-blur-sm rounded-2xl p-3.5 flex items-center gap-3 border border-purple-200/50"
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: active.bg }}>
                  <ActiveIcon className="w-4.5 h-4.5" style={{ color: active.color }} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{active.label} Active</div>
                  <div className="text-[10px] text-slate-500">{active.sub}</div>
                </div>
                <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </motion.div>
            </div>
          </motion.div>

          {/* ── CENTER: Command Dashboard Preview ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="bg-slate-950 rounded-[32px] overflow-hidden h-full min-h-[360px] flex flex-col border border-slate-800/80 shadow-2xl">
              
              {/* Terminal top bar */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] text-slate-400 ml-2 font-mono">davns.command.center</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE
                </span>
              </div>

              {/* Dashboard Content */}
              <div className="flex-1 p-5 flex flex-col gap-4 overflow-hidden">
                
                {/* Live event ticker */}
                <div className="bg-slate-900 rounded-xl p-3.5 border border-slate-800">
                  <div className="text-[10px] text-slate-500 font-mono uppercase mb-2">Live Event Stream</div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={logIdx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2 text-xs text-emerald-300 font-mono"
                    >
                      <span className="text-violet-400">[{new Date().toLocaleTimeString()}]</span>
                      {liveLog[logIdx]}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Metrics row */}
                <div className="grid grid-cols-3 gap-3">
                  {metrics.map((m, i) => (
                    <motion.div
                      key={m.label}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                      className="bg-slate-900 rounded-xl p-3 border border-slate-800 text-center"
                    >
                      <div className="text-sm sm:text-base font-extrabold text-white font-mono">{m.value}</div>
                      <div className="text-[9px] text-slate-400 mt-0.5 leading-tight">{m.label}</div>
                      <div className="text-[9px] text-emerald-400 font-semibold mt-1">{m.trend}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Bar chart visualization */}
                <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] text-slate-400 font-mono">SYSTEM THROUGHPUT</span>
                    <span className="text-[10px] text-yellow-400 font-mono font-bold">↑ 3.2× YoY</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-16">
                    {[40, 55, 65, 48, 72, 85, 60, 90, 75, 95].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 0.6, delay: 0.5 + i * 0.05, ease: "easeOut" }}
                        className="flex-1 rounded-t-lg"
                        style={{ 
                          backgroundColor: i === 9 ? "#7C3AED" : i === 7 ? "#FACC15" : "#1e293b",
                          minHeight: "4px"
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-[8px] text-slate-600 mt-1 font-mono">
                    <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span>
                    <span>Sa</span><span>Su</span><span>Mo</span><span>Tu</span><span>We</span>
                  </div>
                </div>
              </div>

              {/* Bottom integration pill */}
              <div className="px-5 pb-4">
                <div className="bg-slate-900 rounded-full px-4 py-2 flex items-center justify-between border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono">INTEGRATIONS ACTIVE</span>
                  <div className="flex items-center gap-1.5">
                    {[{ label: "WA", color: "#25D366" }, { label: "SF", color: "#00A1E0" }, { label: "CV", color: "#7C3AED" }, { label: "PY", color: "#3776AB" }].map((int) => (
                      <div key={int.label} className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold" style={{ backgroundColor: int.color }}>
                        {int.label}
                      </div>
                    ))}
                    <span className="text-[10px] text-slate-400 ml-1">+20</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Yellow Performance Card + Stat Badges ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="lg:col-span-3 flex flex-col gap-4"
          >
            {/* Client Social Proof */}
            <div className="bg-slate-50 rounded-[24px] p-4 border border-slate-200 flex items-center gap-3">
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop",
                ].map((src, i) => (
                  <img key={i} src={src} className="w-8 h-8 rounded-full ring-2 ring-white object-cover" alt="client" />
                ))}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">15+ Clients</div>
                <div className="text-[11px] text-slate-500">Enterprise Deployments</div>
              </div>
            </div>

            {/* Yellow performance card */}
            <div className="bg-[#FACC15] rounded-[28px] p-5 flex-1 flex flex-col justify-between shadow-yellow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-xs font-bold text-slate-900/70 uppercase tracking-wider mb-1">Deployment Speed</div>
                  <div className="text-4xl font-extrabold text-slate-900">4 wks</div>
                  <div className="text-xs text-slate-700 font-medium mt-0.5">From Discovery to Live</div>
                </div>
                <div className="w-11 h-11 bg-black rounded-2xl flex items-center justify-center shadow-md">
                  <Zap className="w-5 h-5 text-yellow-400" />
                </div>
              </div>

              <div className="space-y-2.5">
                {[
                  { label: "Sprint 1: Audit & Design", done: true },
                  { label: "Sprint 2: Neural Prototype", done: true },
                  { label: "Sprint 3: Production Build", done: false },
                  { label: "Sprint 4: Live Launch", done: false },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      s.done ? "bg-black border-black" : "bg-transparent border-black/40"
                    }`}>
                      {s.done && <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />}
                    </div>
                    <span className={`text-xs font-medium ${s.done ? "text-slate-900" : "text-slate-700/60"}`}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending upward stat */}
            <div className="bg-[#7C3AED] rounded-[24px] p-4 flex items-center justify-between">
              <div>
                <div className="text-2xl font-extrabold text-white">98%</div>
                <div className="text-xs text-purple-200 font-medium">Client Satisfaction</div>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-200 opacity-70" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
