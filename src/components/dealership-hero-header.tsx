import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export function DealershipHeroHeader() {
  const [counter, setCounter] = useState(0)
  const targetValue = 200

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = targetValue / steps
    const stepDuration = duration / steps

    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      if (currentStep <= steps) {
        setCounter(Math.min(Math.round(increment * currentStep), targetValue))
      } else {
        clearInterval(timer)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="space-y-8 text-center max-w-4xl mx-auto">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 leading-tight text-balance">
        Never Miss Another Lead
      </h1>

      <div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
          <span className="text-xl md:text-2xl text-slate-600">Dealerships lose</span>
          <span className="text-3xl md:text-4xl font-bold text-rose-600">
            €{counter}K+
          </span>
          <span className="text-xl md:text-2xl text-slate-600">annually in after-hours inquiries</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 mb-8">
        <div className="relative w-full aspect-video bg-white border border-slate-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.06)] rounded-3xl overflow-hidden flex items-center justify-center">
          <div className="text-center space-y-2">
            <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs font-semibold">
              CLUTCH 1.0 AUTOMOTIVE AI
            </span>
            <p className="text-slate-600 text-sm font-light">Interactive Lead Qualification & CRM Integration</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/get-started" className="w-full sm:w-auto">
          <Button
            size="lg"
            className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-8 py-6 text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-[0_4px_24px_rgba(37,99,235,0.3)] cursor-pointer w-full"
          >
            <span>Book Live Dealership Demo</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
        <Link to="/contact" className="w-full sm:w-auto">
          <Button
            size="lg"
            variant="outline"
            className="bg-white text-slate-800 border-slate-300 hover:border-slate-400 rounded-full px-8 py-6 text-sm font-medium transition-all duration-300 hover:bg-slate-50 cursor-pointer shadow-xs w-full"
          >
            <span>Technical Inquiry</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
