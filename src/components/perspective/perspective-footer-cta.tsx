import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Trophy, Calendar, Zap, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const UNSTOP_REGISTER_URL =
  "https://unstop.com/o/B9nhYTp?lb=usehckjk&utm_medium=Share&utm_source=quizzes&utm_campaign=Davnsnlo59542"

interface FooterCTAProps {
  onRegisterClick?: () => void
}

export function PerspectiveFooterCTA({ onRegisterClick }: FooterCTAProps) {
  return (
    <section className="relative bg-slate-950 text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Dynamic glow mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(124,58,237,0.25),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(250,204,21,0.18),transparent_60%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center space-y-10">
        
        {/* Top Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#FACC15] text-xs font-mono font-bold uppercase tracking-wider"
        >
          <Sparkles className="w-3.5 h-3.5" />
          THE FINAL SUMMONS
        </motion.div>

        {/* 6 DAYS • 180 QUIZZES • ONE CHAMPION */}
        <div className="space-y-3">
          <div className="text-xl sm:text-2xl font-mono font-bold tracking-widest text-[#FACC15]">
            6 DAYS. 180 QUIZZES. ONE CHAMPION.
          </div>
          
          <p className="text-slate-400 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
            Your college gives you a background.
            <br />
            Your knowledge gives you a foundation.
            <br />
            <span className="text-slate-200">But when the answer isn't obvious—</span>
          </p>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight pt-2">
            YOUR THINKING MAKES{" "}
            <span className="text-gradient-warm">THE DIFFERENCE.</span>
          </h2>
        </div>

        {/* Brand Taglines */}
        <div className="space-y-1">
          <div className="text-base sm:text-lg font-bold text-white tracking-wide">
            DAVNS PERSPECTIVE 2026
          </div>
          <div className="text-xs sm:text-sm font-mono text-[#7C3AED] font-bold tracking-[0.2em] uppercase">
            THE THINKING CHALLENGE • SEE BEYOND THE OBVIOUS.
          </div>
        </div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={UNSTOP_REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto bg-[#FACC15] text-slate-950 hover:bg-yellow-400 rounded-full px-10 py-7 text-base font-extrabold shadow-yellow transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>REGISTER NOW ON UNSTOP — FREE ENTRY</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>

          <Link to="/" className="w-full sm:w-auto">
            <button
              className="w-full sm:w-auto rounded-full px-8 py-5 text-sm sm:text-base font-bold bg-white/10 text-white hover:bg-white/20 border border-white/25 transition-all hover:scale-105 active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore DAVNS Industries</span>
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </button>
          </Link>
        </motion.div>

        {/* Event Quick Bar */}
        <div className="pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-left text-xs font-mono text-slate-400">
          <div>
            <div className="text-slate-500 uppercase text-[10px]">EVENT</div>
            <div className="text-white font-bold">DAVNS Perspective 2026</div>
          </div>
          <div>
            <div className="text-slate-500 uppercase text-[10px]">ORGANIZER</div>
            <div className="text-white font-bold">DAVNS INDUSTRIES</div>
          </div>
          <div>
            <div className="text-slate-500 uppercase text-[10px]">DATES</div>
            <div className="text-white font-bold">September 1–6, 2026</div>
          </div>
          <div>
            <div className="text-slate-500 uppercase text-[10px]">FORMAT</div>
            <div className="text-[#FACC15] font-bold">6 Days • 180 Quizzes</div>
          </div>
        </div>

        {/* Quick Nav Anchors */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 pt-4">
          <a
            href={UNSTOP_REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors cursor-pointer"
          >
            Register on Unstop
          </a>
          <span>•</span>
          <a href="#schedule" className="hover:text-white transition-colors">
            Schedule
          </a>
          <span>•</span>
          <a href="#rules" className="hover:text-white transition-colors">
            Official Rules
          </a>
          <span>•</span>
          <a href="#faq" className="hover:text-white transition-colors">
            FAQ
          </a>
          <span>•</span>
          <Link to="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
          <span>•</span>
          <Link to="/" className="hover:text-white transition-colors">
            DAVNS Industries Home
          </Link>
        </div>

      </div>
    </section>
  )
}
