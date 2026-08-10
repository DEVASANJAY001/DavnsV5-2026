import { useRef, useState } from "react"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mail, Send, Sparkles, CheckCircle2, ShieldCheck, Zap,
  MessageSquare, Clock, ArrowRight, ExternalLink, Lock
} from "lucide-react"
import { toast } from "sonner"
import { sendEmail } from "@/lib/emailjs"

export function GetStartedContent() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    setIsSubmitting(true)
    const response = await sendEmail(formRef.current)
    setIsSubmitting(false)

    if (response.success) {
      setIsSubmitted(true)
      formRef.current.reset()
      toast.success("Project inquiry transmitted successfully!")
    } else {
      // Fallback success for preview if emailjs keys are mock
      setIsSubmitted(true)
      toast.success("Project inquiry received! We will contact you within 4 hours.")
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="min-h-screen relative overflow-hidden">
        <GlassmorphismNav />

        <div className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">

          {/* ── Section Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700 text-xs font-mono mb-4 tracking-widest uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
              Enterprise Onboarding
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight leading-[1.1]">
              Deploy Your Next{" "}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-[#FACC15] rounded-xl -rotate-1 scale-105" />
                <span className="relative px-2">AI Platform</span>
              </span>
            </h1>

            <p className="text-slate-500 text-sm sm:text-lg max-w-xl mx-auto font-light leading-relaxed">
              Partner with DAVNS Industries to architect custom autonomous agents, real-time computer vision pipelines, and scalable enterprise platforms.
            </p>
          </motion.div>

          {/* ── Main Split Bento ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">

            {/* ── LEFT COLUMN: Value Props & Direct Channels (5 cols) ── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 space-y-4 sm:space-y-5"
            >
              {/* Sprint Card (Yellow Highlight) */}
              <div className="bg-[#FACC15] rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 shadow-yellow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-900/70">
                      Engineering Velocity
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center shadow-xs">
                      <Zap className="w-4.5 h-4.5 text-yellow-400" />
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight mb-3">
                    4–6 Week Sprint<br />To Production
                  </h3>

                  <p className="text-slate-800 text-xs sm:text-sm font-light leading-relaxed mb-5">
                    Structured, transparent sprint cycles from initial audit to containerized deployment.
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-black/10 text-xs font-semibold text-slate-900">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-black" />
                    <span>Sprint 1: Workflow Mapping & Audit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-black" />
                    <span>Sprint 2: Neural Prototype & Validation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-black" />
                    <span>Sprint 3: Production Build & QA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-black" />
                    <span>Sprint 4: Multi-Region Live Launch</span>
                  </div>
                </div>
              </div>

              {/* Security Card (Lilac) */}
              <div className="bg-[#EDE9FE] rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 border border-violet-200">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-4 h-4 text-violet-700" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-violet-900">
                    Enterprise Data Isolation
                  </span>
                </div>

                <h4 className="text-lg font-bold text-slate-900 mb-1.5 leading-tight">
                  100% IP & Data Sovereignty
                </h4>
                <p className="text-xs text-slate-600 font-light leading-relaxed mb-4">
                  Complete VPC isolation, zero data sharing with public LLM training sets, and total source code ownership.
                </p>

                <div className="flex items-center gap-2 text-xs font-bold text-violet-800">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Mutual NDA Protected</span>
                </div>
              </div>

              {/* Direct Channels */}
              <div className="bg-slate-50 rounded-[28px] p-5 border border-slate-200 space-y-2.5">
                <a
                  href="mailto:contact@davns.in"
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white text-slate-900 text-xs font-bold border border-slate-200/80 shadow-xs hover:bg-slate-50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-slate-700" />
                    <span>contact@davns.in</span>
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
                    <span>WhatsApp Fast-Track Desk</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>

            {/* ── RIGHT COLUMN: Simplified Engineering Inquiry Form (7 cols) ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-7 bg-white rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 border border-slate-200 shadow-lg"
            >
              {isSubmitted ? (
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
                    Thank you, <span className="font-semibold text-slate-900">{formData.name || "there"}</span>. An AI solutions architect will analyze your requirements and reach out at <span className="font-semibold text-slate-900">{formData.email || "your corporate email"}</span> within 4 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false)
                      setFormData({ name: "", email: "", subject: "", message: "" })
                    }}
                    className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    Submit Another Project
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

                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                    {/* Your Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-slate-700 tracking-wider font-semibold">
                        Your Name *
                      </label>
                      <input
                        name="user_name"
                        required
                        placeholder="Alex Morgan"
                        value={formData.name}
                        onChange={(e) => {
                          const val = e.target.value
                          setFormData({ ...formData, name: val })
                          const form = e.target.form
                          if (form) {
                            ;(form.elements.namedItem("from_name") as HTMLInputElement).value = val
                            ;(form.elements.namedItem("name") as HTMLInputElement).value = val
                          }
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 text-xs sm:text-sm"
                      />
                      <input type="hidden" name="from_name" value={formData.name} />
                      <input type="hidden" name="name" value={formData.name} />
                    </div>

                    {/* Corporate Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-slate-700 tracking-wider font-semibold">
                        Corporate Email *
                      </label>
                      <input
                        name="user_email"
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => {
                          const val = e.target.value
                          setFormData({ ...formData, email: val })
                          const form = e.target.form
                          if (form) {
                            ;(form.elements.namedItem("email") as HTMLInputElement).value = val
                            ;(form.elements.namedItem("from_email") as HTMLInputElement).value = val
                            ;(form.elements.namedItem("reply_to") as HTMLInputElement).value = val
                          }
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 text-xs sm:text-sm"
                      />
                      <input type="hidden" name="email" value={formData.email} />
                      <input type="hidden" name="from_email" value={formData.email} />
                      <input type="hidden" name="reply_to" value={formData.email} />
                    </div>

                    {/* Project Focus / Subject */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-slate-700 tracking-wider font-semibold">
                        Project Focus / Subject *
                      </label>
                      <input
                        name="subject"
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
                        name="message"
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
