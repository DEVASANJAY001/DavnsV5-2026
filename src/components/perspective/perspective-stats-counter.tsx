import { motion } from "framer-motion"
import { Calendar, Zap, Trophy, Infinity as InfinityIcon } from "lucide-react"

const stats = [
  {
    num: "06",
    label: "COMPETITION DAYS",
    sub: "September 1 to 6, 2026",
    icon: Calendar,
    accent: "#7C3AED",
  },
  {
    num: "180",
    label: "APTITUDE QUIZZES",
    sub: "30 progressive questions / day",
    icon: Zap,
    accent: "#FACC15",
  },
  {
    num: "01",
    label: "TRUE CHAMPION",
    sub: "The highest cumulative mind",
    icon: Trophy,
    accent: "#10B981",
  },
  {
    num: "∞",
    label: "WAYS TO THINK",
    sub: "Uncapped lateral deduction",
    icon: InfinityIcon,
    accent: "#3B82F6",
  },
]

export function PerspectiveStatsCounter() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white relative overflow-hidden">
      {/* Glow shapes */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#FACC15]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="text-xs font-mono text-[#FACC15] uppercase tracking-[0.25em] font-bold mb-2">
            BY THE METRICS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Numbers Behind DAVNS Perspective
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white/5 border border-white/10 rounded-[32px] p-6 sm:p-8 backdrop-blur-md hover:bg-white/10 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" style={{ color: stat.accent }} />
                </div>
                <div className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-mono tracking-tight text-white mb-2">
                  {stat.num}
                </div>
                <div className="text-xs sm:text-sm font-bold font-mono text-[#FACC15] tracking-wider uppercase mb-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400 font-light">
                  {stat.sub}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
