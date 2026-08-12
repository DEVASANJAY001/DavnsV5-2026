import { useState } from "react"
import { motion } from "framer-motion"
import { Star, Quote, Sparkles, TrendingUp, Building2, Cpu, Layers, Briefcase } from "lucide-react"

const testimonials = [
  {
    quote: "The flexibility was amazing. We chose exactly what our autonomous agent would handle. Lead conversion tripled within 30 days of going live.",
    name: "Arul",
    role: "Operations Director",
    company: "Auto Group India",
    icon: Building2,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100 border-purple-200",
    metric: "+3× Leads",
    metricColor: "#7C3AED",
    metricBg: "#EDE9FE",
    bgCard: "#EDE9FE",
  },
  {
    quote: "DAVNS delivered an industrial AI inspection system that improved our QA by 40%. The engineers were directly accessible throughout every sprint week.",
    name: "Darshini",
    role: "Chief Technology Officer",
    company: "Manufacturing Co.",
    icon: Cpu,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100 border-orange-200",
    metric: "+40% QA",
    metricColor: "#F97316",
    metricBg: "#FFF7ED",
    bgCard: "#FACC15",
  },
  {
    quote: "Each sprint was structured and transparent. The custom dashboard they built gives us real-time insights we never had before — it's become mission-critical.",
    name: "Aadhav",
    role: "Founder & CEO",
    company: "Startup Ventures",
    icon: Layers,
    iconColor: "text-emerald-400",
    iconBg: "bg-white/10 border-white/15",
    metric: "4 wks live",
    metricColor: "#10B981",
    metricBg: "#ECFDF5",
    bgCard: "#F0FDF4",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden bg-slate-950">
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-mono mb-4 tracking-widest uppercase border border-white/10 backdrop-blur">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            Client Stories
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            What our clients say
          </h2>
        </motion.div>

        {/* ── Mosaic Layout: 3-card at once ── */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          
          {/* Card 1: Large Quote (Lilac) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 bg-[#EDE9FE] rounded-[32px] p-7 sm:p-8 flex flex-col justify-between card-lift"
          >
            <div>
              <Quote className="w-8 h-8 text-violet-300 mb-4" />
              <p className="text-slate-800 text-base sm:text-lg font-light leading-relaxed mb-6">
                "{testimonials[0].quote}"
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white border border-purple-200 flex items-center justify-center text-purple-700 shadow-2xs">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{testimonials[0].name}</div>
                  <div className="text-xs text-slate-600">{testimonials[0].role} · {testimonials[0].company}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-extrabold font-mono text-violet-700">+3×</div>
                <div className="text-[11px] text-slate-500">Lead conversion</div>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Satisfaction + Short Quote */}
          <div className="space-y-5">
            {/* Big stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#FACC15] rounded-[28px] p-6 text-center card-lift"
            >
              <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-mono mb-1">98%</div>
              <div className="text-sm font-semibold text-slate-800">Verified client satisfaction</div>
              <div className="flex justify-center gap-1 mt-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-slate-900 text-slate-900" />
                ))}
              </div>
            </motion.div>

            {/* Mini quote card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-white/10 backdrop-blur border border-white/15 rounded-[28px] p-6 flex flex-col gap-4 card-lift"
            >
              <p className="text-slate-200 text-sm font-light leading-relaxed">
                "{testimonials[2].quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-emerald-400">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{testimonials[2].name}</div>
                  <div className="text-[11px] text-slate-400">{testimonials[2].role}</div>
                </div>
                <div className="ml-auto text-xs font-bold text-emerald-400">4 wks live</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Third testimonial full-width ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#FFF7ED] rounded-[32px] p-6 sm:p-9 flex flex-col sm:flex-row items-start sm:items-center gap-6 card-lift"
        >
          <div className="flex items-center gap-3.5 shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-white border-2 border-orange-200 flex items-center justify-center text-orange-600 shadow-2xs">
              <Cpu className="w-7 h-7" />
            </div>
            <div>
              <div className="font-bold text-slate-900">{testimonials[1].name}</div>
              <div className="text-xs text-slate-600">{testimonials[1].role}</div>
              <div className="text-xs text-orange-500 font-semibold">{testimonials[1].company}</div>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-slate-700 text-sm sm:text-base font-light leading-relaxed">
              "{testimonials[1].quote}"
            </p>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-3xl font-extrabold font-mono text-orange-500">+40%</div>
            <div className="text-[11px] text-slate-500">QA improvement</div>
            <div className="flex items-center gap-1 justify-end mt-1">
              <TrendingUp className="w-3 h-3 text-emerald-500" />
              <span className="text-[10px] text-emerald-600 font-semibold">Verified</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
