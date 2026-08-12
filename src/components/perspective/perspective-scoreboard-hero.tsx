import { motion } from "framer-motion"
import { Trophy, Users, Building2, Sparkles, TrendingUp, Star } from "lucide-react"
import { Participant, College } from "@/lib/scoreboard-service"

interface ScoreboardHeroProps {
  participants: Participant[]
  colleges: College[]
  isLive: boolean
}

export function PerspectiveScoreboardHero({ participants, colleges, isLive }: ScoreboardHeroProps) {
  const topScore = participants.length > 0 ? participants[0].totalPoints : 0
  const totalParticipants = participants.length
  const totalColleges = colleges.length
  const avgScore =
    participants.length > 0
      ? Math.round(
          (participants.reduce((sum, p) => sum + p.totalPoints, 0) / participants.length) * 10
        ) / 10
      : 0

  return (
    <section className="relative pt-28 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.2),transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#7C3AED]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#FACC15]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono font-bold text-[#FACC15] mb-6"
        >
          {isLive ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              LIVE LEADERBOARD • UPDATING IN REAL-TIME
            </>
          ) : (
            <>
              <Trophy className="w-3.5 h-3.5" />
              PERSPECTIVE 2026 • OFFICIAL RESULTS
            </>
          )}
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mb-4"
        >
          <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#7C3AED] font-bold mb-3">
            DAVNS INDUSTRIES PRESENTS
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            PERSPECTIVE 2026{" "}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-[#FACC15] rounded-xl -rotate-1 scale-105" />
              <span className="relative px-2 text-slate-950">SCORE CARD</span>
            </span>
          </h1>
          <div className="mt-3 text-base sm:text-xl text-slate-400 font-light">
            The Thinking Challenge — Official Rankings
          </div>
        </motion.div>

        {/* Key stat cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mt-10"
        >
          {[
            {
              icon: Users,
              value: totalParticipants,
              label: "Participants",
              color: "text-purple-400",
              bg: "bg-purple-500/10 border-purple-500/20",
            },
            {
              icon: Building2,
              value: totalColleges,
              label: "Colleges",
              color: "text-amber-400",
              bg: "bg-amber-500/10 border-amber-500/20",
            },
            {
              icon: Star,
              value: topScore.toFixed(0),
              label: "Top Score",
              color: "text-emerald-400",
              bg: "bg-emerald-500/10 border-emerald-500/20",
            },
            {
              icon: TrendingUp,
              value: avgScore,
              label: "Avg Score",
              color: "text-sky-400",
              bg: "bg-sky-500/10 border-sky-500/20",
            },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className={`rounded-2xl border p-4 sm:p-5 text-left ${stat.bg} backdrop-blur-sm`}
              >
                <Icon className={`w-5 h-5 mb-2 ${stat.color}`} />
                <div className={`text-2xl sm:text-3xl font-extrabold font-mono ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-slate-400 font-mono uppercase tracking-wider mt-0.5">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </motion.div>

        {/* Divider strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-3 text-[10px] sm:text-xs font-mono text-slate-500"
        >
          <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[#FACC15]" /> September 1–6, 2026</span>
          <span className="text-slate-700">|</span>
          <span>Max 1,050 Points</span>
          <span className="text-slate-700">|</span>
          <span>180 Total Quizzes</span>
          <span className="text-slate-700">|</span>
          <span>100% Online Assessment</span>
        </motion.div>
      </div>
    </section>
  )
}
