import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import Aurora from "@/components/Aurora"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Data Protection",
  description: "DAVNS Industries Privacy Policy. Learn how we value your privacy and are committed to protecting your personal information.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black">
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <Aurora colorStops={["#475569", "#64748b", "#475569"]} amplitude={1.2} blend={0.6} speed={0.8} />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />
          <div className="pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4 md:px-6">
              {/* Header */}
              <section className="mb-16">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
                  Privacy <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Policy</span>
                </h1>
                <div className="h-1 w-16 bg-gradient-to-r from-white to-gray-300 mb-8"></div>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                  At DAVNS Industries, we value your privacy and are committed to protecting your personal information.
                </p>
              </section>

              {/* Information We Collect */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Information We Collect</h2>
                <p className="text-lg text-white/70 mb-6">We may collect:</p>
                <div className="space-y-3 text-lg text-white/70">
                  <p className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">•</span>
                    <span>Name and contact details</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">•</span>
                    <span>Email address</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">•</span>
                    <span>Usage data (website interactions)</span>
                  </p>
                </div>
              </section>

              {/* How We Use Your Information */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">How We Use Your Information</h2>
                <p className="text-lg text-white/70 mb-6">We use your data to:</p>
                <div className="space-y-3 text-lg text-white/70">
                  <p className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">•</span>
                    <span>Provide and improve our services</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">•</span>
                    <span>Respond to inquiries and support requests</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">•</span>
                    <span>Enhance user experience</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">•</span>
                    <span>Communicate updates or important information</span>
                  </p>
                </div>
              </section>

              {/* Data Protection */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Data Protection</h2>
                <p className="text-lg text-white/70">
                  We implement appropriate security measures to protect your data from unauthorized access, alteration, or disclosure.
                </p>
              </section>

              {/* Third-Party Services */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Third-Party Services</h2>
                <p className="text-lg text-white/70">
                  We may use trusted third-party tools (e.g., analytics, hosting), but we do not sell your personal data.
                </p>
              </section>

              {/* Updates */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Policy Updates</h2>
                <p className="text-lg text-white/70">
                  This Privacy Policy may be updated from time to time. Changes will be reflected on this page.
                </p>
              </section>

              {/* Contact */}
              <section className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                <p className="text-lg text-white/70 mb-4">For any privacy-related concerns, contact us at:</p>
                <div className="space-y-2">
                  <a href="mailto:davnsindustries@outlook.com" className="block text-lg text-white font-semibold hover:text-white/80 transition-colors">
                    davnsindustries@outlook.com
                  </a>
                  <a href="mailto:davnsindustries@hotmail.com" className="block text-lg text-white font-semibold hover:text-white/80 transition-colors">
                    davnsindustries@hotmail.com
                  </a>
                </div>
              </section>
            </div>
          </div>
          <Footer />
        </div>
      </main>
    </div>
  )
}
