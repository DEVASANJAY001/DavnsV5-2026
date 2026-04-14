"use client"

import { useRef, useState } from "react"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import Aurora from "@/components/Aurora"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Send } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { sendEmail } from "@/lib/emailjs"

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    setIsSubmitting(true)
    const response = await sendEmail(formRef.current)
    setIsSubmitting(false)

    if (response.success) {
      setIsSubmitted(true)
      formRef.current.reset()
    } else {
      toast.error("Failed to send message. Please try again.")
    }
  }

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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Contact <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent italic underline decoration-slate-500/50 underline-offset-8 decoration-2">Us</span>
                </h1>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                  Have a question or want to work together? We'd love to hear from you.
                </p>
              </motion.div>

              {/* Contact Form or Success Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-8 md:p-12 rounded-[2.5rem] shadow-2xl backdrop-blur-md min-h-[500px] flex flex-col justify-center"
              >
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-6"
                  >
                    <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Send className="w-10 h-10 text-white animate-pulse" />
                    </div>
                    <h2 className="text-3xl font-bold text-white italic">Message Sent!</h2>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      Thank you for reaching out. Our team has received your message and will get back to you within 24 hours.
                    </p>
                    <div className="pt-6">
                      <Button
                        onClick={() => setIsSubmitted(false)}
                        variant="outline"
                        className="rounded-full border-white/20 text-white hover:bg-white/10 px-8"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-white ml-1">Name</label>
                        <input
                          name="user_name"
                          required
                          type="text"
                          placeholder="Your name"
                          onChange={(e) => {
                            const val = e.target.value;
                            const form = e.target.form;
                            if (form) {
                              (form.elements.namedItem('from_name') as HTMLInputElement).value = val;
                              (form.elements.namedItem('name') as HTMLInputElement).value = val;
                            }
                          }}
                          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                        />
                        <input type="hidden" name="from_name" />
                        <input type="hidden" name="name" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-white ml-1">Email</label>
                        <input
                          name="user_email"
                          required
                          type="email"
                          placeholder="your@email.com"
                          onChange={(e) => {
                            const val = e.target.value;
                            const form = e.target.form;
                            if (form) {
                              (form.elements.namedItem('email') as HTMLInputElement).value = val;
                              (form.elements.namedItem('from_email') as HTMLInputElement).value = val;
                              (form.elements.namedItem('reply_to') as HTMLInputElement).value = val;
                            }
                          }}
                          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                        />
                        <input type="hidden" name="email" />
                        <input type="hidden" name="from_email" />
                        <input type="hidden" name="reply_to" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-white ml-1">Subject</label>
                      <input
                        name="subject"
                        required
                        type="text"
                        placeholder="What is this about?"
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-white ml-1">Message</label>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        placeholder="Tell us about your project or requirements..."
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors resize-none"
                      ></textarea>
                    </div>
                    <div className="pt-4">
                      <Button
                        disabled={isSubmitting}
                        className="w-full bg-white text-black hover:bg-gray-100 rounded-full py-7 text-lg font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group disabled:opacity-50"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                        {!isSubmitting && <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                      </Button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
          <Footer />
        </div>
      </main>
    </div>
  )
}
