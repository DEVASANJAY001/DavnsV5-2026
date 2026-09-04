import { motion } from "framer-motion"
import { Users, Building2, TrendingUp, Award, Calendar } from "lucide-react"
import { Participant, College } from "@/lib/scoreboard-service"

export const UNSTOP_REGISTER_URL =
  "https://unstop.com/o/B9nhYTp?lb=usehckjk&utm_medium=Share&utm_source=quizzes&utm_campaign=Davnsnlo59542"

interface ScoreboardHeroProps {
  participants: Participant[]
  colleges: College[]
  isLive?: boolean
}

export function PerspectiveScoreboardHero({ participants, colleges }: ScoreboardHeroProps) {
  const topScore = participants.length > 0 ? Math.max(...participants.map((p) => p.totalPoints)) : 169
  const totalParticipants = participants.length > 0 ? participants.length : 190
  const totalColleges = colleges.length > 0 ? colleges.length : 9
  const avgScore =
    participants.length > 0
      ? Math.round(
          (participants.reduce((sum, p) => sum + p.totalPoints, 0) / participants.length) * 10
        ) / 10
      : 24

  return (
    <section className="relative pt-24 sm:pt-32 pb-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50/40 via-white to-white text-slate-900 overflow-hidden border-b border-slate-200/80">
      {/* Soft radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-72 bg-[radial-gradient(ellipse_at_top,rgba(237,233,254,0.6),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Continuous Moving One-Line Priority Announcement in Orange (No Container) */}
        <div className="w-full max-w-4xl mx-auto overflow-hidden mb-5 relative py-1">
          {/* Subtle edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-12 bg-gradient-to-r from-purple-50/40 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-12 bg-gradient-to-l from-purple-50/40 to-transparent z-10 pointer-events-none" />
          
          <a
            href={UNSTOP_REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex overflow-hidden whitespace-nowrap cursor-pointer select-none"
            title="Open official Unstop schedule & round details"
          >
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 24 }}
              className="flex shrink-0 items-center gap-8 whitespace-nowrap text-orange-600 hover:text-orange-700 text-[10.5px] sm:text-xs font-mono font-bold tracking-tight"
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping inline-block shrink-0" />
                <span className="font-extrabold text-orange-600 uppercase tracking-wider">Important Update:</span>
                <span className="text-orange-600 font-semibold">DAVNS PERSPECTIVE 2026 schedule has been revised — please check the updated schedule for the latest dates and timings.</span>
                <span className="underline underline-offset-2 font-extrabold text-orange-500 group-hover:text-orange-700 ml-1">View On Unstop ↗</span>
              </span>
              <span className="text-orange-300">✦</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping inline-block shrink-0" />
                <span className="font-extrabold text-orange-600 uppercase tracking-wider">Important Update:</span>
                <span className="text-orange-600 font-semibold">DAVNS PERSPECTIVE 2026 schedule has been revised — please check the updated schedule for the latest dates and timings.</span>
                <span className="underline underline-offset-2 font-extrabold text-orange-500 group-hover:text-orange-700 ml-1">View On Unstop ↗</span>
              </span>
              <span className="text-orange-300">✦</span>
            </motion.div>
          </a>
        </div>

        {/* Overline & Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2.5 sm:space-y-3 mb-8"
        >
          <div className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#7C3AED] font-bold">
            DAVNS INDUSTRIES PRESENTS
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>PERSPECTIVE 2026</span>
            <span className="inline-block bg-[#FACC15] text-slate-950 px-3 sm:px-4 py-0.5 rounded-xl font-mono text-2xl sm:text-4xl md:text-5xl font-black shadow-xs tracking-tight">
              SCORE CARD
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 font-normal max-w-xl mx-auto pt-1">
            The Thinking Challenge — Official Rankings & Verified Results
          </p>
        </motion.div>

        {/* ── Humanized 4-Column Stat Bento (Light Theme) ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto"
        >
          {/* Participants */}
          <div className="rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-5 text-left shadow-2xs hover:shadow-md hover:border-purple-200 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                PARTICIPANTS
              </span>
              <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center text-[#7C3AED]">
                <Users className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 tracking-tight">
              {totalParticipants}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5 font-medium">Registered Students</div>
          </div>

          {/* Colleges */}
          <div className="rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-5 text-left shadow-2xs hover:shadow-md hover:border-amber-200 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                COLLEGES
              </span>
              <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                <Building2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 tracking-tight">
              {totalColleges}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5 font-medium">Institutions Represented</div>
          </div>

          {/* Top Score */}
          <div className="rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-5 text-left shadow-2xs hover:shadow-md hover:border-yellow-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                TOP SCORE
              </span>
              <div className="w-7 h-7 rounded-lg bg-yellow-50 flex items-center justify-center text-amber-500">
                <Award className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#7C3AED] tracking-tight">
              {topScore}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5 font-medium">Highest Points Achieved</div>
          </div>

          {/* Avg Score */}
          <div className="rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-5 text-left shadow-2xs hover:shadow-md hover:border-sky-200 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                AVG SCORE
              </span>
              <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 tracking-tight">
              {avgScore}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5 font-medium">Cohort Average Points</div>
          </div>
        </motion.div>

        {/* ── Key Metadata in one clean line without container ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10.5px] sm:text-[11.5px] font-mono text-slate-500"
        >
          <span className="text-slate-700 font-medium">September 1–6, 2026</span>
          <span className="text-slate-300">•</span>
          <span>180 Total Quizzes</span>
          <span className="text-slate-300">•</span>
          <span>Max 1,050 Points</span>
          <span className="text-slate-300">•</span>
          <span>100% Online Assessment</span>
        </motion.div>
      </div>
    </section>
  )
}
