import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { CheckCircle2, ArrowRight, Sparkles, Building2, Rocket, Zap, Shield } from "lucide-react"

const startupFeatures = [
  "Rapid MVP in 4–6 weeks guaranteed",
  "Direct access to lead architects",
  "Flexible monthly sprint retainers",
  "100% proprietary code ownership",
]

const enterpriseFeatures = [
  "Private VPC & on-premise deployment",
  "Zero public model training on your data",
  "Dedicated 99.98% high-availability SLA",
  "Custom CRM & ERP deep integrations",
]

export function DualJourneyBento() {
  return (
    <section className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden bg-white">
      
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-700 text-xs font-mono mb-4 tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Engagement Tiers
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
            Tailored for your{" "}
            <span className="text-gradient-warm">scale</span>
          </h2>
          <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto mt-4 font-light">
            Whether you're a fast-moving startup or a scaled enterprise — we have the right model.
          </p>
        </motion.div>

        {/* Two Tier Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">

          {/* ── Startup Card: Yellow ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#FACC15] rounded-[36px] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group hover:shadow-yellow transition-shadow duration-300"
          >
            {/* Decorative blob */}
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-yellow-300/40 blur-2xl pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-900/60 block mb-2">
                    Agile Sprint Delivery
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                    For Fast-Scaling<br />Startups
                  </h3>
                </div>
                <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                  <Rocket className="w-6 h-6 text-yellow-400" />
                </div>
              </div>

              <p className="text-slate-800 text-sm sm:text-base font-light leading-relaxed mb-8">
                Launch your custom AI automation or full-stack web/mobile platform with high velocity. Engineering your MVP in 4 weeks, scaled without technical debt.
              </p>

              <ul className="space-y-3.5 mb-8">
                {startupFeatures.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                    className="flex items-center gap-3 text-sm font-semibold text-slate-900"
                  >
                    <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-yellow-400" />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            <Link to="/get-started" className="relative z-10">
              <button className="group/btn inline-flex items-center gap-2 bg-black text-white hover:bg-slate-800 rounded-full px-8 py-3.5 text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-md">
                Start startup sprint
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>

          {/* ── Enterprise Card: Dark ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-slate-950 rounded-[36px] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Decorative gradient */}
            <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-violet-700/20 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/40 block mb-2">
                    Mission-Critical Infrastructure
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                    For Scaled<br />Enterprise
                  </h3>
                </div>
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 shrink-0">
                  <Building2 className="w-6 h-6 text-violet-400" />
                </div>
              </div>

              <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed mb-8">
                Architect dedicated multi-agent microservices and edge computer vision inspection systems with guaranteed data sovereignty, custom SLAs, and private VPC security.
              </p>

              <ul className="space-y-3.5 mb-8">
                {enterpriseFeatures.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                    className="flex items-center gap-3 text-sm font-semibold text-white"
                  >
                    <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            <Link to="/contact" className="relative z-10">
              <button className="group/btn inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 rounded-full px-8 py-3.5 text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-md">
                Schedule enterprise discovery
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>

        </div>

        {/* ── Bottom 3-Col Stats ── */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Zap, val: "4 wks", sub: "Avg. time to production", color: "#FACC15", textColor: "#92400E" },
            { icon: Shield, val: "99.98%", sub: "High-availability SLA", color: "#EDE9FE", textColor: "#5B21B6" },
            { icon: CheckCircle2, val: "15+", sub: "Enterprise clients deployed", color: "#ECFDF5", textColor: "#065F46" },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-[24px] p-5 text-center border border-slate-100 bg-slate-50 card-lift"
              >
                <div className="w-10 h-10 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: stat.color }}>
                  <Icon className="w-5 h-5" style={{ color: stat.textColor }} />
                </div>
                <div className="text-2xl font-extrabold text-slate-900 font-mono">{stat.val}</div>
                <div className="text-[11px] text-slate-500 mt-1 font-medium leading-tight">{stat.sub}</div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
