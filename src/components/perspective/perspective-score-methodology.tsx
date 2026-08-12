import { motion } from "framer-motion"
import { Target, Activity, CheckCircle2, Clock, Zap, Info, Award } from "lucide-react"

const scoringPillars = [
  {
    icon: Target,
    title: "Accuracy",
    maxPts: "600 pts",
    pct: "57%",
    formula: "(Correct / 30) × 100 per day",
    desc: "Primary metric based on correct quiz answers across 6 days.",
    color: "text-purple-400",
    bg: "from-purple-500/15 to-transparent",
    border: "border-purple-500/30",
  },
  {
    icon: Activity,
    title: "Consistency",
    maxPts: "300 pts",
    pct: "29%",
    formula: "+50 pts per participated day",
    desc: "Rewards showing up every day. 6 days = maximum 300 pts.",
    color: "text-amber-400",
    bg: "from-amber-500/15 to-transparent",
    border: "border-amber-500/30",
  },
  {
    icon: CheckCircle2,
    title: "Completion",
    maxPts: "120 pts",
    pct: "11%",
    formula: "(Attempted / 30) × 20 per day",
    desc: "Rewards attempting all 30 questions in each daily quiz round.",
    color: "text-emerald-400",
    bg: "from-emerald-500/15 to-transparent",
    border: "border-emerald-500/30",
  },
  {
    icon: Clock,
    title: "Speed Index",
    maxPts: "30 pts",
    pct: "3%",
    formula: "Up to +5 pts/day (< 15 mins)",
    desc: "Tie-breaker bonus for fast, precision quiz submissions.",
    color: "text-sky-400",
    bg: "from-sky-500/15 to-transparent",
    border: "border-sky-500/30",
  },
]

export function PerspectiveScoreMethodology() {
  return (
    <section className="py-12 sm:py-16 px-3 sm:px-6 lg:px-8 bg-slate-950 text-white relative overflow-hidden border-t border-slate-900">
      {/* Subtle atmospheric glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#7C3AED]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FACC15]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#FACC15] text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase border border-white/15">
            <Zap className="w-3 h-3" />
            <span>SCORING METHODOLOGY</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
            How Points Are Calculated
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-light max-w-lg mx-auto">
            Transparent scoring calibrated to reward genuine cognitive consistency and accuracy.
          </p>
        </div>

        {/* 4 Compact Scoring Pillar Cards (2-cols on mobile, 4-cols on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5">
          {scoringPillars.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`rounded-2xl sm:rounded-3xl bg-gradient-to-b ${p.bg} bg-white/[0.03] border ${p.border} p-3.5 sm:p-4 flex flex-col justify-between space-y-2.5 backdrop-blur-sm hover:bg-white/[0.06] transition-all`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${p.color}`} />
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 font-mono text-[10px] sm:text-[11px] font-extrabold text-[#FACC15]">
                      {p.maxPts}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-white text-xs sm:text-sm tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 font-mono mt-0.5 leading-snug line-clamp-2">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 font-mono text-[9.5px] sm:text-[10.5px] text-slate-300">
                  <span className="text-slate-500 block text-[8.5px] sm:text-[9px] uppercase tracking-wider">Formula</span>
                  <span className="text-[#FACC15] font-semibold truncate block">{p.formula}</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Compact Maximum Score Equation Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-purple-900/40 via-slate-900 to-amber-900/30 border border-white/15 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 shadow-lg text-center sm:text-left"
        >
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              Total Individual Score
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
              <span>1,050</span>
              <span className="text-xs text-amber-300 font-bold uppercase tracking-wider bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                Max Points
              </span>
            </div>
          </div>

          <div className="text-[10px] sm:text-xs font-mono text-slate-300 bg-white/5 border border-white/10 px-3 py-2 rounded-xl sm:rounded-2xl">
            <span className="text-purple-300 font-bold">600 (Acc)</span>
            <span className="text-slate-500 mx-1">+</span>
            <span className="text-amber-300 font-bold">300 (Const)</span>
            <span className="text-slate-500 mx-1">+</span>
            <span className="text-emerald-300 font-bold">120 (Comp)</span>
            <span className="text-slate-500 mx-1">+</span>
            <span className="text-sky-300 font-bold">30 (Speed)</span>
            <span className="text-slate-500 mx-1">=</span>
            <span className="text-[#FACC15] font-extrabold">1,050 Max</span>
          </div>
        </motion.div>

        {/* Compact College Ranking Explanation Note */}
        <div className="flex items-center gap-2.5 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/10 text-[10.5px] sm:text-xs text-slate-300 font-mono">
          <Award className="w-4 h-4 text-[#FACC15] shrink-0" />
          <span>
            <strong className="text-white font-semibold">College Leaderboard:</strong> Total points for each college is the sum of all its participating students' scores.
          </span>
        </div>

      </div>
    </section>
  )
}
