import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import Aurora from "@/components/Aurora"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | AI Automation Experts",
  description: "Learn about DAVNS Industries - a next-generation AI-driven startup building advanced platforms, intelligent products, and scalable technology solutions.",
}

export default function AboutPage() {
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
                  About <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">DAVNS Industries</span>
                </h1>
                <div className="h-1 w-16 bg-gradient-to-r from-white to-gray-300 mb-8"></div>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-6">
                  DAVNS Industries is a next-generation AI-driven startup focused on building advanced platforms, intelligent products, and scalable technology solutions.
                </p>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                  We combine research, innovation, and engineering excellence to solve real-world problems and create systems that enhance efficiency, accuracy, and user experience.
                </p>
              </section>

              {/* What We Do */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">What We Do</h2>
                <div className="space-y-4 text-lg text-white/70">
                  <p className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">•</span>
                    <span>Build AI-powered platforms and intelligent systems</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">•</span>
                    <span>Develop innovative products based on real-world challenges</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">•</span>
                    <span>Design automation solutions for industrial and enterprise environments</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">•</span>
                    <span>Deliver custom software and product development for clients</span>
                  </p>
                </div>
              </section>

              {/* Our Approach */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Our Approach</h2>
                <p className="text-lg text-white/70 mb-6">Our development process is driven by research and problem-solving:</p>
                <div className="space-y-4 text-lg text-white/70">
                  <p className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">1.</span>
                    <span>Identify real issues in existing systems</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">2.</span>
                    <span>Analyze inefficiencies and user pain points</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">3.</span>
                    <span>Build intelligent, scalable solutions</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">4.</span>
                    <span>Continuously improve through feedback and data</span>
                  </p>
                </div>
                <p className="text-xl font-semibold text-white mt-8 italic">We don&apos;t just build technology — we build meaningful solutions.</p>
              </section>

              {/* Innovation & R&D */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Innovation & R&D</h2>
                <p className="text-lg text-white/70 mb-6">Research and development is at the core of DAVNS. We actively explore:</p>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {["AI & Computer Vision", "Automation systems", "Real-time analytics", "Scalable platform architecture"].map((item) => (
                    <div key={item} className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <p className="text-white font-semibold">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="text-lg text-white/70">Our goal is to create future-ready products that adapt and evolve with user needs.</p>
              </section>

              {/* Our Commitment */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Our Commitment</h2>
                <div className="space-y-4 text-lg text-white/70">
                  <p className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">✓</span>
                    <span>Deliver high-quality, reliable systems</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">✓</span>
                    <span>Build long-term client relationships</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">✓</span>
                    <span>Focus on performance, scalability, and usability</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">✓</span>
                    <span>Continuously innovate and improve</span>
                  </p>
                </div>
              </section>

              {/* Mission & Vision */}
              <section className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                  <p className="text-lg text-white/70">
                    To build intelligent systems that simplify complexity and improve real-world operations through innovation and technology.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                  <p className="text-lg text-white/70">
                    To become a global leader in AI-driven platforms and product innovation, transforming how industries and users interact with technology.
                  </p>
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
