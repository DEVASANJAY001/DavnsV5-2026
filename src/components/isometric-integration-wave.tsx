import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight, Sparkles, Layers, Cpu, ShieldCheck, Zap } from "lucide-react"

// Country codes (ISO 3166-1 alpha-2) for enterprise markets DAVNS connects with
const flagRows: { code: string; label: string }[][] = [
  [
    { code: "us", label: "United States" },
    { code: "gb", label: "United Kingdom" },
    { code: "de", label: "Germany" },
    { code: "in", label: "India" },
    { code: "jp", label: "Japan" },
    { code: "sg", label: "Singapore" },
    { code: "fr", label: "France" },
    { code: "ca", label: "Canada" },
    { code: "au", label: "Australia" },
    { code: "nl", label: "Netherlands" },
    { code: "se", label: "Sweden" },
    { code: "kr", label: "South Korea" },
  ],
  [
    { code: "br", label: "Brazil" },
    { code: "es", label: "Spain" },
    { code: "it", label: "Italy" },
    { code: "ch", label: "Switzerland" },
    { code: "ua", label: "Ukraine" },
    { code: "id", label: "Indonesia" },
    { code: "my", label: "Malaysia" },
    { code: "ph", label: "Philippines" },
    { code: "za", label: "South Africa" },
    { code: "pl", label: "Poland" },
    { code: "ae", label: "UAE" },
    { code: "sa", label: "Saudi Arabia" },
  ],
  [
    { code: "be", label: "Belgium" },
    { code: "cn", label: "China" },
    { code: "pt", label: "Portugal" },
    { code: "fi", label: "Finland" },
    { code: "dk", label: "Denmark" },
    { code: "no", label: "Norway" },
    { code: "th", label: "Thailand" },
    { code: "vn", label: "Vietnam" },
    { code: "mx", label: "Mexico" },
    { code: "at", label: "Austria" },
    { code: "cz", label: "Czech Republic" },
    { code: "gr", label: "Greece" },
  ],
]

export function IsometricIntegrationWave() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden bg-white">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700 text-xs font-mono mb-4 sm:mb-5 tracking-widest uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
            Global Architecture
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-[3.5rem] font-extrabold text-slate-900 tracking-tight leading-tight max-w-2xl mx-auto mb-4 sm:mb-6">
            We connect with your{" "}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-[#FACC15] rounded-xl -rotate-1 scale-110" />
              <span className="relative px-2">entire stack</span>
            </span>
          </h2>

          <p className="text-slate-500 text-sm sm:text-lg max-w-lg mx-auto font-light mb-6 sm:mb-8 px-2">
            Built to connect seamlessly across modern cloud infrastructure, autonomous multi-agent systems, and enterprise data pipelines.
          </p>

          <Link to="/solutions">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-slate-300 hover:border-slate-500 text-slate-700 hover:text-slate-900 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer bg-white shadow-sm"
            >
              Explore all integrations
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>

        {/* ── Silky Smooth Hardware-Accelerated Flag Marquee (Zero Lag) ── */}
        <div
          className="relative overflow-hidden w-full py-4 space-y-3 sm:space-y-4"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          {flagRows.map((row, rowIdx) => {
            const isLeft = rowIdx % 2 === 0
            const doubled = [...row, ...row]

            return (
              <div key={rowIdx} className="overflow-hidden w-full flex">
                <div
                  className={`flex items-center gap-2.5 sm:gap-4 shrink-0 ${
                    isLeft ? "animate-marquee-left" : "animate-marquee-right"
                  }`}
                >
                  {doubled.map((item, colIdx) => (
                    <div
                      key={`${rowIdx}-${colIdx}`}
                      title={item.label}
                      className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-white flex items-center justify-center cursor-pointer select-none overflow-hidden p-1.5 sm:p-2 border border-slate-200/90 shadow-2xs hover:scale-110 hover:shadow-md transition-transform duration-200 shrink-0"
                    >
                      <img
                        src={`https://flagcdn.com/w80/${item.code}.png`}
                        alt={item.label}
                        loading="lazy"
                        className="w-full h-full object-cover rounded-lg pointer-events-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Bottom Software Delivery & Integration Guarantees (Simplified & Minimal) ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-5 max-w-4xl mx-auto"
        >
          {[
            { value: "100%", label: "Code Ownership" },
            { value: "Direct API", label: "Zero-Touch Sync" },
            { value: "Agile", label: "Weekly Sprints" },
            { value: "Open Stack", label: "Zero Lock-In" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="text-center p-3 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs hover:border-purple-200 transition-colors"
            >
              <div className="text-lg sm:text-2xl font-extrabold text-slate-900 font-mono">{stat.value}</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
