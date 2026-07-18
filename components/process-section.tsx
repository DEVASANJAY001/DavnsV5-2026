"use client"

import { useEffect, useRef, useState } from "react"
import { Search, Lightbulb, Code2, Rocket } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discover & Analyze",
    description:
      "We begin every engagement with deep research — understanding your workflows, user pain points, and technical constraints. No assumptions, only data-driven insights.",
    tags: ["User Research", "Technical Audit", "Gap Analysis"],
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Design & Architect",
    description:
      "Our architects design scalable, modular systems tailored to your stack. We define data models, API contracts, and UX flows before writing a single line of code.",
    tags: ["System Design", "Prototyping", "UX Blueprint"],
  },
  {
    number: "03",
    icon: Code2,
    title: "Build & Integrate",
    description:
      "Agile sprints with continuous delivery. We engineer robust backend systems, intelligent AI models, and pixel-perfect interfaces — all tested and reviewed at every step.",
    tags: ["AI Development", "Agile Sprints", "Code Review"],
  },
  {
    number: "04",
    icon: Rocket,
    title: "Deploy & Evolve",
    description:
      "Launch with confidence. We handle deployment, monitoring, and ongoing optimization — ensuring your platform grows with you and adapts to real-world usage.",
    tags: ["CI/CD", "Monitoring", "Continuous Improvement"],
  },
]

export function ProcessSection() {
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([false, false, false, false])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            steps.forEach((_, i) => {
              setTimeout(() => {
                setVisibleSteps((prev) => {
                  const next = [...prev]
                  next[i] = true
                  return next
                })
              }, i * 150)
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.15 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="process" ref={sectionRef} className="relative py-20 md:py-28 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-white/50 text-xs font-medium tracking-widest uppercase mb-4">
            <div className="w-6 h-px bg-white/30" />
            Our Process
            <div className="w-6 h-px bg-white/30" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 tracking-tight">
            How we <span className="font-semibold italic">build</span> for you
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            A proven, research-driven methodology that delivers reliable results from first meeting to final deployment.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className={`relative group border border-white/10 rounded-2xl p-7 bg-white/[0.02] backdrop-blur-sm hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500 ${
                  visibleSteps[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                {/* Step number watermark */}
                <div className="absolute top-5 right-6 text-6xl font-bold text-white/[0.04] select-none leading-none">
                  {step.number}
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white/80" />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 font-mono tracking-widest mb-1">STEP {step.number}</div>
                    <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  </div>
                </div>

                <p className="text-white/60 leading-relaxed text-base mb-5">{step.description}</p>

                <div className="flex flex-wrap gap-2">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Connector */}
        <div className="mt-12 text-center">
          <p className="text-white/40 text-sm">
            Average project timeline: <span className="text-white/70 font-medium">4 – 12 weeks</span> from kick-off to deployment
          </p>
        </div>
      </div>
    </section>
  )
}
