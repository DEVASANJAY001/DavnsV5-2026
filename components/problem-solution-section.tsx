"use client"

"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"

const ArrowRight = () => (
  <svg
    className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

export function ProblemSolutionSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-24 sm:py-36 px-4 relative z-10 overflow-hidden bg-black">
      {/* Premium Dot-Grid Background & Radial Mask */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Subtle organic light leaks */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-teal-500/5 to-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-20 sm:mb-28 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-[10px] font-mono tracking-[0.2em] text-slate-400 uppercase mb-6">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
            System Diagnostics
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-[1.1] mb-6">
            The <span className="font-serif italic text-slate-400">Challenge</span> & <span className="font-serif italic text-slate-100">Solution</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            We identify operational friction, automate complex logical pipelines, and engineer scalable architectures for enterprise environments.
          </p>
        </div>

        {/* Asymmetric Bento Layout */}
        <div
          className={`grid lg:grid-cols-12 gap-8 mb-20 sm:mb-28 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
        >
          {/* The Reality (System Friction Audit Log) */}
          <div className="lg:col-span-5 group relative">
            <div className="absolute -inset-px bg-gradient-to-b from-white/10 to-transparent rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative bg-zinc-950/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 h-full flex flex-col justify-between">
              <div>
                {/* Diagnostics Tab Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Audit ID // LOG_ERROR</span>
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500/40"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-500/40"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-700"></span>
                  </div>
                </div>

                <h3 className="text-xl font-medium text-white mb-6">Systemic Friction</h3>

                {/* Audit Items */}
                <div className="space-y-6">
                  <div className="group/item">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono font-semibold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        Overhead
                      </span>
                      <span className="text-xs text-slate-500 font-mono">01</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed font-light">
                      Legacy manual operations introduce high latency and human-error margins.
                    </p>
                  </div>

                  <div className="group/item">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Misalignment
                      </span>
                      <span className="text-xs text-slate-500 font-mono">02</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed font-light">
                      Off-the-shelf software solutions fail to map to specific enterprise needs.
                    </p>
                  </div>

                  <div className="group/item">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono font-semibold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        Friction
                      </span>
                      <span className="text-xs text-slate-500 font-mono">03</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed font-light">
                      Information workflows experience critical delays due to un-hydrated database systems.
                    </p>
                  </div>
                </div>
              </div>

              {/* Status footer */}
              <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span>STATUS: AUDIT_COMPLETE</span>
                <span className="text-rose-400 animate-pulse">● REQUIRES AUTOMATION</span>
              </div>
            </div>
          </div>

          {/* Our Solution (Cognitive Engineering Schema) */}
          <div className="lg:col-span-7 group relative">
            <div className="absolute -inset-px bg-gradient-to-b from-white/10 to-transparent rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative bg-zinc-950/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 h-full flex flex-col justify-between">
              <div>
                {/* Engineering Tab Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Engineering // BLUEPRINT_RESOLVE</span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/30"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/10"></span>
                  </div>
                </div>

                <h3 className="text-xl font-medium text-white mb-6">Cognitive Architecture</h3>

                {/* Grid layout of resolutions */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 transition-all duration-300">
                    <span className="text-emerald-400 text-xs font-mono font-semibold block mb-1">01 / AUDITING</span>
                    <h4 className="text-sm font-semibold text-white mb-1.5">Auditing & Synthesis</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      Deep operational analysis to locate systemic friction nodes.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 transition-all duration-300">
                    <span className="text-emerald-400 text-xs font-mono font-semibold block mb-1">02 / CORE ENGINE</span>
                    <h4 className="text-sm font-semibold text-white mb-1.5">Cognitive Processing</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      Bespoke machine learning pipelines customized for enterprise logical flows.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 transition-all duration-300">
                    <span className="text-emerald-400 text-xs font-mono font-semibold block mb-1">03 / APPLICATION</span>
                    <h4 className="text-sm font-semibold text-white mb-1.5">Scalable Architecture</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      Ultra-performance web and mobile microservices designed for massive request scaling.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 transition-all duration-300">
                    <span className="text-emerald-400 text-xs font-mono font-semibold block mb-1">04 / OPTIMIZATION</span>
                    <h4 className="text-sm font-semibold text-white mb-1.5">Continuous Delivery</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      Adaptive feedback loops continuously optimizing throughput and system health.
                    </p>
                  </div>
                </div>
              </div>

              {/* Status footer */}
              <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span>COMPILED: SUCCESSFUL</span>
                <span className="text-emerald-400 font-semibold">● ACTIVE IN PRODUCTION</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-y border-white/10 py-12 gap-8 text-center md:text-left">
          <div className="md:pr-8 md:border-r border-white/5">
            <span className="text-[10px] tracking-[0.25em] uppercase text-slate-500 font-mono">Operations</span>
            <h4 className="text-4xl font-extralight text-white mt-2">15+ Deployments</h4>
            <p className="text-xs text-slate-400 mt-2 font-light leading-relaxed">
              Custom-built automated systems and software architectures deployed in production environments globally.
            </p>
          </div>
          <div className="md:px-8 md:border-r border-white/5">
            <span className="text-[10px] tracking-[0.25em] uppercase text-slate-500 font-mono">Methodology</span>
            <h4 className="text-4xl font-extralight text-white mt-2">Research-First</h4>
            <p className="text-xs text-slate-400 mt-2 font-light leading-relaxed">
              Every deployment is backed by rigorous empirical analysis and performance benchmarking.
            </p>
          </div>
          <div className="md:pl-8">
            <span className="text-[10px] tracking-[0.25em] uppercase text-slate-500 font-mono">Delivery</span>
            <h4 className="text-4xl font-extralight text-white mt-2">Low Latency</h4>
            <p className="text-xs text-slate-400 mt-2 font-light leading-relaxed">
              Automated pipelines and data indexing engines built for immediate logical evaluation.
            </p>
          </div>
        </div>

        {/* Action Panel */}
        <div className="mt-20 sm:mt-28 text-center">
          <Link href="/get-started">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-slate-100 rounded-full px-8 py-6 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group cursor-pointer"
            >
              Consult Our Engineers
              <ArrowRight />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

