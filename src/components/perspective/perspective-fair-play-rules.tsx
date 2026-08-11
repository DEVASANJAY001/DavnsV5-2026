import { useState } from "react"
import { motion } from "framer-motion"
import { ShieldAlert, ShieldCheck, AlertTriangle, XCircle, CheckCircle2, ChevronDown, Lock, Scale, Info } from "lucide-react"

const prohibitedItems = [
  "AI answer-generating tools (LLMs, bots)",
  "Search engines & web scrapers",
  "External human assistance or tutoring",
  "Answer sharing across private/public groups",
  "Question sharing & distribution",
  "Screenshots of assessment content",
  "Account sharing or multi-device logins",
  "Impersonation or surrogate testing",
  "Attempts to manipulate scores, latency, or ranking",
]

const officialRules = [
  "Participation is strictly individual.",
  "Only eligible college students may participate.",
  "Participants must provide accurate registration information.",
  "Participants must follow all assessment instructions.",
  "Each quiz must be completed within the applicable time limit.",
  "Participants are responsible for maintaining a stable internet connection.",
  "Submitted answers may not be changeable after submission.",
  "Assessment questions and content must not be shared or reproduced.",
  "External assistance is prohibited.",
  "Attempts to manipulate the assessment or ranking may result in disqualification.",
  "The organizer's decision regarding eligibility, evaluation, ranking, recognition, and disqualification will be final.",
]

export function PerspectiveFairPlayRules() {
  const [showAllRules, setShowAllRules] = useState(false)

  return (
    <section id="rules" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-200/80 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 text-red-700 text-xs font-mono font-bold tracking-wider uppercase mb-4">
            <Scale className="w-3.5 h-3.5" />
            COMPETITION INTEGRITY
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Fair Play & Official Rules
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            DAVNS PERSPECTIVE is designed around honest individual competition. Strict telemetry monitors ensure a clean, level playing field for every participant.
          </p>
        </div>

        {/* 2-Column: Left Prohibited Items, Right Rules Breakdown */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left: Strict Prohibitions */}
          <div className="lg:col-span-6 bg-red-50/70 border border-red-200/80 rounded-[36px] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-red-200/60">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-red-950">Strictly Prohibited</h3>
                <p className="text-xs text-red-700 font-light">Zero tolerance policy during active assessments</p>
              </div>
            </div>

            <div className="space-y-2.5 mb-6">
              {prohibitedItems.map((item) => (
                <div
                  key={item}
                  className="p-3 rounded-2xl bg-white/90 border border-red-200/60 flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-800 shadow-2xs"
                >
                  <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-red-100/80 border border-red-200 text-xs text-red-900 font-light leading-relaxed">
              ⚠️ Any unfair practice may result in immediate disqualification. DAVNS INDUSTRIES reserves the right to investigate anomalous timing or response signatures.
            </div>
          </div>

          {/* Right: 11 Official Rules */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-[36px] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#7C3AED] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">11 Important Rules</h3>
                  <p className="text-xs text-slate-500 font-light">Binding participant code of conduct</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-xs font-bold">
                11 CLAUSES
              </span>
            </div>

            <div className="space-y-3">
              {officialRules.map((rule, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-xs sm:text-sm text-slate-800"
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-900 text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="font-light leading-relaxed pt-0.5">{rule}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
