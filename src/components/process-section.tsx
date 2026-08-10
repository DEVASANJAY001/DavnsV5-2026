import { Search, Lightbulb, Code2, Rocket, Sparkles } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & Workflow Analysis",
    description:
      "We begin every engagement with empirical research — mapping internal workflows, friction nodes, and data infrastructure. No assumptions, only verified metrics.",
    tags: ["Process Audit", "Data Modeling", "ROI Feasibility"],
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Cognitive System Architecture",
    description:
      "Our AI architects design modular microservices tailored to your tech stack. We define API contracts, model parameters, and UX flows prior to production deployment.",
    tags: ["LLM Fine-Tuning", "Edge Vision Schema", "Security Isolation"],
  },
  {
    number: "03",
    icon: Code2,
    title: "Agile Engineering & Integration",
    description:
      "Rapid sprint cadences with continuous delivery. We engineer robust backend microservices, intelligent AI models, and responsive interfaces with automated test suites.",
    tags: ["Next-Gen APIs", "Continuous CI/CD", "Automated QA"],
  },
  {
    number: "04",
    icon: Rocket,
    title: "Production Rollout & Evolution",
    description:
      "Launch with guaranteed reliability. We handle multi-region rollout, telemetry monitoring, and ongoing optimization retainers as your business scales.",
    tags: ["Live Telemetry", "SLA Guarantee", "Adaptive Learning"],
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden bg-slate-50/50 border-t border-slate-200/80">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-mono mb-4 tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            ENGINEERING ROADMAP
          </div>

          <h2 className="text-3xl sm:text-5xl font-light text-slate-900 tracking-tight mb-4 text-balance">
            How We <span className="font-semibold italic bg-gradient-to-r from-slate-900 via-blue-800 to-blue-600 bg-clip-text text-transparent">Engineer & Deliver</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
            A research-driven methodology delivering verified operational results from initial discovery to global deployment.
          </p>
        </div>

        {/* 4-Step Grid with connected visual rhythm */}
        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className="group relative border border-slate-200/90 rounded-3xl p-7 sm:p-8 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 font-mono tracking-widest uppercase">PHASE {step.number}</span>
                        <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mt-0.5">{step.title}</h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed font-light mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-50 border border-slate-200 text-slate-700 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
