import { useState } from "react"
import { ChevronDown, Sparkles } from "lucide-react"

export interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQItem[]
  title?: string
  subtitle?: string
}

export function FAQSection({ faqs, title = "Frequently Asked Questions", subtitle }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative py-24 px-4 md:px-6 z-10">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-mono mb-4 tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            KNOWLEDGE BASE
          </div>
          
          <h2 className="text-3xl md:text-5xl font-light text-slate-900 mb-4 tracking-tight">
            {title}
          </h2>
          
          {subtitle && (
            <p className="text-base md:text-lg text-slate-600 leading-relaxed font-light">{subtitle}</p>
          )}
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className={`border rounded-3xl overflow-hidden transition-all duration-300 backdrop-blur-md ${
                  isOpen
                    ? "border-blue-300 bg-white shadow-[0_8px_30px_rgba(37,99,235,0.06)]"
                    : "border-slate-200/80 bg-white/70 hover:border-slate-300"
                }`}
              >
                <button
                  id={`faq-question-${index}`}
                  aria-expanded={isOpen}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group cursor-pointer"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className={`text-base md:text-lg font-medium transition-colors ${
                    isOpen ? "text-blue-700" : "text-slate-800 group-hover:text-slate-900"
                  }`}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-blue-600" : "text-slate-400"
                    }`}
                  />
                </button>

                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-6 text-slate-600 leading-relaxed text-sm md:text-base border-t border-slate-100 pt-4 font-light">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
