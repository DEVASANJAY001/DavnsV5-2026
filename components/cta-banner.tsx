import Link from "next/link"
import { ArrowRight } from "lucide-react"

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
    <section id="cta-banner" className="relative py-20 md:py-24 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-10 md:p-14 text-center overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-white/20 rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-white/20 rounded-br-2xl" />

          <div className="relative">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 tracking-tight text-balance">
              {title}
            </h2>
            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed">{description}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={primaryHref}
                id="cta-banner-primary"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-black rounded-xl font-semibold text-base hover:bg-white/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                {primaryLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={secondaryHref}
                id="cta-banner-secondary"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/20 text-white rounded-xl font-medium text-base hover:bg-white/5 transition-all duration-200"
              >
                {secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
