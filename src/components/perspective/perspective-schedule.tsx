import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Zap, ArrowRight, CheckCircle2, Flame, Award, Brain, Target, Layers, ChevronRight, ExternalLink, Sparkles } from "lucide-react"

export const UNSTOP_REGISTER_URL =
  "https://unstop.com/o/B9nhYTp?lb=usehckjk&utm_medium=Share&utm_source=quizzes&utm_campaign=Davnsnlo59542"

const daysData = [
  {
    day: "01",
    date: "SEPTEMBER 01, 2026",
    shortDate: "SEP 01",
    title: "THE FOUNDATION",
    subtitle: "Observation & Pattern Recognition",
    quizzes: 30,
    difficulty: "Base Tier (Calibration)",
    level: "Stage 1/6",
    color: "#EDE9FE",
    accent: "#7C3AED",
    description: "Start with logical and analytical challenges designed to test observation, relationships, patterns, and basic problem solving.",
    focusAreas: ["Logical Reasoning", "Patterns", "Observation", "Analytical Thinking"],
    keySkill: "Pattern Identification & Rule Derivation",
  },
  {
    day: "02",
    date: "SEPTEMBER 02, 2026",
    shortDate: "SEP 02",
    title: "DEEPER REASONING",
    subtitle: "Multi-Step Deduction & Inference",
    quizzes: 30,
    difficulty: "Intermediate Logic",
    level: "Stage 2/6",
    color: "#FEF08A",
    accent: "#854D0E",
    description: "Move beyond straightforward problems and tackle multi-step reasoning, deduction, assumptions, and logical relationships.",
    focusAreas: ["Deduction", "Analytical Reasoning", "Logical Relationships", "Decision Making"],
    keySkill: "Premise Validation & Assumption Testing",
  },
  {
    day: "03",
    date: "SEPTEMBER 03, 2026",
    shortDate: "SEP 03",
    title: "CRITICAL THINKING",
    subtitle: "Abstract Reasoning & Perspective Shifts",
    quizzes: 30,
    difficulty: "Elevated Complexity",
    level: "Stage 3/6",
    color: "#ECFDF5",
    accent: "#059669",
    description: "Challenge your assumptions and approach unfamiliar problems from different perspectives.",
    focusAreas: ["Critical Thinking", "Abstract Reasoning", "Complex Patterns", "Inference"],
    keySkill: "Lateral Thinking & Cognitive Adaptability",
  },
  {
    day: "04",
    date: "SEPTEMBER 04, 2026",
    shortDate: "SEP 04",
    title: "STRATEGIC THINKING",
    subtitle: "Optimization & Constraint Solving",
    quizzes: 30,
    difficulty: "Strategic Tier",
    level: "Stage 4/6",
    color: "#EFF6FF",
    accent: "#2563EB",
    description: "Analyze situations, understand constraints, compare possibilities, and identify efficient solutions.",
    focusAreas: ["Data Interpretation", "Strategic Reasoning", "Planning", "Optimization", "Decision Making"],
    keySkill: "Constraint Programming & Optimal Choice Selection",
  },
  {
    day: "05",
    date: "SEPTEMBER 05, 2026",
    shortDate: "SEP 05",
    title: "ADVANCED THINKING",
    subtitle: "Multi-Modal Cognitive Agility",
    quizzes: 30,
    difficulty: "High Complexity",
    level: "Stage 5/6",
    color: "#FFF7ED",
    accent: "#EA580C",
    description: "Face integrated challenges that require multiple reasoning approaches and greater adaptability.",
    focusAreas: ["Advanced Logic", "Complex Problem Solving", "Cognitive Flexibility", "Strategic Analysis"],
    keySkill: "Cross-Disciplinary Logical Synthesis",
  },
  {
    day: "06",
    date: "SEPTEMBER 06, 2026",
    shortDate: "SEP 06",
    title: "THE FINAL CHALLENGE",
    subtitle: "The Ultimate Aptitude Crucible",
    quizzes: 30,
    difficulty: "Championship Tier",
    level: "Stage 6/6",
    color: "#FDF2F8",
    accent: "#DB2777",
    description: "The ultimate test. A comprehensive mix of logical, analytical, critical, strategic, observational, and problem-solving challenges.",
    focusAreas: ["Integrated Reasoning", "Advanced Problem Solving", "Decision Making", "Lateral Thinking"],
    keySkill: "Comprehensive Aptitude Mastery",
  },
]

export function PerspectiveSchedule() {
  const [activeDayIdx, setActiveDayIdx] = useState(0)
  const currentDay = daysData[activeDayIdx]

  return (
    <section id="schedule" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-100 text-yellow-800 text-xs font-mono font-bold tracking-wider uppercase mb-4">
            <Calendar className="w-3.5 h-3.5" />
            THE SIX-DAY TIMELINE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            6 Days. 180 Quizzes.
          </h2>
          <p className="text-sm sm:text-lg text-slate-600 font-light leading-relaxed px-2">
            The competition runs across six consecutive days. Every day introduces a fresh set of{" "}
            <strong className="text-slate-900 font-semibold">30 aptitude quizzes</strong>, with the cognitive complexity progressing throughout the journey.
          </p>
        </div>

        {/* Interactive Day Pills Navigation */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 sm:mb-10 no-scrollbar px-1">
          {daysData.map((d, index) => {
            const isActive = activeDayIdx === index
            return (
              <button
                key={d.day}
                onClick={() => setActiveDayIdx(index)}
                className={`min-h-[44px] px-3.5 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-mono font-bold transition-all duration-200 shrink-0 cursor-pointer flex items-center gap-1.5 sm:gap-2 ${
                  isActive
                    ? "bg-slate-950 text-white shadow-lg scale-105"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                <span>DAY {d.day}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                  isActive ? "bg-[#FACC15] text-slate-950" : "bg-slate-200 text-slate-700"
                }`}>
                  30 Q
                </span>
              </button>
            )
          })}
        </div>

        {/* Selected Day Spotlight Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDay.day}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-50 border border-slate-200 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 mb-14 shadow-sm relative overflow-hidden"
          >
            {/* Ambient colored background aura */}
            <div
              style={{ backgroundColor: currentDay.color }}
              className="absolute -right-16 -top-16 w-80 h-80 rounded-full blur-3xl opacity-70 pointer-events-none"
            />

            <div className="relative z-10 grid lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-mono font-bold">
                    DAY {currentDay.day}
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-500">
                    {currentDay.date}
                  </span>
                  <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white border border-slate-200 text-[11px] sm:text-xs font-mono font-semibold text-slate-700">
                    {currentDay.difficulty}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-1 sm:mb-2">
                    {currentDay.title}
                  </h3>
                  <div className="text-sm sm:text-lg font-medium text-slate-600">
                    {currentDay.subtitle}
                  </div>
                </div>

                <p className="text-xs sm:text-base text-slate-700 font-light leading-relaxed">
                  {currentDay.description}
                </p>

                {/* Focus Tags */}
                <div>
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                    KEY FOCUS DIMENSIONS:
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {currentDay.focusAreas.map((focus) => (
                      <span
                        key={focus}
                        className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#7C3AED]" />
                        {focus}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Summary Matrix Card */}
              <div className="lg:col-span-5 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200/80 shadow-sm space-y-4 sm:space-y-5">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <span className="text-xs font-mono text-slate-400 uppercase">QUIZ ALLOCATION</span>
                  <span className="text-lg sm:text-xl font-bold font-mono text-slate-900">{currentDay.quizzes} Quizzes</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <span className="text-xs font-mono text-slate-400 uppercase">COGNITIVE LEVEL</span>
                  <span className="text-xs sm:text-sm font-bold font-mono text-[#7C3AED]">{currentDay.level}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <span className="text-xs font-mono text-slate-400 uppercase">CORE OBJECTIVE</span>
                  <span className="text-xs font-semibold text-slate-800 text-right max-w-[180px] sm:max-w-[200px]">{currentDay.keySkill}</span>
                </div>
                <div className="p-3 bg-purple-50 rounded-xl sm:rounded-2xl text-[11px] text-[#7C3AED] font-light leading-relaxed border border-purple-100">
                  ⚡ Daily quizzes open on <strong>{currentDay.date.split(",")[0]}</strong> at 00:00 IST and remain active for evaluation.
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── REDESIGNED: 6-Day Cognitive Milestone Grid ── */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-2">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Comprehensive Challenge Structure
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-light mt-0.5">
                6 consecutive days of progressive intellectual testing (180 total quizzes)
              </p>
            </div>
            <span className="px-4 py-1.5 rounded-full bg-[#FACC15] text-slate-950 font-mono text-xs font-black shadow-xs shrink-0">
              TOTAL: 180 QUIZZES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {daysData.map((d, index) => {
              const isSelected = activeDayIdx === index
              return (
                <div
                  key={d.day}
                  onClick={() => setActiveDayIdx(index)}
                  className={`p-5 sm:p-6 rounded-[28px] border transition-all cursor-pointer flex flex-col justify-between group ${
                    isSelected
                      ? "bg-slate-950 text-white border-slate-900 shadow-xl scale-[1.02]"
                      : "bg-slate-50/80 hover:bg-white text-slate-900 border-slate-200/90 hover:border-purple-300 hover:shadow-md"
                  }`}
                >
                  <div>
                    {/* Header line */}
                    <div className="flex items-center justify-between mb-3.5">
                      <span className={`px-3 py-1 rounded-full font-mono text-xs font-bold ${
                        isSelected ? "bg-[#FACC15] text-slate-950" : "bg-slate-200/90 text-slate-800"
                      }`}>
                        DAY {d.day}
                      </span>
                      <span className={`text-xs font-mono ${isSelected ? "text-slate-400" : "text-slate-500"}`}>
                        {d.shortDate}
                      </span>
                    </div>

                    <h4 className={`text-lg font-extrabold tracking-tight mb-1 ${
                      isSelected ? "text-white" : "text-slate-900"
                    }`}>
                      {d.title}
                    </h4>
                    
                    <div className={`text-xs font-light mb-4 line-clamp-2 ${
                      isSelected ? "text-slate-300" : "text-slate-600"
                    }`}>
                      {d.focusAreas.join(" • ")}
                    </div>
                  </div>

                  {/* Footer status */}
                  <div className={`pt-3.5 border-t flex items-center justify-between text-xs font-mono ${
                    isSelected ? "border-white/15 text-slate-300" : "border-slate-200 text-slate-500"
                  }`}>
                    <span className="font-bold">{d.quizzes} Quizzes</span>
                    <span className={`flex items-center gap-1 font-semibold ${
                      isSelected ? "text-[#FACC15]" : "text-[#7C3AED] group-hover:translate-x-0.5 transition-transform"
                    }`}>
                      <span>Inspect</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bottom Summary Bar with Unstop Action */}
          <div className="bg-slate-900 text-white rounded-[28px] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs font-mono uppercase text-[#FACC15] font-bold tracking-wider">
                CHALLENGE AGGREGATE
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-white">
                180 Quizzes • 6 Progressive Stages • 1 Champion
              </div>
              <div className="text-xs text-slate-400 font-light">
                Complete daily quizzes consistently to build your aggregate leaderboard index.
              </div>
            </div>

            <a
              href={UNSTOP_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 w-full sm:w-auto"
            >
              <button className="w-full sm:w-auto bg-[#FACC15] text-slate-950 hover:bg-yellow-400 font-mono text-xs font-black uppercase px-7 py-4 rounded-full shadow-yellow transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer">
                <span>Register on Unstop</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
