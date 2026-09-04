import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
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
import { SEOHead } from "@/components/seo-head"

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

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-purple-500/20 selection:text-purple-900">
      <SEOHead
        title="DAVNS PERSPECTIVE 2026 | The Thinking Challenge — Aptitude & Cognitive Competition"
        description="DAVNS PERSPECTIVE 2026 is a premier 6-day competitive aptitude and cognitive reasoning challenge for college students. 180 progressive quizzes testing logic, deduction, and problem solving."
        keywords="DAVNS PERSPECTIVE 2026, The Thinking Challenge, Cognitive Aptitude Competition, College Quiz Challenge, Unstop Hackathon 2026, Student Aptitude Test, Logic Challenge Chennai, DAVNS Industries"
        canonical="/perspective"
        ogType="website"
        structuredData={[
          {
            "@type": "Event",
            "name": "DAVNS PERSPECTIVE 2026 — The Thinking Challenge",
            "description": "A six-day competitive aptitude experience testing observation, multi-step deduction, critical thinking, strategic optimization, and cognitive problem-solving.",
            "startDate": "2026-09-01T09:00:00+05:30",
            "endDate": "2026-09-06T20:00:00+05:30",
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
            "location": {
              "@type": "VirtualLocation",
              "url": "https://unstop.com/o/B9nhYTp"
            },
            "organizer": {
              "@type": "Organization",
              "name": "DAVNS Industries",
              "url": "https://davns.com"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock",
              "url": "https://unstop.com/o/B9nhYTp"
            }
          }
        ]}
      />
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

        {/* Floating Quick Action Pill (Visible when scrolled) */}
        {showFloatingButton && (
          <div className="fixed bottom-6 right-6 z-40 animate-slide-up">
            <Link
              to="/perspective/scoreboard"
              className="group flex items-center gap-2.5 bg-[#FACC15] text-slate-950 px-5 py-3.5 rounded-full font-mono text-xs font-black shadow-2xl shadow-yellow-500/30 border border-yellow-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-slate-950" />
              <span>VIEW SCORE CARD</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
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
