import { motion } from "framer-motion"
import { Brain, CheckCircle2, XCircle, Lightbulb, Sparkles, Target, Compass, HelpCircle } from "lucide-react"

const coreEmphases = [
  { title: "Logical Thinking", desc: "Deduce facts, test premises, and arrive at sound conclusions.", icon: Brain, color: "#EDE9FE", text: "#7C3AED" },
  { title: "Analytical Reasoning", desc: "Deconstruct complex puzzles into clean, manageable logic streams.", icon: Target, color: "#FEF08A", text: "#854D0E" },
  { title: "Critical Thinking", desc: "Question default assumptions and evaluate arguments objectively.", icon: Lightbulb, color: "#ECFDF5", text: "#059669" },
  { title: "Pattern Recognition", desc: "Spot non-obvious correlations, numerical sequences, and visual symmetries.", icon: Compass, color: "#EFF6FF", text: "#2563EB" },
  { title: "Problem Solving", desc: "Formulate efficient resolution pathways for novel challenges.", icon: Sparkles, color: "#FFF7ED", text: "#EA580C" },
  { title: "Decision Making", desc: "Evaluate constraints swiftly under time pressure to choose optimal outcomes.", icon: CheckCircle2, color: "#FDF2F8", text: "#DB2777" },
]

export function PerspectivePhilosophy() {
  return (
    <section id="about-challenge" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-200/80 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-[#7C3AED] text-xs font-mono font-bold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            THE PHILOSOPHY
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            What is DAVNS Perspective?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            DAVNS PERSPECTIVE 2026 is a competitive aptitude and logical-thinking challenge organized by{" "}
            <strong className="text-slate-900 font-semibold">DAVNS INDUSTRIES</strong> exclusively for college students. 
            The competition is engineered to evaluate how you approach unfamiliar problems when textbook shortcuts are removed.
          </p>
        </div>

        {/* The Mindset Pivot Banner (The Core Question) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-950 text-white rounded-[36px] p-8 sm:p-12 mb-16 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#7C3AED]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-[#FACC15]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
            <div className="text-slate-400 text-sm sm:text-base font-mono uppercase tracking-widest font-semibold">
              THE QUESTION ISN'T:
            </div>
            <div className="text-2xl sm:text-3xl text-slate-300 line-through decoration-red-400 decoration-2 font-light">
              "How much do you know?"
            </div>

            <div className="py-2">
              <div className="w-16 h-0.5 bg-white/20 mx-auto" />
            </div>

            <div className="text-xs sm:text-sm text-[#FACC15] font-mono uppercase tracking-[0.25em] font-bold">
              THE REAL QUESTION IS:
            </div>
            <h3 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-none">
              "HOW DO YOU <span className="text-[#FACC15]">THINK</span>?"
            </h3>
            
            <p className="text-slate-400 text-sm sm:text-base font-light max-w-xl mx-auto pt-2">
              Across six days, you will face 180 aptitude-based quizzes designed to progressively challenge cognitive adaptability, deduction, and lateral reasoning.
            </p>
          </div>
        </motion.div>

        {/* Comparison: Memorization vs Raw Cognitive Thinking */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          
          {/* Card 1: Traditional Tests */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <XCircle className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Traditional Exam Format</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-light mb-6">
              Rote-learning and formula-heavy models that reward memorization over genuine intellectual agility.
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600 font-light">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                Heavy reliance on obscure memorized formulas
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                Favors specific academic majors and branches
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                Predictable pattern drilling and coaching shortcuts
              </li>
            </ul>
          </div>

          {/* Card 2: DAVNS Perspective */}
          <div className="bg-[#EDE9FE]/50 rounded-[32px] p-8 border border-[#7C3AED]/30 shadow-sm relative">
            <div className="absolute top-6 right-6">
              <span className="px-3 py-1 rounded-full bg-[#7C3AED] text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                DAVNS STANDARD
              </span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white text-[#7C3AED] flex items-center justify-center shadow-xs">
                <Brain className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">DAVNS Perspective 2026</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-light mb-6">
              Pure cognitive aptitude where every question tests your real-time deductive mechanics and analytical acumen.
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-800 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7C3AED] shrink-0" />
                No complex formulas required — pure logical reasoning
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7C3AED] shrink-0" />
                Open to all college disciplines on an equal footing
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7C3AED] shrink-0" />
                Progressive multi-tier complexity over 6 consecutive days
              </li>
            </ul>
          </div>

        </div>

        {/* 6 Core Emphasis Pillars */}
        <div className="mb-6 text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            The Core Thinking Architecture
          </h3>
          <p className="text-sm text-slate-500 font-light max-w-xl mx-auto">
            Each quiz is carefully calibrated to evaluate one or more fundamental thinking dimensions:
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {coreEmphases.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white rounded-[28px] p-6 border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all group"
              >
                <div
                  style={{ backgroundColor: item.color }}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                >
                  <Icon style={{ color: item.text }} className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-1.5">{item.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
