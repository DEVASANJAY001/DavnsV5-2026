import { motion } from "framer-motion"
import { School, CheckCircle2, ShieldCheck, Award, Sparkles, User, Globe2, BookOpen, GraduationCap, Building2 } from "lucide-react"

const eligibleFields = [
  "Engineering & Robotics",
  "Technology & Computing",
  "Arts & Pure Sciences",
  "Management & Business",
  "Commerce & Economics",
  "Medicine & Allied Health",
  "Design & Architecture",
  "Diploma & Vocational Tech",
  "Law & Public Policy",
  "Any Recognized Higher Ed",
]

const neutralityPoints = [
  {
    title: "No College Bias",
    desc: "Whether you study at an elite tier-1 institute or a local regional college, every participant receives the exact same questions with identical scoring standards.",
  },
  {
    title: "No Branch Privilege",
    desc: "Mathematics and computer science students have no unfair advantage. The questions rely on raw cognitive deduction rather than pre-learned specialized theorems.",
  },
  {
    title: "100% Individual Merit",
    desc: "Your score is entirely your own. Leaderboards showcase personal intellect, focus, and consistency over 6 full challenge days.",
  },
  {
    title: "Institutional Honors",
    desc: "While colleges are not officially evaluated or ranked, Champions bring recognized distinction to their respective institutions.",
  },
]

export function PerspectiveEligibility() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold tracking-wider uppercase mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            PARTICIPANT ELIGIBILITY
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Built Exclusively for College Students
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            Students from all academic disciplines, years of study, and degree programs are welcome. 
            You simply need the ability to <strong className="text-slate-900 font-semibold">think, reason, and solve</strong>.
          </p>
        </div>

        {/* Big Statement Callout Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-950 text-white rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 mb-12 sm:mb-16 relative overflow-hidden shadow-xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center max-w-3xl mx-auto space-y-4 sm:space-y-6">
            <div className="text-[11px] sm:text-sm font-mono text-[#FACC15] uppercase tracking-[0.25em] font-bold">
              THE DAVNS MERITOCRACY PRINCIPLE
            </div>
            <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              YOUR COLLEGE IS YOUR BACKGROUND.
              <br />
              <span className="text-[#FACC15]">YOUR THINKING IS YOUR PERFORMANCE.</span>
            </h3>
            <p className="text-xs sm:text-base text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
              A participant's college reputation, university ranking, department, or GPA does not determine their score.
              Every participant faces the same challenge. The leaderboard reflects individual performance.
            </p>
          </div>
        </motion.div>

        {/* 2-Column Grid: Open Disciplines vs Neutrality Architecture */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left: Open Disciplines */}
          <div className="lg:col-span-5 bg-slate-50 rounded-[32px] p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7C3AED] flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Open to Students From</h4>
                <p className="text-xs text-slate-500 font-light">All recognized undergraduate & postgraduate programs</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {eligibleFields.map((field) => (
                <div
                  key={field}
                  className="px-3.5 py-2.5 rounded-2xl bg-white border border-slate-200/90 text-xs font-semibold text-slate-800 flex items-center gap-2 shadow-2xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{field}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-white rounded-2xl border border-slate-200 text-xs text-slate-600 font-light">
              💡 <strong>Note:</strong> You do not need to be an engineering or math major. Logical intuition and critical deduction are universal.
            </div>
          </div>

          {/* Right: Neutrality & Evaluation Principles */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {neutralityPoints.map((item, index) => (
              <div
                key={item.title}
                className="bg-white rounded-[28px] p-6 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-900 font-mono text-xs font-bold flex items-center justify-center mb-3">
                    0{index + 1}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Disclaimer note */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500 font-light max-w-3xl mx-auto">
          Participation is strictly individual and does not represent official institutional sponsorship or representation by the participant's college or university.
        </div>

      </div>
    </section>
  )
}
