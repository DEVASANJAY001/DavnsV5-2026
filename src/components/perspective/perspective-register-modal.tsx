import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Sparkles, CheckCircle2, ArrowRight, User, Mail, Phone, School, BookOpen, GraduationCap } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PerspectiveRegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    department: "",
    yearOfStudy: "1st Year",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName || !formData.email || !formData.college) {
      toast.error("Please fill in all required fields.")
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      toast.success("Registration confirmed for DAVNS PERSPECTIVE 2026!")
    }, 1000)
  }

  const handleReset = () => {
    setIsSubmitted(false)
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      college: "",
      department: "",
      yearOfStudy: "1st Year",
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl border border-slate-200 overflow-hidden z-10 my-8"
        >
          {/* Header Banner */}
          <div className="bg-slate-950 text-white p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-36 h-36 bg-[#7C3AED]/30 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -left-8 -bottom-8 w-36 h-36 bg-[#FACC15]/20 rounded-full blur-2xl pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-[#FACC15] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#FACC15]" />
              OFFICIAL REGISTRATION
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              DAVNS PERSPECTIVE <span className="text-[#FACC15]">2026</span>
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 font-light">
              6 Days • 180 Quizzes • September 1–6, 2026
            </p>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
            {isSubmitted ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200 animate-badge-pop">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-2">You're Registered!</h4>
                <p className="text-sm text-slate-600 font-light leading-relaxed max-w-sm mx-auto mb-6">
                  Welcome to <strong>DAVNS PERSPECTIVE 2026</strong>, {formData.fullName || "Champion"}. We have sent your participant confirmation details to <strong>{formData.email}</strong>.
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs text-slate-600 space-y-2 mb-6 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">STATUS:</span>
                    <span className="text-emerald-600 font-bold">CONFIRMED (INDIVIDUAL)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">INSTITUTION:</span>
                    <span className="text-slate-900 font-semibold truncate max-w-[200px]">{formData.college}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">EVENT DATES:</span>
                    <span className="text-slate-900">SEP 01 – SEP 06, 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">TOTAL QUIZZES:</span>
                    <span className="text-slate-900">180 (30 / DAY)</span>
                  </div>
                </div>
                <Button
                  onClick={handleReset}
                  className="w-full bg-slate-950 text-white hover:bg-slate-800 rounded-full py-3 text-sm font-semibold cursor-pointer"
                >
                  Done
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 font-mono">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Alex Turner"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 text-sm text-slate-900 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 font-mono">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="alex@college.edu"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 text-sm text-slate-900 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 font-mono">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 text-sm text-slate-900 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 font-mono">
                    College / University Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <School className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. National Institute of Technology / Loyola College"
                      value={formData.college}
                      onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 text-sm text-slate-900 outline-none transition-all"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 font-light">
                    Used for identification & institutional recognition. Individual merit only.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 font-mono">
                      Department / Major
                    </label>
                    <div className="relative">
                      <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. Computer Science / Commerce"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 text-sm text-slate-900 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 font-mono">
                      Year of Study
                    </label>
                    <div className="relative">
                      <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={formData.yearOfStudy}
                        onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 text-sm text-slate-900 outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="1st Year">1st Year (Undergraduate)</option>
                        <option value="2nd Year">2nd Year (Undergraduate)</option>
                        <option value="3rd Year">3rd Year (Undergraduate)</option>
                        <option value="4th Year">4th Year (Undergraduate)</option>
                        <option value="Postgraduate">Postgraduate / Masters</option>
                        <option value="Diploma / Other">Diploma / Other Higher Ed</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#FACC15] text-slate-900 hover:bg-yellow-400 rounded-full py-3.5 text-sm font-extrabold shadow-yellow transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Confirming Registration...</span>
                    ) : (
                      <>
                        <span>Complete Free Registration</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-[11px] text-slate-500 font-light">
                    Exclusively for college students. Free to participate. By registering you agree to the Fair Play Rules.
                  </p>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
