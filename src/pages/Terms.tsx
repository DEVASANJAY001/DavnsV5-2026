import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { AuroraBackground } from "@/components/aurora-background"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="min-h-screen relative overflow-hidden">
        <AuroraBackground />
        <div className="relative z-10">
          <GlassmorphismNav />
          <div className="pt-36 pb-20 px-4 md:px-6 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl font-light text-slate-900 mb-6 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-slate-500 text-xs font-mono mb-8 font-semibold">EFFECTIVE DATE: FEBRUARY 2025</p>

            <div className="space-y-8 text-slate-600 font-light leading-relaxed">
              <section className="p-7 rounded-3xl bg-white border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <h2 className="text-lg font-semibold text-slate-900 mb-2">1. Acceptance of Terms</h2>
                <p>
                  By accessing or engaging services provided by DAVNS Industries, you agree to comply with and be bound by these Terms of Service.
                </p>
              </section>

              <section className="p-7 rounded-3xl bg-white border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <h2 className="text-lg font-semibold text-slate-900 mb-2">2. Intellectual Property</h2>
                <p>
                  All custom code, trained models, and deliverables created specifically for clients under contract become the property of the client upon full payment, as specified in individual master service agreements.
                </p>
              </section>

              <section className="p-7 rounded-3xl bg-white border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <h2 className="text-lg font-semibold text-slate-900 mb-2">3. Service Availability</h2>
                <p>
                  While we strive for 99.9% uptime across our production platforms, DAVNS Industries provides systems under contracted Service Level Agreements (SLAs).
                </p>
              </section>
            </div>
          </div>
          <Footer />
        </div>
      </main>
    </div>
  )
}
