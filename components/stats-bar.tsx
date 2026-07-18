"use client"

import { useEffect, useRef, useState } from "react"

interface Stat {
  value: number
  suffix: string
  label: string
  prefix?: string
}

const stats: Stat[] = [
  { value: 15, suffix: "+", label: "Projects Delivered" },
  { value: 6, suffix: "+", label: "Clients Worldwide" },
  { value: 3, suffix: "+", label: "Countries Served" },
  { value: 60, suffix: "%", label: "Avg. Efficiency Gain", prefix: "↑" },
]

function AnimatedCounter({ value, suffix, prefix }: { value: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
          const duration = 1800
          const start = performance.now()
          const animate = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * value))
            if (progress < 1) requestAnimationFrame(animate)
            else setCount(value)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, hasStarted])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix && <span>{prefix}</span>}
      {count}
      {suffix}
    </span>
  )
}

export function StatsBar() {
  return (
    <section id="stats" className="relative py-14 px-4 md:px-6 border-y border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tight">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <div className="text-sm text-white/50 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
