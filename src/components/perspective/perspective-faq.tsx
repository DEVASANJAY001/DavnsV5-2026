import { useState } from "react"
import { ChevronDown, Sparkles, HelpCircle } from "lucide-react"

export interface FAQItem {
  question: string
  answer: string
  category?: string
}

const faqs: FAQItem[] = [
  {
    question: "Who can participate?",
    answer: "DAVNS PERSPECTIVE 2026 is open exclusively to eligible enrolled college students across undergraduate, postgraduate, and recognized diploma programs.",
    category: "Eligibility",
  },
  {
    question: "Is it only for engineering students?",
    answer: "No. Students from all academic disciplines can participate — including Engineering, Arts & Sciences, Commerce, Management, Medicine & Allied fields, Technology, and Design.",
    category: "Eligibility",
  },
  {
    question: "Is there a cash prize?",
    answer: "No. The competition intentionally focuses on certificates, recognition, and achievement. We celebrate raw intellectual merit and peer benchmarking rather than commercial incentives.",
    category: "Recognition",
  },
  {
    question: "Will participants receive certificates?",
    answer: "Yes! Eligible participants who satisfy the participation requirements and complete the 6-day challenge will receive an official digital Certificate of Participation from DAVNS Industries.",
    category: "Recognition",
  },
  {
    question: "Will winners receive certificates?",
    answer: "Yes. The Champion (#1 Ranked) and top 5 performing participants will receive official achievement-based certificates, permanent DAVNS portal spotlights, and institutional commendations.",
    category: "Recognition",
  },
  {
    question: "Will my college be ranked?",
    answer: "No. DAVNS PERSPECTIVE evaluates individual participant performance. College information is collected for identification and institutional honor, but colleges themselves are not graded or ranked.",
    category: "Evaluation",
  },
  {
    question: "Does participating mean I represent my college?",
    answer: "No. Participation is individual and does not imply official representation or institutional endorsement by a participant's college or university.",
    category: "Eligibility",
  },
  {
    question: "How many quizzes are there?",
    answer: "There are exactly 30 quizzes per day across the six consecutive competition days, making a cumulative total of 180 quizzes.",
    category: "Format",
  },
  {
    question: "Is the competition online?",
    answer: "Yes. The entire competition is conducted 100% online through our secure testing portal. You can participate from anywhere with a stable internet connection.",
    category: "Format",
  },
  {
    question: "Do I need advanced mathematical knowledge?",
    answer: "No. The competition primarily focuses on logical, analytical, observational, and lateral problem-solving ability rather than heavy, specialized formula memorization.",
    category: "Format",
  },
  {
    question: "Can I use AI or search engines during the assessment?",
    answer: "No. AI tools (ChatGPT, Claude, etc.), search engines, external assistance, answer sharing, and question capture are strictly prohibited. Unfair practices result in disqualification.",
    category: "Integrity",
  },
]

export function PerspectiveFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-mono font-bold tracking-wider uppercase mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Got Questions? We've Got Answers.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            Everything you need to know about eligibility, testing mechanics, scoring, and certificates.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className={`border rounded-3xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "border-[#7C3AED]/40 bg-purple-50/40 shadow-sm"
                    : "border-slate-200/90 bg-slate-50/60 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <button
                  id={`faq-btn-${index}`}
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between gap-4 group cursor-pointer"
                >
                  <span className={`text-base sm:text-lg font-bold transition-colors ${
                    isOpen ? "text-[#7C3AED]" : "text-slate-900 group-hover:text-slate-950"
                  }`}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#7C3AED]" : "text-slate-400"
                    }`}
                  />
                </button>

                <div
                  id={`faq-content-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-6 sm:px-8 sm:pb-6 text-slate-700 leading-relaxed text-sm sm:text-base border-t border-slate-200/60 pt-4 font-light">
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
