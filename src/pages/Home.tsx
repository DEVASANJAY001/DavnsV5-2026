import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { HeroSection } from "@/components/hero-section"
import { IsometricIntegrationWave } from "@/components/isometric-integration-wave"
import { ModularPossibilitiesBento } from "@/components/modular-possibilities-bento"
import { HowItWorksCarousel } from "@/components/how-it-works-carousel"
import { WhyDavnsSection } from "@/components/why-davns-section"
import { DualJourneyBento } from "@/components/dual-journey-bento"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="min-h-screen relative overflow-hidden">
        <div className="relative z-10">
          <GlassmorphismNav />
          {/* 1. Hero - white bg */}
          <HeroSection />
          {/* 2. Integrations - dark bg (slate-950) */}
          <IsometricIntegrationWave />
          {/* 3. Modular Possibilities - white bg (top fade from dark) */}
          <ModularPossibilitiesBento />
          {/* 4. How We Build - slate-50 bg */}
          <HowItWorksCarousel />
          {/* 5. Why DAVNS - white bg */}
          <WhyDavnsSection />
          {/* 6. Dual Journey - white bg */}
          <DualJourneyBento />
          {/* 7. Testimonials - dark bg */}
          <TestimonialsSection />
          {/* 8. Footer - dark with CTA */}
          <Footer />
        </div>
      </main>
    </div>
  )
}
