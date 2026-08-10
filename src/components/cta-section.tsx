import { ArrowRight, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 mb-20 z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="relative text-center p-10 md:p-14 rounded-3xl border border-blue-100 bg-gradient-to-b from-blue-50/80 via-white to-white backdrop-blur-2xl shadow-[0_12px_40px_rgba(37,99,235,0.08)] overflow-hidden">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-100/50 text-blue-700 text-xs font-mono mb-6 tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            ENTERPRISE SCALE
          </div>

          <h3 className="text-3xl md:text-5xl font-light text-slate-900 mb-6 text-balance leading-tight">
            Ready to Engineer Your{" "}
            <span className="font-semibold italic bg-gradient-to-r from-slate-900 via-blue-800 to-blue-600 bg-clip-text text-transparent">
              Autonomous Edge
            </span>
            ?
          </h3>

          <p className="text-base md:text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Partner with DAVNS Industries to design and deploy intelligent platforms, computer vision pipelines, and scalable enterprise architectures.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/get-started" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 rounded-full px-8 py-6 text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-[0_4px_24px_rgba(37,99,235,0.3)] cursor-pointer"
              >
                <span>Initiate Project Discovery</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <Link to="/contact" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-full px-8 py-6 text-sm font-medium border-slate-300 hover:border-slate-400 bg-white text-slate-800 transition-all duration-200 cursor-pointer shadow-xs hover:bg-slate-50"
              >
                <span>Contact Engineering</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
