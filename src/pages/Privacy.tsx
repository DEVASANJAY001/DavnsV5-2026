import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { AuroraBackground } from "@/components/aurora-background"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="min-h-screen relative overflow-hidden">
        <AuroraBackground />
        <div className="relative z-10">
          <GlassmorphismNav />
          <div className="pt-36 pb-20 px-4 md:px-6 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl font-light text-slate-900 mb-6 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-slate-500 text-xs font-mono mb-8 font-semibold">LAST UPDATED: FEBRUARY 2025</p>

            <div className="space-y-8 text-slate-600 font-light leading-relaxed">
              <section className="p-7 rounded-3xl bg-white border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <h2 className="text-lg font-semibold text-slate-900 mb-2">1. Data Isolation & Sovereignty</h2>
                <p>
                  DAVNS Industries enforces strict multi-tenant isolation. Customer data processed through our AI models or custom software is never used to train third-party public models.
                </p>
              </section>

              <section className="p-7 rounded-3xl bg-white border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <h2 className="text-lg font-semibold text-slate-900 mb-2">2. Information We Collect</h2>
                <p>
                  We collect information provided directly through inquiries, project specifications, and telemetry APIs strictly to deliver and maintain contracted enterprise solutions.
                </p>
              </section>

              <section className="p-7 rounded-3xl bg-white border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <h2 className="text-lg font-semibold text-slate-900 mb-2">3. Security Standards</h2>
                <p>
                  All data in transit is encrypted using TLS 1.3, and data at rest utilizes AES-256 encryption. We adhere to industry best practices for access control and vulnerability management.
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
