import { motion } from "framer-motion"
import { Users, Zap, ShieldCheck, TrendingUp, ArrowRight, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"

const advantages = [
  {
    icon: Users,
    color: "#7C3AED",
    bg: "#EDE9FE",
    number: "01",
    title: "Direct Engineering Access",
    description: "Collaborate directly with the senior architects building your system. No account managers, no layered handoffs — just direct engineering partnership.",
    stat: "< 4h response",
  },
  {
    icon: Zap,
    color: "#FACC15",
    bg: "#FEFCE8",
    number: "02",
    title: "Sprint Speed & Agility",
    description: "We move fast without sacrificing architectural depth. Most custom AI and software solutions launch into production within 4 to 8 weeks.",
    stat: "4–8 wk MVP",
  },
  {
    icon: ShieldCheck,
    color: "#10B981",
    bg: "#ECFDF5",
    number: "03",
    title: "100% Code & IP Ownership",
    description: "Everything we engineer is your proprietary property. You own all source code, models, documentation, and database schemas with zero vendor lock-in.",
    stat: "0% lock-in",
  },
  {
    icon: TrendingUp,
    color: "#F97316",
    bg: "#FFF7ED",
    number: "04",
    title: "Measurable Business Outcomes",
    description: "We evaluate success by real business impact — reduced operational cycle times, eliminated manual overhead, and heightened conversion rates.",
    stat: "3× avg. ROI",
  },
]

export function WhyDavnsSection() {
  return (
    <section id="why-davns" className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden bg-white border-t border-slate-100">
      
      {/* Subtle background */}
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700 text-xs font-mono mb-4 tracking-widest uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
            The DAVNS Advantage
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
            Why forward-thinking leaders{" "}
            <span className="text-gradient-violet">choose us</span>
          </h2>
          <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto mt-4 font-light">
            We operate as an embedded engineering partner — combining deep technical mastery with direct accountability.
          </p>
        </motion.div>

        {/* ── 4-Card Grid (Alternating large/small) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {advantages.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-slate-50 border border-slate-200 rounded-[28px] p-6 flex flex-col gap-5 card-lift group"
              >
                {/* Number + icon */}
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ backgroundColor: item.bg }}>
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-300">{item.number}</span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-900 mb-2 leading-tight">{item.title}</h3>
                  <p className="text-slate-500 text-xs font-light leading-relaxed">{item.description}</p>
                </div>

                {/* Stat badge */}
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold font-mono" style={{ color: item.color }}>{item.stat}</span>
                  <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:bg-slate-900 group-hover:border-slate-900 transition-all duration-300">
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/get-started">
            <button className="group inline-flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 rounded-full px-8 py-3.5 text-sm font-bold transition-all duration-200 hover:scale-105 cursor-pointer shadow-md">
              Start a project today
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <Link to="/about">
            <button className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors">
              Learn more about us →
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
