import { motion } from "framer-motion"
import { Brain, Sparkles, TrendingUp, Award, School, Flame, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react"

const reasons = [
  {
    title: "TEST YOUR THINKING",
    desc: "Challenge yourself with 180 questions engineered specifically to evaluate how you deduce, observe, and decide without formula shortcuts.",
    icon: Brain,
    accent: "#EDE9FE",
    text: "#7C3AED",
  },
  {
    title: "BUILD CONFIDENCE",
    desc: "Experience a disciplined, structured competitive aptitude environment that primes you for high-stakes problem-solving scenarios.",
    icon: ShieldCheck,
    accent: "#FEF08A",
    text: "#854D0E",
  },
  {
    title: "BENCHMARK YOURSELF",
    desc: "Gain transparent insight into where your logical reasoning stands relative to peers across top institutions nationwide.",
    icon: TrendingUp,
    accent: "#ECFDF5",
    text: "#059669",
  },
  {
    title: "EARN RECOGNITION",
    desc: "Stand among the sharpest collegiate minds and receive official verified certificates endorsed by DAVNS Industries.",
    icon: Award,
    accent: "#EFF6FF",
    text: "#2563EB",
  },
  {
    title: "REPRESENT YOUR ACHIEVEMENT",
    desc: "Bring pride and distinction to your institution by securing a spot in the Top 5 or claiming the #1 Champion title.",
    icon: School,
    accent: "#FFF7ED",
    text: "#EA580C",
  },
  {
    title: "COMPLETE THE CHALLENGE",
    desc: "Conquer 6 consecutive days of progressive intellectual testing and prove your stamina, focus, and analytical consistency.",
    icon: Flame,
    accent: "#FDF2F8",
    text: "#DB2777",
  },
]

export function PerspectiveWhyParticipate() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-100 text-yellow-800 text-xs font-mono font-bold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            CORE VALUE PROPOSITION
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Why Participate in DAVNS Perspective?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            Six compelling reasons why ambitious college students choose to test their cognitive agility with DAVNS.
          </p>
        </div>

        {/* 6 Reasons Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, index) => {
            const Icon = r.icon
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-slate-50 border border-slate-200/90 rounded-[32px] p-8 shadow-2xs hover:shadow-lg hover:border-slate-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      style={{ backgroundColor: r.accent }}
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs"
                    >
                      <Icon style={{ color: r.text }} className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 tracking-tight mb-3">
                    {r.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                    {r.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />
                  <span>Individual Evaluation</span>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
