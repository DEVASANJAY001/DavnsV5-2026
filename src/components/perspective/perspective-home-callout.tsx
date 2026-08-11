import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Trophy, Brain, Sparkles, ArrowRight, Calendar, Zap, ExternalLink, Image as ImageIcon } from "lucide-react"

export function PerspectiveHomeCallout() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-950 text-white rounded-[32px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl border border-slate-800"
        >
          {/* Ambient light glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#7C3AED]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FACC15]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#7C3AED]/30 border border-[#7C3AED]/50 text-[#FACC15] text-xs font-mono font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#FACC15] animate-pulse" />
                  LIVE EVENT • REGISTRATION OPEN
                </span>
                <span className="text-xs font-mono text-slate-400">
                  SEPTEMBER 1–6, 2026
                </span>
              </div>

              <div>
                <div className="text-xs sm:text-sm font-mono text-[#7C3AED] font-bold uppercase tracking-widest mb-1">
                  DAVNS PERSPECTIVE 2026
                </div>
                <h3 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  The Thinking Challenge:{" "}
                  <span className="text-gradient-warm">See Beyond the Obvious.</span>
                </h3>
              </div>

              <p className="text-xs sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl">
                A six-day competitive aptitude experience designed exclusively for college students. 
                Zero formula memorization — test your pure logic, reasoning, and problem-solving ability.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 pt-1">
                <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs font-mono text-slate-200 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#FACC15]" />
                  6 Days
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs font-mono text-slate-200 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-purple-300" />
                  180 Quizzes
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs font-mono text-slate-200 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-emerald-400" />
                  One Champion
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link to="/perspective" className="w-full sm:w-auto">
                  <button className="w-full bg-[#FACC15] text-slate-950 hover:bg-yellow-400 py-3.5 px-6 rounded-full font-mono text-xs font-black uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 shadow-yellow flex items-center justify-center gap-2 cursor-pointer">
                    <span>View Challenge Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>

                <a
                  href="https://unstop.com/o/B9nhYTp?lb=usehckjk&utm_medium=Share&utm_source=quizzes&utm_campaign=Davnsnlo59542"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <button className="w-full bg-white/10 hover:bg-white/15 text-white border border-white/20 py-3.5 px-6 rounded-full font-mono text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer">
                    <span>Register on Unstop</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#FACC15]" />
                  </button>
                </a>
              </div>
            </div>

            {/* Right Poster Thumbnail Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <Link
                to="/perspective"
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-slate-900 group shadow-2xl hover:shadow-purple-500/25 transition-all hover:scale-[1.02] max-w-sm w-full block"
              >
                <img
                  src="/images/pre-post1.png"
                  alt="DAVNS Perspective 2026 Announcement Poster"
                  className="w-full h-auto object-cover max-h-[360px] transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-left">
                  <span className="text-[10px] font-mono text-[#FACC15] uppercase tracking-wider font-bold">
                    OFFICIAL LINKEDIN RELEASE
                  </span>
                  <div className="text-sm font-bold text-white flex items-center justify-between mt-0.5">
                    <span>Explore Perspective 2026</span>
                    <ArrowRight className="w-4 h-4 text-[#FACC15] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
