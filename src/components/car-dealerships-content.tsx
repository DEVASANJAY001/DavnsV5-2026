import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { AuroraBackground } from "@/components/aurora-background"
import { DealershipHeroHeader } from "@/components/dealership-hero-header"
import { AITeamSection } from "@/components/ai-team-section"
import { FAQSection } from "@/components/faq-section"
import { CTABanner } from "@/components/cta-banner"
import { Clock, Users, Zap, DollarSign } from "lucide-react"

const dealershipFAQs = [
  {
    question: "How does Clutch 1.0 integrate with our existing dealership CRM?",
    answer: "We connect directly to your CRM (e.g., Salesforce, CDK Global, DealerSocket, Zoho) via secure webhooks and REST APIs. Leads, test drive reservations, and financing inquiries are synced instantaneously.",
  },
  {
    question: "Can the AI handle WhatsApp inquiries and phone text messages?",
    answer: "Yes. Clutch 1.0 integrates directly with the official WhatsApp Business API, Web Chat widgets, and SMS routing so buyers can communicate in their preferred channels.",
  },
  {
    question: "How long does dealership onboarding and setup take?",
    answer: "Full onboarding typically completes in 5 to 7 business days, including model calibration with your active vehicle inventory and team training.",
  },
]

export function CarDealershipsContent() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="min-h-screen relative overflow-hidden">
        <AuroraBackground />
        
        <div className="relative z-10">
          <GlassmorphismNav />
          
          <div className="pt-36 pb-20">

            <div className="max-w-6xl mx-auto px-4 md:px-6 mb-20">
              <DealershipHeroHeader />
            </div>

            {/* Metrics */}
            <section className="py-14 px-4 md:px-6 border-y border-slate-200/80 bg-slate-50/70 backdrop-blur-xl mb-20">
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <Clock className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                    <div className="text-3xl md:text-5xl font-light text-slate-900 mb-1 tracking-tight font-mono">&lt; 30s</div>
                    <div className="text-xs text-slate-500 font-mono uppercase tracking-wider">Lead Response Time</div>
                  </div>

                  <div>
                    <Users className="w-5 h-5 text-emerald-600 mx-auto mb-2" />
                    <div className="text-3xl md:text-5xl font-light text-slate-900 mb-1 tracking-tight font-mono">3×</div>
                    <div className="text-xs text-slate-500 font-mono uppercase tracking-wider">Lead Conversion Uplift</div>
                  </div>

                  <div>
                    <Zap className="w-5 h-5 text-indigo-600 mx-auto mb-2" />
                    <div className="text-3xl md:text-5xl font-light text-slate-900 mb-1 tracking-tight font-mono">24/7</div>
                    <div className="text-xs text-slate-500 font-mono uppercase tracking-wider">Autonomous Operation</div>
                  </div>

                  <div>
                    <DollarSign className="w-5 h-5 text-purple-600 mx-auto mb-2" />
                    <div className="text-3xl md:text-5xl font-light text-slate-900 mb-1 tracking-tight font-mono">120+ hrs</div>
                    <div className="text-xs text-slate-500 font-mono uppercase tracking-wider">Staff Hours Saved / Mo</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Live Chat Simulator */}
            <AITeamSection />

            {/* FAQ */}
            <FAQSection
              faqs={dealershipFAQs}
              title="Dealership AI FAQ"
              subtitle="Common questions regarding inventory synchronization, response latency, and CRM connectors."
            />

            {/* CTA */}
            <CTABanner
              title="Ready to supercharge your dealership sales desk?"
              description="Schedule a technical walkthrough and see Clutch 1.0 connected to live vehicle inventory."
              primaryLabel="Book Dealership Demo"
              primaryHref="/get-started"
              secondaryLabel="Contact Engineering"
              secondaryHref="/contact"
            />

          </div>

          <Footer />
        </div>
      </main>
    </div>
  )
}
