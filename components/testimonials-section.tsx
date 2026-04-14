"use client"

import { useEffect, useRef } from "react"
import { TestimonialsColumn } from "@/components/ui/testimonials-column"

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element")
            elements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add("animate-fade-in-up")
              }, index * 300)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const testimonials = [
    {
      text: "DAVNS Industries improved our system efficiency and reduced manual workload significantly. Their AI-driven approach is truly innovative.",
      name: "Nivaan",
      role: "Manufacturing Director",
    },
    {
      text: "Their AI-based solutions helped us solve complex problems with simple and scalable approaches. Outstanding research and execution.",
      name: "Arul",
      role: "Operations Manager",
    },
    {
      text: "The custom dashboard they built gives us real-time insights we never had before. Game-changing for our business intelligence.",
      name: "Yuvani",
      role: "Business Analyst",
    },
    {
      text: "DAVNS delivered an industrial AI inspection system that improved our quality assurance by 40%. Exactly what we needed.",
      name: "Kiran",
      role: "Quality Lead",
    },
    {
      text: "Their research-driven approach to problem-solving is refreshing. They don't just build—they innovate with purpose.",
      name: "Darshini",
      role: "CTO",
    },
    {
      text: "The custom software they developed scaled perfectly with our growth. Professional, reliable, and results-focused team.",
      name: "Aadhav",
      role: "Founder & CEO",
    },
    {
      text: "Outstanding product development from concept to launch. DAVNS truly understands real-world industrial challenges.",
      name: "Reya",
      role: "Plant Manager",
    },
    {
      text: "Their AI automation systems reduced our processing time by 60%. The impact on our bottom line has been substantial.",
      name: "Nilan",
      role: "Process Engineer",
    },
    {
      text: "DAVNS Industries transformed our operations with intelligent solutions that drove measurable results across all departments.",
      name: "Ivana",
      role: "Operations Lead",
    },
    {
      text: "Working with DAVNS was a game-changer. Their innovative approach and technical expertise delivered exceptional value.",
      name: "Viyani",
      role: "Strategy Manager",
    },
  ]

  return (
    <section id="testimonials" ref={sectionRef} className="relative pt-16 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section - Keep as user loves it */}
        <div className="text-center mb-16 md:mb-32">
          <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out inline-flex items-center gap-2 text-white/60 text-sm font-medium tracking-wider uppercase mb-6">
            <div className="w-8 h-px bg-white/30"></div>
            Success Stories
            <div className="w-8 h-px bg-white/30"></div>
          </div>
          <h2 className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight text-balance">
            Industries we <span className="font-medium italic">transform</span>
          </h2>
          <p className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Discover how leading organizations partner with DAVNS Industries to build intelligent platforms and drive real-world impact.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out relative flex justify-center items-center min-h-[600px] md:min-h-[800px] overflow-hidden">
          <div
            className="flex gap-8 max-w-6xl"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          >
            <TestimonialsColumn testimonials={testimonials.slice(0, 3)} duration={15} className="flex-1" />
            <TestimonialsColumn
              testimonials={testimonials.slice(2, 5)}
              duration={12}
              className="flex-1 hidden md:block"
            />
            <TestimonialsColumn
              testimonials={testimonials.slice(1, 4)}
              duration={18}
              className="flex-1 hidden lg:block"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
