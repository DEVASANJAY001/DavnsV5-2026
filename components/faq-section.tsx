"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQItem[]
  title?: string
  subtitle?: string
  schema?: boolean
}

export function FAQSection({ faqs, title = "Frequently Asked Questions", subtitle, schema = true }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <section id="faq" className="relative py-20 md:py-28 px-4 md:px-6">
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-white/50 text-xs font-medium tracking-widest uppercase mb-4">
            <div className="w-6 h-px bg-white/30" />
            FAQ
            <div className="w-6 h-px bg-white/30" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-white/60 leading-relaxed">{subtitle}</p>
          )}
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02] backdrop-blur-sm hover:border-white/20 transition-all duration-300"
            >
              <button
                id={`faq-question-${index}`}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group cursor-pointer"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-white font-medium text-base md:text-lg group-hover:text-white/80 transition-colors">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-white/40 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-6 pb-5 text-white/60 leading-relaxed text-base border-t border-white/5 pt-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
