import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import Aurora from "@/components/Aurora"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Legal Information",
  description: "DAVNS Industries Terms of Service. Review the rules and regulations for the use of our website and services.",
}

export default function TermsPage() {
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
                  Terms of <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Service</span>
                </h1>
                <div className="h-1 w-16 bg-gradient-to-r from-white to-gray-300 mb-8"></div>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                  By using DAVNS Industries services, you agree to the following terms and conditions.
                </p>
              </section>

              {/* Services */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Our Services</h2>
                <p className="text-lg text-white/70 mb-6">DAVNS Industries provides:</p>
                <div className="space-y-3 text-lg text-white/70">
                  <p className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">•</span>
                    <span>AI-based solutions</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">•</span>
                    <span>Software and product development</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">•</span>
                    <span>Custom technology services</span>
                  </p>
                </div>
              </section>

              {/* User Responsibilities */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">User Responsibilities</h2>
                <p className="text-lg text-white/70 mb-6">Users agree to:</p>
                <div className="space-y-3 text-lg text-white/70">
                  <p className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">•</span>
                    <span>Provide accurate information</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">•</span>
                    <span>Use services lawfully</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">•</span>
                    <span>Not misuse or disrupt our systems</span>
                  </p>
                </div>
              </section>

              {/* Intellectual Property */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Intellectual Property</h2>
                <p className="text-lg text-white/70">
                  All content, software, and solutions developed by DAVNS Industries remain our intellectual property unless otherwise agreed.
                </p>
              </section>

              {/* Limitation of Liability */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Limitation of Liability</h2>
                <p className="text-lg text-white/70 mb-6">DAVNS Industries is not liable for:</p>
                <div className="space-y-3 text-lg text-white/70">
                  <p className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">•</span>
                    <span>Indirect or consequential damages</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">•</span>
                    <span>Loss caused by misuse of services</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">•</span>
                    <span>External system failures beyond our control</span>
                  </p>
                </div>
              </section>

              {/* Modifications */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Modifications to Terms</h2>
                <p className="text-lg text-white/70">
                  We reserve the right to update or modify these terms at any time.
                </p>
              </section>

              {/* Contact */}
              <section className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                <p className="text-lg text-white/70 mb-4">If you have any questions about our Terms, please contact us at:</p>
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
