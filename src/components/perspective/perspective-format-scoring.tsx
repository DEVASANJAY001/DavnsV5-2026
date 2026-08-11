import { motion } from "framer-motion"
import { ShieldCheck, Target, Clock, Zap, CheckCircle2, Award, FileText, Calendar, Users, Globe2, Activity } from "lucide-react"

const formatDetails = [
  { label: "MODE", value: "100% Online Assessment", icon: Globe2 },
  { label: "PARTICIPATION", value: "Strictly Individual", icon: Users },
  { label: "ELIGIBILITY", value: "Enrolled College Students", icon: ShieldCheck },
  { label: "DURATION", value: "6 Consecutive Days", icon: Calendar },
  { label: "DAILY QUIZZES", value: "30 Quizzes / Day", icon: Target },
  { label: "TOTAL QUIZZES", value: "180 Total Questions", icon: Activity },
  { label: "EVENT DATES", value: "September 1–6, 2026", icon: Clock },
]

const scoringPillars = [
  {
    title: "Answer Accuracy",
    desc: "Primary evaluation metric based on correct logical deduction and valid inferences.",
    icon: Target,
    tag: "Primary Weight",
  },
  {
    title: "6-Day Consistency",
    desc: "Rewards sustained cognitive performance without severe performance dips across all 6 days.",
    icon: Activity,
    tag: "Vital Factor",
  },
  {
    title: "Completion Ratio",
    desc: "Solving the full 30 quizzes each day ensures your profile receives maximum cumulative points.",
    icon: CheckCircle2,
    tag: "Mandatory",
  },
  {
    title: "Time-Weighted Index",
    desc: "Speed-adjusted tie-breakers applied in close score brackets where applicable.",
    icon: Clock,
    tag: "Tie-Breaker",
  },
]

export function PerspectiveFormatScoring() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-100 text-yellow-800 text-xs font-mono font-bold tracking-wider uppercase mb-4">
            <Target className="w-3.5 h-3.5" />
            EVALUATION ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Competition Format & Scoring
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            Transparent, robust, and precision-calibrated to reward genuine intellectual consistency.
          </p>
        </div>

        {/* 2-Column Section: Left Format Details, Right Scoring System */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Left: Competition Format Table */}
          <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-[36px] p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900">Competition Format</h3>
                  <p className="text-xs text-slate-500 font-light">Essential operational parameters</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-900 text-white font-mono text-xs font-bold">
                  2026 EDITION
                </span>
              </div>

              <div className="space-y-3.5">
                {formatDetails.map((f) => {
                  const Icon = f.icon
                  return (
                    <div
                      key={f.label}
                      className="p-3.5 rounded-2xl bg-white border border-slate-200/90 flex items-center justify-between text-sm shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-[#7C3AED]" />
                        <span className="text-xs font-mono font-bold text-slate-500">{f.label}</span>
                      </div>
                      <span className="font-semibold text-slate-900 text-right">{f.value}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-purple-50 border border-purple-100 text-xs text-[#7C3AED] font-light leading-relaxed">
              📌 Assessments are delivered asynchronously within the designated daily window so students can participate smoothly around academic schedules.
            </div>
          </div>

          {/* Right: Scoring Philosophy & Card */}
          <div className="lg:col-span-6 bg-slate-950 text-white border border-slate-800 rounded-[36px] p-8 sm:p-10 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FACC15] text-xs font-mono font-bold">
                <Zap className="w-3.5 h-3.5" />
                SCORING PHILOSOPHY
              </div>

              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-1">
                  CRITICAL RULE
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  ONE GOOD DAY IS <span className="text-[#FACC15]">NOT ENOUGH</span>.
                </h3>
              </div>

              <p className="text-sm text-slate-300 font-light leading-relaxed">
                The challenge rewards participants who can maintain strong performance throughout all six days.
                A single lucky run cannot secure the championship — excellence requires sustained analytical stamina.
              </p>

              <div className="grid sm:grid-cols-2 gap-3.5 pt-2">
                {scoringPillars.map((p) => {
                  const Icon = p.icon
                  return (
                    <div key={p.title} className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1.5 backdrop-blur-xs">
                      <div className="flex items-center justify-between">
                        <Icon className="w-4 h-4 text-[#FACC15]" />
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{p.tag}</span>
                      </div>
                      <div className="text-sm font-bold text-white">{p.title}</div>
                      <div className="text-xs text-slate-400 font-light leading-relaxed">{p.desc}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>LEADERBOARD TELEMETRY</span>
              <span className="text-emerald-400 font-bold">UPDATED POST-CHALLENGE</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
