import { motion } from "framer-motion"
import { Trophy, Award, Medal, CheckCircle2, Sparkles, School, Star, FileText, Check } from "lucide-react"

const tiers = [
  {
    tier: "THE CHAMPION",
    rank: "#1 RANKED",
    icon: Trophy,
    cardBg: "bg-slate-950 text-white border-slate-800 shadow-2xl relative overflow-hidden",
    badgeBg: "bg-[#FACC15] text-slate-950",
    iconBg: "bg-[#FACC15] text-slate-950",
    titleColor: "text-white",
    desc: "The single highest cumulative scorer across all 180 quizzes of DAVNS PERSPECTIVE 2026.",
    benefits: [
      "DAVNS PERSPECTIVE 2026 Champion Certificate",
      "Dedicated Champion Profile Spotlight & Recognition",
      "Dedicated Recognition for Their College / Institution",
      "DAVNS Executive Engineering Leadership Citation",
      "Permanent Inductee in the DAVNS Hall of Thinkers",
    ],
    highlight: true,
  },
  {
    tier: "TOP 5 PERFORMERS",
    rank: "RANKS #2 TO #5",
    icon: Star,
    cardBg: "bg-[#EDE9FE]/70 text-slate-900 border-[#7C3AED]/30 shadow-md",
    badgeBg: "bg-[#7C3AED] text-white",
    iconBg: "bg-white text-[#7C3AED]",
    titleColor: "text-slate-900",
    desc: "Top 5 elite performers with exceptional logical acumen and consistency.",
    benefits: [
      "Official Top Performer Achievement Certificate",
      "DAVNS PERSPECTIVE Global Leaderboard Feature",
      "Dedicated Recognition for Their Respective Colleges",
      "Fast-Track Invitation for DAVNS Advanced Engineering Programs",
    ],
    highlight: false,
  },
  {
    tier: "ACTIVE PARTICIPANTS",
    rank: "ALL ELIGIBLE",
    icon: Award,
    cardBg: "bg-white text-slate-900 border-slate-200 shadow-xs",
    badgeBg: "bg-slate-100 text-slate-800",
    iconBg: "bg-slate-100 text-slate-700",
    titleColor: "text-slate-900",
    desc: "Participants completing the 6-day challenge meeting evaluation requirements.",
    benefits: [
      "Official DAVNS Certificate of Participation",
      "Detailed Cognitive Performance & Aptitude Breakdown",
      "Verified Digital Credential for Academic & Resume Use",
    ],
    highlight: false,
  },
]

export function PerspectiveRecognition() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-200/80 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-[#7C3AED] text-xs font-mono font-bold tracking-wider uppercase mb-4">
            <Trophy className="w-3.5 h-3.5" />
            ACHIEVEMENT & AWARDS
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Recognition & Honors
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            DAVNS PERSPECTIVE does not focus on monetary prizes. Instead, the competition honors outstanding intellectual rigor through prestigious certificates and dedicated institutional distinction.
          </p>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch mb-12">
          {tiers.map((t, index) => {
            const Icon = t.icon
            return (
              <motion.div
                key={t.tier}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`rounded-[36px] p-8 border flex flex-col justify-between ${t.cardBg}`}
              >
                {t.highlight && (
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FACC15]/20 rounded-full blur-3xl pointer-events-none" />
                )}

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${t.iconBg}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${t.badgeBg}`}>
                      {t.rank}
                    </span>
                  </div>

                  <h3 className={`text-2xl font-extrabold tracking-tight mb-2 ${t.titleColor}`}>
                    {t.tier}
                  </h3>
                  <p className={`text-xs sm:text-sm font-light mb-6 leading-relaxed ${
                    t.highlight ? "text-slate-400" : "text-slate-600"
                  }`}>
                    {t.desc}
                  </p>

                  <div className={`pt-4 border-t ${t.highlight ? "border-white/10" : "border-slate-200/80"}`}>
                    <div className={`text-[11px] font-mono font-bold uppercase tracking-wider mb-3.5 ${
                      t.highlight ? "text-[#FACC15]" : "text-[#7C3AED]"
                    }`}>
                      HONORS & DELIVERABLES:
                    </div>
                    <ul className="space-y-3">
                      {t.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-xs sm:text-sm font-light leading-snug">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                            t.highlight ? "text-[#FACC15]" : "text-[#7C3AED]"
                          }`} />
                          <span className={t.highlight ? "text-slate-200" : "text-slate-800"}>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={`mt-8 pt-4 border-t text-center text-xs font-mono ${
                  t.highlight ? "border-white/10 text-slate-400" : "border-slate-200/80 text-slate-500"
                }`}>
                  VERIFIED DIGITAL CERTIFICATION
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Merit callout */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <div className="text-base font-extrabold text-slate-900 flex items-center justify-center sm:justify-start gap-2">
              <School className="w-5 h-5 text-[#7C3AED]" />
              Institutional Recognition for Colleges
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-light max-w-xl">
              Top performers bring pride and prominent recognition to their alma mater on the global DAVNS Perspective portal.
            </p>
          </div>
          <span className="px-5 py-2.5 rounded-full bg-slate-900 text-white font-mono text-xs font-bold shrink-0">
            MERIT-FIRST COGNITION
          </span>
        </div>

      </div>
    </section>
  )
}
