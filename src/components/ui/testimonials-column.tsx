import React from "react"
import { motion } from "framer-motion"

interface Testimonial {
  text: string
  name: string
  role: string
}

export const TestimonialsColumn = (props: {
  className?: string
  testimonials: Testimonial[]
  duration?: number
}) => {
  return (
    <div className={`relative overflow-hidden h-[650px] ${props.className || ""}`}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 14,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, name, role }, i) => (
                <div
                  className="p-7 rounded-3xl border border-slate-200/90 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl max-w-sm w-full hover:border-blue-300 transition-all group"
                  key={i}
                >
                  <p className="text-slate-700 text-sm leading-relaxed font-light">{text}</p>
                  <div className="mt-5 border-t border-slate-100 pt-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">{name}</div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">{role}</div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  )
}
