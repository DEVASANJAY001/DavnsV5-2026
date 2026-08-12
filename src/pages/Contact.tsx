import { useState } from "react"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mail, MapPin, Phone, MessageSquare, Send, CheckCircle2,
  Sparkles, ArrowRight, ShieldCheck, Clock, Zap, ExternalLink
} from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="min-h-screen relative overflow-hidden">
        <GlassmorphismNav />

        <div className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">

          {/* ── Page Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700 text-xs font-mono mb-4 tracking-widest uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
              Direct Engineering Inquiry
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight leading-[1.1]">
              Project Discovery &{" "}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-[#FACC15] rounded-xl -rotate-1 scale-105" />
                <span className="relative px-2">Inquiry</span>
              </span>
            </h1>

            <p className="text-slate-500 text-sm sm:text-lg max-w-xl mx-auto font-light leading-relaxed">
              Provide your project requirements to initiate technical feasibility, architecture scoping, and ROI analysis.
            </p>
          </motion.div>

          {/* ── Main Split Bento ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">

            {/* ── LEFT COLUMN: Contact HQ & Fast Channels (5 cols) ── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 space-y-4 sm:space-y-5"
            >
              {/* HQ Card (Yellow highlight card) */}
              <div className="bg-[#FACC15] rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 shadow-yellow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-900/70">
                      Engineering HQ
                    </span>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/10 text-[10px] font-mono font-bold text-slate-900">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      IST (UTC+5:30) · ACTIVE
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight mb-3">
                    DAVNS Industries<br />Pvt Ltd
                  </h3>

                  <p className="text-slate-800 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    Engineering facility architecting autonomous AI models, computer vision inspection pipelines, and high-scale software.
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-black/10 text-xs sm:text-sm font-semibold text-slate-900">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-yellow-400" />
                    </div>
                    <span>Chennai, Tamil Nadu, India</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-yellow-400" />
                    </div>
                    <a href="mailto:davnsindustries@gmail.com" className="hover:underline">
                      davnsindustries@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Fast-Track Channels (Lilac card) */}
              <div className="bg-[#EDE9FE] rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 border border-violet-200">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-violet-700" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-violet-900">
                    Guaranteed Response SLA
                  </span>
                </div>

                <h4 className="text-lg font-bold text-slate-900 mb-1.5 leading-tight">
                  &lt; 4-Hour Response Window
                </h4>
                <p className="text-xs text-slate-600 font-light leading-relaxed mb-5">
                  Direct developer consultation with lead architects — zero layered sales handoffs.
                </p>

                {/* Direct buttons */}
                <div className="space-y-2.5">
                  <a
                    href="mailto:davnsindustries@gmail.com?subject=Technical%20Consultation%20Inquiry"
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white text-slate-900 text-xs font-bold shadow-xs hover:bg-slate-50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-violet-700" />
                      <span>Email Engineering Team</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href="https://wa.me/919342738927"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#25D366] text-white text-xs font-bold shadow-xs hover:bg-[#20ba59] transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp Fast-Track Concierge</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Security & IP Guarantee */}
              <div className="bg-slate-50 rounded-[24px] p-5 border border-slate-200 flex items-start gap-3.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-slate-900 mb-0.5">Strict Confidentiality & NDA</h5>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-light">
                    All specifications and shared datasets are protected by strict mutual NDAs. Zero client data leaks to public training sets.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT COLUMN: Clean Simplified Form (7 cols) ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-7 bg-white rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 border border-slate-200 shadow-lg"
            >
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 px-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5 text-emerald-600">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                    Project Scope Received
                  </h3>
                  <p className="text-slate-600 text-sm font-light leading-relaxed max-w-md mx-auto mb-8">
                    Thank you, <span className="font-semibold text-slate-900">{formData.name || "there"}</span>. An AI solutions architect is analyzing your requirements and will reach out at <span className="font-semibold text-slate-900">{formData.email || "your corporate email"}</span> within 4 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false)
                      setFormData({ name: "", email: "", subject: "", message: "" })
                    }}
                    className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
                      Project Discovery & Inquiry
                    </h2>
                    <p className="text-slate-500 text-xs sm:text-sm font-light">
                      Provide your project requirements to initiate technical feasibility and scoping.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Your Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-slate-700 tracking-wider font-semibold">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Morgan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 text-xs sm:text-sm"
                      />
                    </div>

                    {/* Corporate Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-slate-700 tracking-wider font-semibold">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 text-xs sm:text-sm"
                      />
                    </div>

                    {/* Project Focus / Subject */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-slate-700 tracking-wider font-semibold">
                        Project Focus / Subject *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Autonomous WhatsApp Sales Agent or Vision QC Pipeline"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 text-xs sm:text-sm"
                      />
                    </div>

                    {/* System Specifications & Scope */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-slate-700 tracking-wider font-semibold">
                        System Specifications & Scope *
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Outline your timeline, volume, tech stack constraints, or goals..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 text-xs sm:text-sm resize-none"
                      />
                    </div>

                    {/* Submit CTA */}
                    <div className="pt-2">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-full py-4 text-xs sm:text-sm font-extrabold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Transmitting Specification...
                          </>
                        ) : (
                          <>
                            <span>Initiate Engineering Discovery</span>
                            <Send className="w-4 h-4 text-yellow-400" />
                          </>
                        )}
                      </motion.button>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Protected by Mutual NDA · Response within 4 hours</span>
                    </div>

                  </form>
                </>
              )}
            </motion.div>

          </div>

        </div>

        <Footer />
      </main>
    </div>
  )
}
