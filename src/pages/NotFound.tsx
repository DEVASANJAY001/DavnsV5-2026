import { Link } from "react-router-dom"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { AuroraBackground } from "@/components/aurora-background"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="min-h-screen relative overflow-hidden flex flex-col justify-between">
        <AuroraBackground />
        <div className="relative z-10">
          <GlassmorphismNav />
          <div className="pt-48 pb-20 px-4 text-center max-w-xl mx-auto">
            <span className="text-blue-600 font-mono text-sm uppercase tracking-widest font-semibold">ERROR // 404</span>
            <h1 className="text-4xl sm:text-6xl font-light text-slate-900 my-4 tracking-tight">
              Page Not Found
            </h1>
            <p className="text-slate-600 font-light mb-8">
              The requested architecture endpoint does not exist or has been relocated.
            </p>
            <Link to="/">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-8 py-6 text-sm font-semibold cursor-pointer shadow-[0_4px_20px_rgba(37,99,235,0.3)]">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to Homepage
              </Button>
            </Link>
          </div>
          <Footer />
        </div>
      </main>
    </div>
  )
}
