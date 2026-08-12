import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { PerspectiveScoreboardHero } from "@/components/perspective/perspective-scoreboard-hero"
import { PerspectiveCollegeLeaderboard } from "@/components/perspective/perspective-college-leaderboard"
import { PerspectiveStudentLeaderboard } from "@/components/perspective/perspective-student-leaderboard"
import { PerspectiveScoreMethodology } from "@/components/perspective/perspective-score-methodology"
import { PerspectiveRegisteredCollegesShowcase } from "@/components/perspective/perspective-registered-colleges-showcase"
import {
  subscribeParticipants,
  subscribeColleges,
  subscribePerspectiveConfig,
  Participant,
  College,
  PerspectiveConfig,
} from "@/lib/scoreboard-service"
import { ArrowLeft, RefreshCw, ExternalLink } from "lucide-react"

// Challenge live window: Sep 1–6, 2026
const CHALLENGE_START = new Date("2026-09-01T00:00:00+05:30").getTime()
const CHALLENGE_END   = new Date("2026-09-06T23:59:59+05:30").getTime()

export default function PerspectiveScoreboardPage() {
  const [participants, setParticipants] = useState<Participant[]>([])
  const [colleges, setColleges] = useState<College[]>([])
  const [config, setConfig] = useState<PerspectiveConfig>({
    displayMode: "colleges_only",
    isLeaderboardPublished: false,
  })
  const [loading, setLoading] = useState(true)

  const now = Date.now()
  const isLive = now >= CHALLENGE_START && now <= CHALLENGE_END

  useEffect(() => {
    document.title =
      config.displayMode === "colleges_only"
        ? "DAVNS Perspective 2026 — Registered Colleges Directory"
        : "DAVNS Perspective 2026 — Score Card & Leaderboard"
  }, [config.displayMode])

  useEffect(() => {
    setLoading(true)
    const unsubP = subscribeParticipants((data) => {
      setParticipants(data)
      setLoading(false)
    })
    const unsubC = subscribeColleges((data) => setColleges(data))
    const unsubCfg = subscribePerspectiveConfig((cfg) => setConfig(cfg))

    return () => {
      unsubP()
      unsubC()
      unsubCfg()
    }
  }, [])

  const isLeaderboardMode =
    config.displayMode === "leaderboard" || config.isLeaderboardPublished

  const visibleColleges = colleges.filter((c) => !c.isHidden)
  const visibleParticipants = participants.filter((p) => !p.isHidden)

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-purple-500/20 selection:text-purple-900">
      <GlassmorphismNav />

      <main>
        {/* Loading skeleton */}
        {loading ? (
          <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <div className="flex items-center gap-3 text-white font-mono text-xs">
              <RefreshCw className="w-5 h-5 text-[#7C3AED] animate-spin" />
              LOADING PERSPECTIVE 2026 DATA...
            </div>
          </div>
        ) : isLeaderboardMode ? (
          /* ── MODE 1: FULL LIVE LEADERBOARD / PUBLISHED RESULTS ── */
          <>
            {/* 1. Hero with live stats */}
            <PerspectiveScoreboardHero
              participants={visibleParticipants}
              colleges={visibleColleges}
              isLive={isLive}
            />

            {/* 2. College Rankings */}
            <PerspectiveCollegeLeaderboard colleges={visibleColleges} />

            {/* 3. Student Individual Rankings */}
            <PerspectiveStudentLeaderboard
              participants={visibleParticipants}
              colleges={visibleColleges}
            />

            {/* 4. Score Methodology */}
            <PerspectiveScoreMethodology />

            {/* 5. Register CTA strip */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
              <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
                <div>
                  <div className="text-lg font-extrabold text-slate-900">
                    Not yet registered?
                  </div>
                  <div className="text-sm text-slate-500 font-light">
                    Register free on Unstop before the challenge begins on September 1, 2026.
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    to="/perspective"
                    className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-700 text-xs font-mono font-semibold hover:bg-slate-50 transition-all"
                  >
                    View Challenge Details
                  </Link>
                  <a
                    href="https://unstop.com/o/B9nhYTp?lb=usehckjk&utm_medium=Share&utm_source=quizzes&utm_campaign=Davnsnlo59542"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FACC15] text-slate-950 hover:bg-yellow-400 text-xs font-mono font-extrabold tracking-wider uppercase transition-all hover:scale-105 shadow-sm"
                  >
                    Register on Unstop
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </section>

            <Footer />
          </>
        ) : (
          /* ── MODE 2: REGISTERED COLLEGES SHOWCASE (PRE-CHALLENGE) ── */
          <>
            {/* 1. Registered Institutions Directory */}
            <PerspectiveRegisteredCollegesShowcase
              colleges={visibleColleges}
              hideStudentCounts={Boolean(config.hideStudentCounts)}
            />

            {/* 2. Score Methodology Explainer */}
            <PerspectiveScoreMethodology />

            {/* 3. Register CTA strip */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
              <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
                <div>
                  <div className="text-lg font-extrabold text-slate-900">
                    Want your college represented?
                  </div>
                  <div className="text-sm text-slate-500 font-light">
                    Register individually on Unstop. Your college will be added to the official leaderboard automatically.
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    to="/perspective"
                    className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-700 text-xs font-mono font-semibold hover:bg-slate-50 transition-all"
                  >
                    Challenge Details
                  </Link>
                  <a
                    href="https://unstop.com/o/B9nhYTp?lb=usehckjk&utm_medium=Share&utm_source=quizzes&utm_campaign=Davnsnlo59542"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FACC15] text-slate-950 hover:bg-yellow-400 text-xs font-mono font-extrabold tracking-wider uppercase transition-all hover:scale-105 shadow-sm"
                  >
                    Register on Unstop
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </section>

            <Footer />
          </>
        )}
      </main>
    </div>
  )
}
