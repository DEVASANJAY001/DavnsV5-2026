import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sparkles, ArrowRight, Brain, Calendar, Trophy, Zap, Compass, CheckCircle2, ChevronRight, ExternalLink, Maximize2, ShieldCheck, Award } from "lucide-react"

export const UNSTOP_REGISTER_URL =
  "https://unstop.com/o/B9nhYTp?lb=usehckjk&utm_medium=Share&utm_source=quizzes&utm_campaign=Davnsnlo59542"

interface HeroProps {
  onRegisterClick?: () => void
}

const keyHighlights = [
  {
    icon: Calendar,
    title: "6 DAYS",
    subtitle: "SEPTEMBER 1–6, 2026",
    caption: "Consecutive Daily Rounds",
    badgeBg: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    iconColor: "text-amber-500",
  },
  {
    icon: Zap,
    title: "180 QUIZZES",
    subtitle: "30 CHALLENGES / DAY",
    caption: "Progressive Aptitude Complexity",
    badgeBg: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    iconColor: "text-purple-600",
  },
  {
    icon: Trophy,
    title: "ONE CHAMPION",
    subtitle: "COGNITIVE SUPREMACY",
    caption: "Official Citation & Honor",
    badgeBg: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    iconColor: "text-emerald-500",
  },
]

export function PerspectiveHero({ onRegisterClick }: HeroProps) {
  // Live countdown to September 1, 2026
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isPosterExpanded, setIsPosterExpanded] = useState(false)

  useEffect(() => {
    const targetDate = new Date("2026-09-01T09:00:00+05:30").getTime()
    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-start items-center px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-20 overflow-hidden bg-white">
      {/* Background gradients and subtle grid */}
      <div className="absolute inset-0 bg-dot-grid opacity-35 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_top,rgba(237,233,254,0.65),transparent_70%)] pointer-events-none" />
      <div className="absolute top-48 right-[-10%] w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(254,240,138,0.35),transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 text-center">
        
        {/* Live Event Status Banner Pill */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#EDE9FE] border border-[#7C3AED]/30 text-[#7C3AED] text-xs font-semibold tracking-wide shadow-xs mb-6 sm:mb-8 hover:scale-105 transition-transform"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C3AED] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7C3AED]" />
          </span>
          <span className="font-mono uppercase font-bold text-[10px] sm:text-[11px] tracking-wider">
            LIVE CHALLENGE • REGISTRATION OPEN
          </span>
          <span className="text-slate-400 hidden xs:inline">|</span>
          <span className="font-semibold text-slate-800 hidden xs:flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#7C3AED]" />
            SEPTEMBER 1–6, 2026
          </span>
        </motion.div>

        {/* Super Title & Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="space-y-3 sm:space-y-4 mb-6"
        >
          <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#7C3AED] font-bold">
            DAVNS INDUSTRIES PRESENTS
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[5.2rem] font-extrabold text-slate-900 tracking-tight leading-[1.1] max-w-5xl mx-auto break-words">
            DAVNS PERSPECTIVE{" "}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-[#FACC15] rounded-xl sm:rounded-2xl -rotate-1 scale-105" />
              <span className="relative px-2 sm:px-3 text-slate-950">2026</span>
            </span>
          </h1>

          <div className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight pt-1 sm:pt-2">
            <span className="text-gradient-violet">THE THINKING CHALLENGE</span>
          </div>

          <div className="text-xs sm:text-lg md:text-xl font-bold uppercase tracking-[0.2em] text-slate-500 font-mono">
            SEE BEYOND THE OBVIOUS.
          </div>
        </motion.div>

        {/* Core Subtitle Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-sm sm:text-base md:text-xl text-slate-600 font-light max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10 px-2"
        >
          A six-day competitive aptitude experience designed for college students who want to challenge their{" "}
          <strong className="font-semibold text-slate-900">logic, reasoning, analytical thinking, and problem-solving ability</strong>.
        </motion.p>

        {/* ── REDESIGNED: 3-Pillar Metric Bento Cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 max-w-4xl mx-auto mb-10 sm:mb-12 px-2"
        >
          {keyHighlights.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="relative rounded-2xl sm:rounded-3xl bg-slate-50/90 border border-slate-200/90 p-4 sm:p-5 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all text-left flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight font-mono">
                    {item.title}
                  </div>
                  <div className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                    {item.subtitle}
                  </div>
                  <div className="text-[10px] text-slate-400 font-light mt-0.5">
                    {item.caption}
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-12 sm:mb-14 px-4"
        >
          {/* Direct Unstop Registration Link */}
          <a
            href={UNSTOP_REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <button
              className="w-full sm:w-auto bg-[#FACC15] text-slate-950 hover:bg-yellow-400 rounded-full px-8 sm:px-10 py-4 sm:py-5 text-sm sm:text-base font-extrabold shadow-yellow transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>REGISTER ON UNSTOP</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </a>

          <a href="#schedule" className="w-full sm:w-auto">
            <button
              className="w-full sm:w-auto rounded-full px-8 py-4 sm:py-5 text-sm sm:text-base font-semibold border border-slate-300 hover:bg-slate-50 text-slate-800 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Explore 6-Day Schedule</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </a>
        </motion.div>

        {/* Live Countdown Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto bg-slate-50/90 border border-slate-200/90 rounded-[28px] p-5 sm:p-6 shadow-sm mb-14 backdrop-blur-sm"
        >
          <div className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center justify-center gap-2">
            <Brain className="w-4 h-4 text-[#7C3AED]" />
            COUNTDOWN TO CHALLENGE LAUNCH (SEP 1, 2026)
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {[
              { label: "DAYS", value: timeLeft.days },
              { label: "HOURS", value: timeLeft.hours },
              { label: "MINS", value: timeLeft.minutes },
              { label: "SECS", value: timeLeft.seconds },
            ].map((unit) => (
              <div key={unit.label} className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-3 border border-slate-200 shadow-2xs text-center">
                <div className="text-xl sm:text-4xl font-extrabold text-slate-900 font-mono tracking-tight">
                  {String(unit.value).padStart(2, "0")}
                </div>
                <div className="text-[9px] sm:text-xs text-slate-500 font-mono uppercase tracking-wider mt-0.5">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── REDESIGNED: Official Poster Showcase Studio Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto bg-slate-950 text-white rounded-[32px] sm:rounded-[36px] p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden mb-14 text-left"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#7C3AED]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FACC15]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid md:grid-cols-12 gap-6 sm:gap-10 items-center">
            
            {/* Left: Poster Image Frame */}
            <div className="md:col-span-5 flex justify-center">
              <div
                onClick={() => setIsPosterExpanded(true)}
                className="relative rounded-2xl overflow-hidden border border-white/20 bg-slate-900 group cursor-pointer shadow-2xl hover:shadow-purple-500/30 transition-all hover:scale-[1.02] max-w-[280px] w-full"
              >
                <img
                  src="/images/pre-post1.png"
                  alt="DAVNS Perspective 2026 Announcement Poster"
                  className="w-full h-auto object-cover max-h-[380px] transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
                
                {/* Floating overlay badge */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs font-mono font-bold text-white backdrop-blur-[2px]">
                  <Maximize2 className="w-4 h-4 text-[#FACC15]" />
                  <span>Click to Expand</span>
                </div>

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-mono text-[#FACC15] border border-white/10 font-bold">
                  OFFICIAL ANNOUNCEMENT
                </div>
              </div>
            </div>

            {/* Right: Editorial Overview & Key Actions */}
            <div className="md:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#FACC15] border border-white/15">
                <Sparkles className="w-3.5 h-3.5 text-[#FACC15]" />
                OFFICIAL LINKEDIN RELEASE
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  DAVNS PERSPECTIVE 2026
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mt-2">
                  The official challenge announcement as published across our channels. Six days of intensive, non-formula aptitude testing designed to discover exceptional analytical talent.
                </p>
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#FACC15] shrink-0" />
                  <span>Portal: <strong>Unstop Official</strong></span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#FACC15] shrink-0" />
                  <span>Fee: <strong>100% Free Entry</strong></span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#FACC15] shrink-0" />
                  <span>Eligibility: <strong>All College Students</strong></span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#FACC15] shrink-0" />
                  <span>Dates: <strong>Sep 1–6, 2026</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={UNSTOP_REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#FACC15] text-slate-950 hover:bg-yellow-400 px-6 py-3 rounded-full font-mono text-xs font-black tracking-wider uppercase transition-all shadow-yellow cursor-pointer hover:scale-105 active:scale-95"
                >
                  <span>Register on Unstop</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setIsPosterExpanded(true)}
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-mono text-xs font-semibold border border-white/15 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Expand Poster</span>
                </button>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Read. Think. Analyze. Decide. Micro Strip */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-mono text-slate-600">
          <span className="px-3 py-1 rounded-full bg-slate-100 font-semibold text-slate-800">1. READ</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
          <span className="px-3 py-1 rounded-full bg-slate-100 font-semibold text-slate-800">2. THINK</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
          <span className="px-3 py-1 rounded-full bg-slate-100 font-semibold text-slate-800">3. ANALYZE</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
          <span className="px-3 py-1 rounded-full bg-[#EDE9FE] font-bold text-[#7C3AED]">4. DECIDE</span>
        </div>

      </div>

      {/* Lightbox Modal for Poster View */}
      {isPosterExpanded && (
        <div
          onClick={() => setIsPosterExpanded(false)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in-simple cursor-zoom-out"
        >
          <div className="relative max-w-2xl max-h-[90vh] bg-slate-900 rounded-3xl overflow-hidden border border-white/20 shadow-2xl p-2.5">
            <img
              src="/images/pre-post1.png"
              alt="DAVNS Perspective 2026 LinkedIn Poster"
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
            />
            <div className="p-3 text-center flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs font-mono text-slate-300">DAVNS PERSPECTIVE 2026 • Official LinkedIn Release</span>
              <a
                href={UNSTOP_REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FACC15] text-slate-950 font-mono text-xs font-black hover:bg-yellow-400"
              >
                <span>Register on Unstop</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
