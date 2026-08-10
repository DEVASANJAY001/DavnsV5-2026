import { Sparkles, MessageSquare, Compass, Code, Rocket } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Compass,
    title: "Discovery & Workflow Mapping",
    description:
      "We sit down with your team to understand your exact operational bottlenecks, existing tools, and measurable business goals. No generic proposals — only tailored solutions.",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Architecture & Rapid Prototyping",
    description:
      "Our software architects design the complete system schema, UI prototypes, and API contracts. You see and test the flow before a single line of backend code is committed.",
  },
  {
    number: "03",
    icon: Code,
    title: "Agile Engineering & Rigorous Testing",
    description:
      "We build with rapid 2-week sprint cadences. Every deliverable undergoes automated testing, security validation, and continuous integration so you always have working software.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Production Deployment & Ongoing Support",
    description:
      "We manage the full rollout into your production environment, train your staff, and provide continuous monitoring and performance optimization retainers as your business scales.",
  },
]

export function HowWeWorkSection() {
  return (
    <section id="how-we-work" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden bg-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-mono mb-4 tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            COLLABORATION MODEL
          </div>

          <h2 className="text-3xl sm:text-5xl font-light text-slate-900 tracking-tight mb-4 text-balance">
            How We <span className="font-semibold italic bg-gradient-to-r from-slate-900 via-blue-800 to-blue-600 bg-clip-text text-transparent">Partner & Deliver</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
            A transparent, collaborative engineering process designed to take you from initial concept to production software with speed and precision.
          </p>
        </div>

        {/* 4 Connected Step Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon

            return (
              <div
                key={step.number}
                className="bg-slate-50/70 border border-slate-200/80 rounded-3xl p-7 hover:bg-white hover:border-blue-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold font-mono text-slate-300">{step.number}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 mb-3">{step.title}</h3>

                  <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60">
                  <span className="text-[11px] font-mono text-blue-600 font-semibold uppercase tracking-wider">
                    PHASE {step.number} COMPLETE
                  </span>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
