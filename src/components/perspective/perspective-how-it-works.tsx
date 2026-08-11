import { motion } from "framer-motion"
import { Sparkles, UserPlus, CalendarCheck, CheckSquare, TrendingUp, Trophy, ArrowRight, Zap } from "lucide-react"

const steps = [
  {
    step: "01",
    title: "REGISTER",
    subtitle: "Quick & Free Enrollment",
    desc: "Register for DAVNS PERSPECTIVE 2026 through the official portal. No registration fees required.",
    icon: UserPlus,
    accent: "#EDE9FE",
    text: "#7C3AED",
  },
  {
    step: "02",
    title: "PARTICIPATE DAILY",
    subtitle: "Daily Assessment Window",
    desc: "Log in each day from September 1 to 6 to unlock the day's active assessment challenge.",
    icon: CalendarCheck,
    accent: "#FEF08A",
    text: "#854D0E",
  },
  {
    step: "03",
    title: "SOLVE 30 QUIZZES",
    subtitle: "Calibrated Cognitive Tests",
    desc: "Tackle each day's curated 30 aptitude questions testing logic, deduction, and pattern solving.",
    icon: CheckSquare,
    accent: "#ECFDF5",
    text: "#059669",
  },
  {
    step: "04",
    title: "BUILD YOUR SCORE",
    subtitle: "Real-time Telemetry",
    desc: "Every correct deduction, accuracy rate, and timely completion builds your cumulative tally.",
    icon: TrendingUp,
    accent: "#EFF6FF",
    text: "#2563EB",
  },
  {
    step: "05",
    title: "COMPLETE ALL SIX DAYS",
    subtitle: "Consistency is Paramount",
    desc: "One good day is not enough. Sustained analytical precision over all six days defines champions.",
    icon: Zap,
    accent: "#FFF7ED",
    text: "#EA580C",
  },
  {
    step: "06",
    title: "FINAL RANKING",
    subtitle: "Leaderboard & Honors",
    desc: "After all 180 quizzes are completed, official leaderboards are published and certificates awarded.",
    icon: Trophy,
    accent: "#FDF2F8",
    text: "#DB2777",
  },
]

export function PerspectiveHowItWorks() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-200/80 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-mono font-bold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            STEP-BY-STEP BLUEPRINT
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            A seamless, structured 6-stage journey from initial registration to final leaderboard coronation.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s, index) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white rounded-[32px] p-7 sm:p-8 border border-slate-200 shadow-2xs hover:shadow-lg hover:border-slate-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      style={{ backgroundColor: s.accent }}
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs"
                    >
                      <Icon style={{ color: s.text }} className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-2xl font-black text-slate-300 group-hover:text-slate-900 transition-colors">
                      {s.step}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#7C3AED] mb-1">
                    {s.subtitle}
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-3">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>STAGE {s.step} OF 06</span>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 group-hover:text-slate-900 transition-all" />
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
