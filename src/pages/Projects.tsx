import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { DualJourneyBento } from "@/components/dual-journey-bento"
import { ArrowRight, ExternalLink } from "lucide-react"

const projects = [
  {
    title: "Split Mobile Application",
    category: "Mobile & Web Platform",
    client: "DAVNS Product Lab",
    description: "Modern, high-performance expense splitting and tracking application published live on the Google Play Store and Web.",
    metrics: "4.9★ Rating · Live on Play Store",
    image: "/images/split.png",
    color: "#EDE9FE",
    link: "https://split-davns.vercel.app/",
  },
  {
    title: "Intecalic Automotive AI",
    category: "Conversational AI & CRM Sync",
    client: "Intecalic Group",
    description: "24/7 WhatsApp & Web sales qualification pipeline booking test drives and synchronizing leads directly into dealership CRM.",
    metrics: "3× Lead Conversion · < 30s Response",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&auto=format&fit=crop&q=80",
    color: "#FEF08A",
  },
  {
    title: "Kushan Elevators IoT QC",
    category: "Industrial Vision & Telemetry",
    client: "Kushan Elevators",
    description: "Sub-millimeter optical inspection of elevator components and real-time maintenance telemetry dashboards.",
    metrics: "40% Faster QC · Zero Escaped Defects",
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=600&auto=format&fit=crop&q=80",
    color: "#F8FAFC",
  },
  {
    title: "Sriviiyengar Foods E-Commerce",
    category: "Omnichannel Commerce & Logistics",
    client: "Sriviiyengar Foods",
    description: "Full-stack e-commerce platform with multi-warehouse inventory triggers, automated dispatch, and WhatsApp order tracking.",
    metrics: "60% Faster Dispatch · 25% Cart Uplift",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80",
    color: "#EDE9FE",
  },
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-purple-500/20 selection:text-purple-900">
      <main className="min-h-screen relative overflow-hidden">
        <GlassmorphismNav />
        
        <div className="pt-36 pb-20">

          {/* Hero Header */}
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center mb-20">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight break-words leading-[1.1]">
              Featured{" "}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-[#FACC15] rounded-xl -rotate-1 scale-105" />
                <span className="relative px-2">client work</span>
              </span>{" "}
              & products
            </h1>
            
            <p className="text-base md:text-xl text-slate-600 leading-relaxed font-light max-w-2xl mx-auto">
              Explore our deployed applications, custom enterprise platforms, and computer vision systems.
            </p>
          </div>

          {/* Projects Bento Grid */}
          <section className="py-12 px-4 md:px-6 max-w-6xl mx-auto mb-20">
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((p) => (
                <div
                  key={p.title}
                  style={{ backgroundColor: p.color }}
                  className="rounded-[36px] p-8 sm:p-10 border border-slate-200/60 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600">
                        {p.category}
                      </span>
                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black shadow-2xs hover:scale-110 transition-transform"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{p.title}</h3>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-light mb-6">{p.description}</p>
                  </div>

                  <div className="border-t border-slate-900/10 pt-4 flex justify-between items-center text-xs font-mono font-bold text-slate-900">
                    <span>{p.client}</span>
                    <span>{p.metrics}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Dual Journey Bento */}
          <DualJourneyBento />

        </div>

        <Footer />
      </main>
    </div>
  )
}
