import { motion } from "framer-motion"
import {
  Brain,
  Layers,
  Search,
  Eye,
  Crosshair,
  Sparkles,
  Target,
  Compass,
  CheckCircle2,
  Workflow,
  Split,
  Lightbulb,
} from "lucide-react"

const skills = [
  {
    title: "LOGICAL REASONING",
    desc: "Identify relationships, conditions, sequences, and valid conclusions from given premises.",
    icon: Brain,
    category: "Fundamental Logic",
    accent: "#EDE9FE",
    iconColor: "#7C3AED",
  },
  {
    title: "ANALYTICAL THINKING",
    desc: "Break complex information and convoluted scenarios into smaller, understandable components.",
    icon: Layers,
    category: "Deconstruction",
    accent: "#FEF08A",
    iconColor: "#854D0E",
  },
  {
    title: "CRITICAL THINKING",
    desc: "Objectively evaluate information, interrogate underlying assumptions, and verify claims.",
    icon: Crosshair,
    category: "Evaluation",
    accent: "#ECFDF5",
    iconColor: "#059669",
  },
  {
    title: "PATTERN RECOGNITION",
    desc: "Discover hidden relationships, numerical sequences, and visual symmetries in disparate data.",
    icon: Compass,
    category: "Symmetry",
    accent: "#EFF6FF",
    iconColor: "#2563EB",
  },
  {
    title: "DEDUCTIVE REASONING",
    desc: "Use all available conditions to isolate facts and arrive at mathematically airtight truths.",
    icon: Target,
    category: "Deduction",
    accent: "#FFF7ED",
    iconColor: "#EA580C",
  },
  {
    title: "ABSTRACT REASONING",
    desc: "Understand structural relationships without relying on familiar or conventional real-world patterns.",
    icon: Workflow,
    category: "Abstract Logic",
    accent: "#FDF2F8",
    iconColor: "#DB2777",
  },
  {
    title: "PROBLEM SOLVING",
    desc: "Formulate systematic strategies to overcome unfamiliar obstacles and verify results.",
    icon: Sparkles,
    category: "Resolution",
    accent: "#EDE9FE",
    iconColor: "#7C3AED",
  },
  {
    title: "DECISION MAKING",
    desc: "Compare branching scenarios, evaluate tradeoffs, and determine the optimal path under constraints.",
    icon: CheckCircle2,
    category: "Optimization",
    accent: "#FEF08A",
    iconColor: "#854D0E",
  },
  {
    title: "OBSERVATION",
    desc: "Pinpoint subtle nuances, hidden edge cases, and vital signals that others overlook.",
    icon: Eye,
    category: "Perception",
    accent: "#ECFDF5",
    iconColor: "#059669",
  },
  {
    title: "LATERAL THINKING",
    desc: "Look beyond conventional linear routes to discover novel and ingenious workarounds.",
    icon: Lightbulb,
    category: "Creative Insight",
    accent: "#EFF6FF",
    iconColor: "#2563EB",
  },
]

export function PerspectiveTestedSkills() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-200/80 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-[#7C3AED] text-xs font-mono font-bold tracking-wider uppercase mb-4">
            <Brain className="w-3.5 h-3.5" />
            COGNITIVE BLUEPRINT
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            What Will You Be Tested On?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            DAVNS PERSPECTIVE is engineered around real thinking skills. Ten interrelated cognitive pillars evaluated across 180 questions.
          </p>
        </div>

        {/* 10-Skill Bento Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {skills.map((skill, index) => {
            const Icon = skill.icon
            return (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="bg-white rounded-[28px] p-5 sm:p-6 border border-slate-200 shadow-2xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      style={{ backgroundColor: skill.accent }}
                      className="w-11 h-11 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                    >
                      <Icon style={{ color: skill.iconColor }} className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      #{String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight mb-2">
                    {skill.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-light leading-relaxed mb-4">
                    {skill.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>{skill.category}</span>
                  <span className="text-[#7C3AED] font-bold">18 Q Focus</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Footer philosophy banner */}
        <div className="mt-12 bg-white rounded-3xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-800 flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">No Complex Formula Memory Required</div>
              <div className="text-xs text-slate-500 font-light">Every problem supplies the premises you need. Your logic builds the answer.</div>
            </div>
          </div>
          <span className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-800 font-mono text-xs font-bold shrink-0">
            Read • Think • Decide
          </span>
        </div>

      </div>
    </section>
  )
}
