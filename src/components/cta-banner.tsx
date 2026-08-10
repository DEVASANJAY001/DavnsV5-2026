import { Link } from "react-router-dom"
import { ArrowRight, Sparkles } from "lucide-react"

interface CTABannerProps {
  title?: string
  description?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

export function CTABanner({
  title = "Ready to build something intelligent?",
  description = "Tell us about your project and we'll design a tailored solution that delivers measurable results.",
  primaryLabel = "Start a Project",
  primaryHref = "/get-started",
  secondaryLabel = "Contact Us",
  secondaryHref = "/contact",
}: CTABannerProps) {
  return (
    <section id="cta-banner" className="relative py-20 px-4 md:px-6 z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl border border-blue-100 bg-gradient-to-b from-blue-50/80 via-white to-white p-10 md:p-14 text-center overflow-hidden backdrop-blur-2xl shadow-[0_12px_40px_rgba(37,99,235,0.08)]">
          
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-100/50 text-blue-700 text-xs font-mono mb-6 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              ACCELERATE DEPLOYMENT
            </div>

            <h2 className="text-3xl md:text-5xl font-light text-slate-900 mb-4 tracking-tight text-balance leading-tight">
              {title}
            </h2>
            
            <p className="text-base md:text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={primaryHref}
                id="cta-banner-primary"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-sm hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-[0_4px_20px_rgba(37,99,235,0.3)]"
              >
                <span>{primaryLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={secondaryHref}
                id="cta-banner-secondary"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-slate-300 text-slate-800 rounded-full font-medium text-sm hover:bg-slate-50 transition-all duration-200 shadow-xs"
              >
                <span>{secondaryLabel}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
