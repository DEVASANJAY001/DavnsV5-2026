import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Globe, Sparkles, ArrowRight } from "lucide-react"

const PlayStoreIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M17.523 15.3l-2.613-2.613 2.613-2.613c1.378.788 2.378 2.213 2.378 3.863s-1 3.075-2.378 3.863zm-4.025-4.025L3.488 2.225A1.5 1.5 0 0 0 3 3.325v17.35a1.5 1.5 0 0 0 .488 1.1l10.01-10.01c0-.025 0-.05.025-.075l-.025-.025zm1.5-1.5l2.625-2.625-9.613-5.462a1.5 1.5 0 0 0-1.5 0l8.488 8.088zm0 4.45L8.987 22.313c.438.25.962.25 1.488 0l9.625-5.463-5.088-5.075z"
    />
  </svg>
)

const clients = [
  { name: "Intecalic", sector: "Tech & Embedded" },
  { name: "Kushan Elevators", sector: "Industrial Mobility" },
  { name: "Sriviiyengar Foods", sector: "FMCG & Logistics" },
  { name: "Motor Guardians", sector: "Automotive Systems" },
  { name: "Vasantham Honey", sector: "Agri-Tech Products" },
  { name: "Darkline Art", sector: "Creative Studio" },
]

export function ClientsProductsSection() {
  const [activeTab, setActiveTab] = useState<"clients" | "products">("clients")

  return (
    <section
      id="clients-products"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white border-t border-slate-200/80 z-10"
    >
      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-mono mb-4 tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            ECOSYSTEM & PORTFOLIO
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-light text-slate-900 tracking-tight mb-4 text-balance">
            Trusted by Innovators &{" "}
            <span className="font-semibold italic bg-gradient-to-r from-slate-900 via-blue-800 to-blue-600 bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-light leading-relaxed mb-8">
            We collaborate with ambitious organizations to architect intelligent platforms, autonomous agents, and real-world software products.
          </p>

          {/* Segmented Switch */}
          <div className="inline-flex items-center bg-slate-100 border border-slate-200 rounded-full p-1.5 shadow-inner">
            <button
              onClick={() => setActiveTab("clients")}
              className={`px-6 py-2 rounded-full text-xs font-mono font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === "clients"
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              OUR CLIENTS
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`px-6 py-2 rounded-full text-xs font-mono font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === "products"
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              PROPRIETARY PRODUCTS
            </button>
          </div>
        </div>

        {/* Content */}
        <div>
          {activeTab === "clients" && (
            <div className="space-y-12">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
                {clients.map((client, index) => (
                  <Card
                    key={index}
                    className="p-6 bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center text-center hover:bg-slate-50 hover:border-blue-300 transition-all duration-300 rounded-3xl group"
                  >
                    <p className="text-slate-900 font-semibold text-base group-hover:text-blue-600 transition-colors">
                      {client.name}
                    </p>
                    <span className="text-[11px] text-slate-500 font-mono mt-1">{client.sector}</span>
                  </Card>
                ))}
              </div>

              <div className="text-center pt-8 max-w-2xl mx-auto space-y-6">
                <p className="text-sm text-slate-600 font-light leading-relaxed">
                  From scalable startups to complex manufacturing environments, our solutions deliver verified operational uptime and measurable efficiency gains.
                </p>

                <Link to="/get-started" className="inline-block">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-8 py-6 text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-[0_4px_20px_rgba(37,99,235,0.3)] cursor-pointer">
                    <span>Partner with DAVNS</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="space-y-4">
                
                {/* Product: Split */}
                <Card className="bg-white border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-6 sm:p-7 transition-all duration-300 hover:border-blue-300 rounded-3xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 w-full">
                    <div className="flex items-center gap-4">
                      <img
                        src="/images/split.png"
                        alt="Split Logo"
                        className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-2xl shrink-0 border border-slate-100 shadow-xs"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xl font-bold text-slate-900 tracking-tight">Split</h4>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono font-semibold uppercase">
                            Live in Production
                          </span>
                        </div>
                        <p className="text-slate-600 text-xs sm:text-sm mt-1 font-light">
                          Smart expense splitting, group ledger, and invoice tracking mobile & web platform.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <a
                        href="https://play.google.com/store/apps/details?id=com.davnsindusrties.split"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full text-xs flex items-center gap-1.5 transition-all hover:scale-105 shadow-xs cursor-pointer">
                          <PlayStoreIcon className="w-3.5 h-3.5 fill-current" />
                          <span>Google Play</span>
                        </Button>
                      </a>
                      <a
                        href="https://split.davns.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" className="border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-4 py-2 rounded-full text-xs flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer">
                          <Globe className="w-3.5 h-3.5 text-blue-600" />
                          <span>Web App</span>
                        </Button>
                      </a>
                    </div>
                  </div>
                </Card>

                {/* Next Project */}
                <Card className="bg-slate-50 border-dashed border-slate-200 p-6 sm:p-7 rounded-3xl">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                        <Sparkles className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-slate-700">Autonomous Vision Agent v2</h4>
                        <p className="text-slate-500 text-xs font-light mt-0.5">Next-generation industrial multi-camera inspection engine.</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-[10px] font-mono uppercase tracking-wider shadow-xs">
                      IN LAB TESTING
                    </span>
                  </div>
                </Card>

              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
