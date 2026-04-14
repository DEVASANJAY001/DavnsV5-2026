import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import Aurora from "@/components/Aurora"
import { Button } from "@/components/ui/button"
import { Mail, MapPin } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | Get in Touch",
  description: "Reach out to DAVNS Industries for AI collaborations, product development, or custom automation solutions. Let's build the future together.",
}

export default function ContactPage() {
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
              <section className="mb-16 text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
                  Contact <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Us</span>
                </h1>
                <div className="h-1 w-16 bg-gradient-to-r from-white to-gray-300 mb-8 mx-auto"></div>
                <p className="text-lg md:text-xl text-white/80 mb-8">
                  Let&apos;s build something impactful together. Reach out to DAVNS Industries for collaborations, product development, or custom solutions.
                </p>
              </section>

              {/* Contact Info */}
              <section className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-lg p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <Mail className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                      <div className="space-y-2">
                        <a href="mailto:davnsindustries@outlook.com" className="block text-lg text-white/70 hover:text-white transition-colors">
                          davnsindustries@outlook.com
                        </a>
                        <a href="mailto:davnsindustries@hotmail.com" className="block text-lg text-white/70 hover:text-white transition-colors">
                          davnsindustries@hotmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Location</h3>
                      <p className="text-lg text-white/70">India</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Message Section */}
              <section className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-lg p-8 md:p-12 mb-16">
                <h2 className="text-3xl font-bold text-white mb-6">Send us a Message</h2>
                <p className="text-lg text-white/70 mb-8">
                  Have a project idea or need a solution? Tell us about your requirements, and our team will get back to you with the best approach.
                </p>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">Name</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Subject</label>
                    <input
                      type="text"
                      placeholder="What is this about?"
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Message</label>
                    <textarea
                      rows={6}
                      placeholder="Tell us about your project or requirements..."
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors resize-none"
                    ></textarea>
                  </div>

                  <div className="flex justify-center pt-4">
                    <Button className="bg-white text-black rounded-full px-12 py-3 text-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                      Send Message
                    </Button>
                  </div>
                </form>
              </section>

              {/* CTA */}
              <section className="text-center">
                <p className="text-xl text-white/70 mb-6">
                  Looking for something specific? Check out our <a href="/about" className="text-white font-semibold hover:text-white/80">About page</a> to learn more about what we do.
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
