"use client"

import { useRef, useState } from "react"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { AuroraBackground } from "@/components/aurora-background"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Send, Clock, Linkedin, Youtube, Instagram } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { sendEmail } from "@/lib/emailjs"
import Link from "next/link"

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact DAVNS Industries",
  url: "https://davns.com/contact",
  description: "Get in touch with DAVNS Industries in Chennai, India for AI automation, custom software, and enterprise platform development enquiries.",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://davns.com" },
      { "@type": "ListItem", position: 2, name: "Contact", item: "https://davns.com/contact" },
    ],
  },
  mainEntity: {
    "@type": "Organization",
    name: "DAVNS Industries",
    url: "https://davns.com",
    email: "davnsindustries@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN"
    },
    areaServed: ["IN", "US", "GB", "AE"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "davnsindustries@gmail.com",
      availableLanguage: ["English", "Tamil"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    },
  },
}

const contactInfo = [
  {
    icon: Mail,
    label: "Email Us",
    value: "davnsindustries@gmail.com",
    href: "mailto:davnsindustries@gmail.com",
    note: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    label: "Based In",
    value: "Chennai, India",
    href: null,
    note: "Serving clients globally",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon – Fri, 9AM – 6PM IST",
    href: null,
    note: "Async responses on weekends",
  },
]

const socials = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/davnsindustriesoffi",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com/@davnsindustries",
  },
  {
    icon: Youtube,
    label: "YouTube",
    href: "https://www.youtube.com/@davns",
  },
]

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <AuroraBackground colorStops={["#1e293b", "#334155", "#1e293b"]} amplitude={0.9} blend={0.5} speed={0.7} />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />
          <div className="pt-32 pb-20">
            <div className="max-w-5xl mx-auto px-4 md:px-6">

              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-center mb-16"
              >
                <div className="inline-flex items-center gap-2 text-white/50 text-xs font-medium tracking-widest uppercase mb-6">
                  <div className="w-6 h-px bg-white/30" />
                  Get In Touch
                  <div className="w-6 h-px bg-white/30" />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight">
                  Contact{" "}
                  <span className="font-semibold italic bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    DAVNS Industries
                  </span>
                </h1>
                <div className="h-px w-20 bg-gradient-to-r from-white/60 to-transparent mx-auto mb-8" />
                <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
                  Whether you have a project in mind, a question about our services, or want to explore a partnership — we&apos;d love to hear from you.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">

                {/* Left — Contact Info + Socials */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className="md:col-span-1 space-y-6"
                >
                  {/* Contact Info Cards */}
                  {contactInfo.map((item) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={item.label}
                        className="border border-white/10 rounded-xl p-5 bg-white/[0.02]"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-white/70" />
                          </div>
                          <span className="text-xs text-white/40 font-medium uppercase tracking-widest">{item.label}</span>
                        </div>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-white font-medium hover:text-white/80 transition-colors text-sm block mb-1"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-white font-medium text-sm mb-1">{item.value}</p>
                        )}
                        <p className="text-white/40 text-xs">{item.note}</p>
                      </div>
                    )
                  })}

                  {/* Social Links */}
                  <div className="border border-white/10 rounded-xl p-5 bg-white/[0.02]">
                    <p className="text-xs text-white/40 font-medium uppercase tracking-widest mb-4">Follow Us</p>
                    <div className="space-y-3">
                      {socials.map((social) => {
                        const Icon = social.icon
                        return (
                          <Link
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors">
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium">{social.label}</span>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>

                {/* Right — Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="md:col-span-2"
                >
                  <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 p-8 md:p-10 rounded-2xl backdrop-blur-md min-h-[500px] flex flex-col justify-center">
                    {isSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-6"
                      >
                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
                          <Send className="w-9 h-9 text-white" />
                        </div>
                        <h2 className="text-3xl font-semibold text-white">Message Sent!</h2>
                        <p className="text-white/60 text-lg leading-relaxed">
                          Thank you for reaching out. Our team will respond to your message within 24 business hours.
                        </p>
                        <div className="pt-4">
                          <Button
                            onClick={() => setIsSubmitted(false)}
                            variant="outline"
                            className="rounded-xl border-white/20 text-white hover:bg-white/10 px-8"
                          >
                            Send Another Message
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-1.5">
                            <label htmlFor="contact-name" className="text-sm font-medium text-white/70">Name</label>
                            <input
                              id="contact-name"
                              name="user_name"
                              required
                              type="text"
                              placeholder="Your full name"
                              onChange={(e) => {
                                const val = e.target.value
                                const form = e.target.form
                                if (form) {
                                  (form.elements.namedItem("from_name") as HTMLInputElement).value = val
                                  ;(form.elements.namedItem("name") as HTMLInputElement).value = val
                                }
                              }}
                              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-white/35 transition-colors text-sm"
                            />
                            <input type="hidden" name="from_name" />
                            <input type="hidden" name="name" />
                          </div>
                          <div className="space-y-1.5">
                            <label htmlFor="contact-email" className="text-sm font-medium text-white/70">Email</label>
                            <input
                              id="contact-email"
                              name="user_email"
                              required
                              type="email"
                              placeholder="your@email.com"
                              onChange={(e) => {
                                const val = e.target.value
                                const form = e.target.form
                                if (form) {
                                  (form.elements.namedItem("email") as HTMLInputElement).value = val
                                  ;(form.elements.namedItem("from_email") as HTMLInputElement).value = val
                                  ;(form.elements.namedItem("reply_to") as HTMLInputElement).value = val
                                }
                              }}
                              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-white/35 transition-colors text-sm"
                            />
                            <input type="hidden" name="email" />
                            <input type="hidden" name="from_email" />
                            <input type="hidden" name="reply_to" />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label htmlFor="contact-company" className="text-sm font-medium text-white/70">Company (Optional)</label>
                          <input
                            id="contact-company"
                            name="company"
                            type="text"
                            placeholder="Your company name"
                            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-white/35 transition-colors text-sm"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label htmlFor="contact-subject" className="text-sm font-medium text-white/70">Subject</label>
                          <input
                            id="contact-subject"
                            name="subject"
                            required
                            type="text"
                            placeholder="What can we help you with?"
                            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-white/35 transition-colors text-sm"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label htmlFor="contact-message" className="text-sm font-medium text-white/70">Message</label>
                          <textarea
                            id="contact-message"
                            name="message"
                            required
                            rows={5}
                            placeholder="Tell us about your project, requirements, or questions..."
                            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-white/35 transition-colors resize-none text-sm"
                          />
                        </div>

                        <div className="pt-2">
                          <Button
                            disabled={isSubmitting}
                            id="contact-submit"
                            className="w-full bg-white text-black hover:bg-gray-100 rounded-xl py-6 text-base font-semibold transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] group disabled:opacity-50"
                          >
                            {isSubmitting ? "Sending..." : "Send Message"}
                            {!isSubmitting && <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                          </Button>
                        </div>
                      </form>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </main>
    </div>
  )
}
