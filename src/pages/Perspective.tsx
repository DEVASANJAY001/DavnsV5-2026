import { useState, useEffect } from "react"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { PerspectiveHero } from "@/components/perspective/perspective-hero"
import { PerspectiveStatsCounter } from "@/components/perspective/perspective-stats-counter"
import { PerspectivePhilosophy } from "@/components/perspective/perspective-philosophy"
import { PerspectiveSchedule } from "@/components/perspective/perspective-schedule"
import { PerspectiveTestedSkills } from "@/components/perspective/perspective-tested-skills"
import { PerspectiveEligibility } from "@/components/perspective/perspective-eligibility"
import { PerspectiveHowItWorks } from "@/components/perspective/perspective-how-it-works"
import { PerspectiveFormatScoring } from "@/components/perspective/perspective-format-scoring"
import { PerspectiveRecognition } from "@/components/perspective/perspective-recognition"
import { PerspectiveWhyParticipate } from "@/components/perspective/perspective-why-participate"
import { PerspectiveFairPlayRules } from "@/components/perspective/perspective-fair-play-rules"
import { PerspectiveFAQ } from "@/components/perspective/perspective-faq"
import { PerspectiveFooterCTA } from "@/components/perspective/perspective-footer-cta"
import { PerspectiveRegisterModal } from "@/components/perspective/perspective-register-modal"
import { Sparkles, Trophy, ArrowRight } from "lucide-react"

export default function PerspectivePage() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [showFloatingButton, setShowFloatingButton] = useState(false)

  // Scroll listener for sticky register button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowFloatingButton(true)
      } else {
        setShowFloatingButton(false)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Update document title for SEO
  useEffect(() => {
    document.title = "DAVNS PERSPECTIVE 2026 | The Thinking Challenge"
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-purple-500/20 selection:text-purple-900">
      <main className="min-h-screen relative overflow-hidden">
        
        {/* Navigation */}
        <GlassmorphismNav />

        {/* Page Sections */}
        <div className="relative z-10">
          
          {/* 1. Hero Section with Live Countdown */}
          <PerspectiveHero onRegisterClick={() => setIsRegisterOpen(true)} />

          {/* 2. Key Numbers & Metrics Banner */}
          <PerspectiveStatsCounter />

          {/* 3. The Philosophy: What is DAVNS Perspective & How Do You Think? */}
          <PerspectivePhilosophy />

          {/* 4. The Six Days Schedule & Breakdown */}
          <PerspectiveSchedule />

          {/* 5. 10 Core Tested Skills Bento Grid */}
          <PerspectiveTestedSkills />

          {/* 6. Eligibility: Built for College Students */}
          <PerspectiveEligibility />

          {/* 7. How It Works (6-Stage Timeline) */}
          <PerspectiveHowItWorks />

          {/* 8. Competition Format & Scoring System */}
          <PerspectiveFormatScoring />

          {/* 9. Recognition & Honors (Champion, Top 5, Certificates) */}
          <PerspectiveRecognition />

          {/* 10. Why Participate */}
          <PerspectiveWhyParticipate />

          {/* 11. Fair Play & 11 Important Rules */}
          <PerspectiveFairPlayRules />

          {/* 12. FAQ Accordion */}
          <PerspectiveFAQ />

          {/* 13. High-Impact Closing Footer CTA */}
          <PerspectiveFooterCTA onRegisterClick={() => setIsRegisterOpen(true)} />

          {/* Global Site Footer */}
          <Footer />

        </div>

        {/* Floating Quick Registration Action Pill (Visible when scrolled) */}
        {showFloatingButton && (
          <div className="fixed bottom-6 right-6 z-40 animate-slide-up">
            <a
              href="https://unstop.com/o/B9nhYTp?lb=usehckjk&utm_medium=Share&utm_source=quizzes&utm_campaign=Davnsnlo59542"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 bg-[#FACC15] text-slate-950 px-5 py-3.5 rounded-full font-mono text-xs font-black shadow-2xl shadow-yellow-500/30 border border-yellow-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-slate-950" />
              <span>REGISTER ON UNSTOP</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        )}

        {/* Registration Modal Dialog (Optional Fallback / In-App Confirmation) */}
        <PerspectiveRegisterModal
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
        />

      </main>
    </div>
  )
}
